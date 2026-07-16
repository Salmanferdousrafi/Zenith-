import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ragSystem } from "@/lib/rag";
import { chunker } from "@/lib/rag/chunking";
import { prisma } from "@/lib/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const knowledgeBaseId = formData.get("knowledgeBaseId") as string;

    if (!file || !knowledgeBaseId) {
      return NextResponse.json(
        { error: "File and knowledgeBaseId are required" },
        { status: 400 }
      );
    }

    // Validate file
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large (max 50MB)" },
        { status: 400 }
      );
    }

    // Upload to S3
    const key = `documents/${session.user.id}/${knowledgeBaseId}/${nanoid()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // Create document record
    const document = await prisma.document.create({
      data: {
        name: file.name,
        type: file.type.includes("pdf")
          ? "PDF"
          : file.type.includes("word")
          ? "DOCX"
          : "TXT",
        size: file.size,
        url: key,
        knowledgeBaseId,
        status: "PROCESSING",
      },
    });

    // Process document (in production, use a background job)
    const text = await extractText(buffer, file.type);
    const chunks = chunker.chunkBySemantic(text);

    // Add document IDs to chunks
    const chunksWithIds = chunks.map((c) => ({
      ...c,
      documentId: document.id,
      documentName: file.name,
    }));

    // Index in vector store
    await ragSystem.indexChunks(chunksWithIds, knowledgeBaseId);

    // Update document status
    await prisma.document.update({
      where: { id: document.id },
      data: {
        status: "INDEXED",
        chunkCount: chunks.length,
      },
    });

    // Update knowledge base stats
    await prisma.knowledgeBase.update({
      where: { id: knowledgeBaseId },
      data: {
        documentCount: { increment: 1 },
        chunkCount: { increment: chunks.length },
        status: "READY",
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        documentId: document.id,
        chunksIndexed: chunks.length,
      },
    });
  } catch (error) {
    console.error("RAG upload error:", error);
    return NextResponse.json(
      { error: "Failed to process document" },
      { status: 500 }
    );
  }
}

async function extractText(buffer: Buffer, mimeType: string): Promise<string> {
  // Simplified - in production, use pdf-parse, mammoth, etc.
  return buffer.toString("utf-8");
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const knowledgeBaseId = searchParams.get("kb");

    if (!query || !knowledgeBaseId) {
      return NextResponse.json(
        { error: "Query and knowledgeBaseId are required" },
        { status: 400 }
      );
    }

    const result = await ragSystem.query(query, knowledgeBaseId);
    const answer = await ragSystem.generateAnswer(query, result);

    return NextResponse.json({
      success: true,
      data: answer,
    });
  } catch (error) {
    console.error("RAG query error:", error);
    return NextResponse.json(
      { error: "Failed to query knowledge base" },
      { status: 500 }
    );
  }
}
