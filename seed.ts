import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@zenith.ai" },
    update: {},
    create: {
      email: "admin@zenith.ai",
      name: "Zenith Admin",
      password: adminPassword,
      role: "OWNER",
    },
  });

  // Create default agents
  const agents = [
    {
      name: "General Assistant",
      description: "A versatile AI assistant for everyday tasks",
      systemPrompt: "You are a helpful, harmless, and honest AI assistant. Provide clear, accurate, and concise responses.",
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      color: "#6C5DD3",
      userId: admin.id,
      isPublic: true,
    },
    {
      name: "Code Architect",
      description: "Expert in software architecture and code review",
      systemPrompt: "You are an expert software architect. Provide detailed code reviews, design patterns, and architectural guidance. Always explain the 'why' behind your recommendations.",
      model: "gpt-4-turbo-preview",
      temperature: 0.3,
      color: "#00F5FF",
      userId: admin.id,
      isPublic: true,
    },
    {
      name: "Research Analyst",
      description: "Deep research and analysis specialist",
      systemPrompt: "You are a meticulous research analyst. Synthesize complex information, identify patterns, and provide evidence-based insights. Always cite your reasoning.",
      model: "gpt-4-turbo-preview",
      temperature: 0.5,
      color: "#14B8A6",
      userId: admin.id,
      isPublic: true,
    },
    {
      name: "Creative Writer",
      description: "Creative writing and storytelling expert",
      systemPrompt: "You are a creative writing expert. Help with storytelling, copywriting, and content creation. Be imaginative while maintaining clarity and purpose.",
      model: "gpt-4-turbo-preview",
      temperature: 0.9,
      color: "#F59E0B",
      userId: admin.id,
      isPublic: true,
    },
  ];

  for (const agent of agents) {
    await prisma.agent.upsert({
      where: { id: "placeholder" },
      update: {},
      create: agent,
    });
  }

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
