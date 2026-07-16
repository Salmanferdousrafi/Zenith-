/**
 * RAG (Retrieval-Augmented Generation) Type Definitions
 */

export interface DocumentChunk {
  id: string;
  content: string;
  tokenCount: number;
  documentId?: string;
  documentName?: string;
  metadata?: {
    pageNumber?: number;
    section?: string;
    heading?: string;
    [key: string]: unknown;
  };
}

export interface DocumentSource {
  documentId: string;
  documentName: string;
  content: string;
  score: number;
  pageNumber?: number;
}

export interface RAGQueryResult {
  context: string;
  sources: DocumentSource[];
  totalChunks: number;
  usedChunks: number;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description?: string;
  status: "PROCESSING" | "READY" | "ERROR";
  documentCount: number;
  chunkCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  status: "PENDING" | "PROCESSING" | "INDEXED" | "ERROR";
  chunkCount: number;
  createdAt: Date;
}

export type DocumentType = 
  | "PDF" 
  | "DOCX" 
  | "TXT" 
  | "MD" 
  | "HTML" 
  | "CSV" 
  | "JSON" 
  | "CODE";

export interface UploadResult {
  success: boolean;
  documentId?: string;
  error?: string;
  chunksIndexed?: number;
}
