<p align="center">
  <img src="https://raw.githubusercontent.com/yourusername/zenith-ai/main/public/logo.png" width="120" alt="Zenith AI">
</p>

<h1 align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=700&size=40&duration=3000&pause=1000&color=6C5DD3&center=true&vCenter=true&width=500&lines=ZENITH+AI;Multi-Agent+Intelligence;RAG-Powered+Platform" alt="Typing SVG" />
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prisma-5.10-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>
  <img src="https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai&logoColor=white"/>
</p>

<p align="center">
  <em>Orchestrate multiple AI agents with RAG-powered knowledge retrieval.</em><br>
  <em>Built for teams that think beyond chatbots.</em>
</p>

---

## Features

- **Multi-Agent Architecture** — Supervisor-Worker pattern with intent classification
- **RAG System** — Vector embeddings, semantic search, document chunking
- **Real-time Chat** — Streaming responses with markdown & code highlighting
- **Authentication** — NextAuth v5 with OAuth 2.0 + Credentials
- **Knowledge Bases** — Upload documents, automatic indexing, source attribution
- **AI Agents** — Code Architect, Research Analyst, Creative Writer, Data Scientist
- **Dark UI** — Cosmic theme with glassmorphism and glow effects

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, PPR, Server Actions) |
| Language | TypeScript 5.3 (Strict Mode) |
| Styling | Tailwind CSS 3.4 + Radix UI |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth v5 (Auth.js) |
| AI | OpenAI GPT-4 + Embeddings |
| Vector DB | Upstash Vector |
| Cache | Upstash Redis |
| Storage | AWS S3 |
| Testing | Jest + React Testing Library + Playwright |
| CI/CD | GitHub Actions + Vercel |

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/yourusername/zenith-ai.git
cd zenith-ai
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your API keys

# Database
npx prisma generate
npx prisma migrate dev
npm run db:seed

# Development
npm run dev
```

## Docker

```bash
docker-compose up -d
# App: http://localhost:3000
# pgAdmin: http://localhost:5050
```

## License

MIT License — see [LICENSE](LICENSE)
