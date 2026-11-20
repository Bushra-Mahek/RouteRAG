# RouteRAG - Intelligent Web Research & Private Knowledge Assistant

A full-stack AI search and Retrieval-Augmented Generation (RAG) platform built with **Next.js**, **TypeScript**, **Node.js**, **Express.js**, and **LangChain.js (LCEL)**. It dynamically routes user queries between direct LLM inference and live Tavily web scraping/summarization, and provides a grounded document ingestion and Q&A workspace.

---

## Key Features

- **2-Branch LCEL Intent Router (`/search`):** Routes static/general queries directly to an LLM (`directPath`) while routing time-sensitive, comparative, or live queries (`webPath`) through web search, avoiding unnecessary search API calls on static prompts.
- **Parallel Web Scraping & Token Optimization:** Fetches up to 5 Tavily search results, extracts and sanitizes HTML-to-text using 18 regex rules, caps page content at 8,000 characters, and summarizes pages in parallel (~500 tokens per summary) to reduce prompt token bloat.
- **LightRAG Document Ingestion & Grounded Q&A (`/kb`):** Supports pasting custom text/markdown documents with source labels, chunking and indexing content, and answering queries strictly from ingested context with source chunk citations (`Source#ChunkID`) and hallucination guardrails.
- **End-to-End Type Safety:** Enforces strict request and response contracts across client and server using **Zod** schemas and HTTP/HTTPS URL validation.
- **Multi-Provider LLM Support:** Configurable across **OpenAI**, **Google Gemini**, and **Groq** via LangChain.js.

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript, LangChain.js (LCEL), Zod
- **Search & Scraping:** Tavily Search API, Cheerio / Regex HTML Sanitization
- **LLM Providers:** OpenAI / Google Gemini / Groq

---

## Project Structure

```text
WebAgent/
├── agent/                  # Express + LangChain.js backend
│   └── src/
│       ├── index.ts        # Server entry point & CORS/route mounting
│       ├── routes/         # /search and /kb REST endpoints
│       ├── search_tool/    # LCEL router, webPipeline, directPipeline, validation
│       ├── light_rag_kb/   # Document chunking, store, ingestion, and grounded Q&A
│       ├── shared/         # Multi-provider LLM initialization & content extractors
│       └── utils/          # Zod schemas, Tavily client, scraper, summarizer
└── client/client/          # Next.js TypeScript frontend
    └── src/app/
        ├── page.tsx        # Hybrid Web Search Agent UI
        └── kb/page.tsx     # LightRAG Knowledge Base UI

```
## API Endpoints

- **`POST /search`** — Routes queries via LCEL (`direct` vs. `web`), scrapes and summarizes sources in parallel, and returns `{ answer, sources }`.

- **`POST /kb/ingest`** — Chunks and indexes pasted text or markdown under a custom source label.
- **`POST /kb/ask`** — Retrieves the top-K matching chunks and generates a strictly grounded answer with source citations.
- **`POST /kb/reset`** — Clears all stored chunks from the in-memory knowledge base.
 Setup
 1. Clone the RepositoryBashgit clone 
 [https://github.com/bushra-mahek/RouteRAG.git](https://github.com/bushra-mahek/RouteRAG.git)

cd RouteRAG

2. Configure & Start the Backend (agent)Bashcd agent
npm install

Create an agent/.env file:
Code snippet
PORT=5000
ALLOWED_ORIGIN=http://localhost:3000
TAVILY_API_KEY=your_tavily_api_key

# Add your chosen LLM provider key:
GOOGLE_API_KEY=your_gemini_api_key

# OPENAI_API_KEY=your_openai_api_key
# GROQ_API_KEY=your_groq_api_key

Run the backend server:Bashnpm run dev

3. Configure & Start the Frontend (client/client)Bashcd ../client/client
npm install
Create a client/client/.env file:
Code snippet
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
Run the Next.js app:
Bashnpm run dev
Open http://localhost:3000 in your browser.
---

### Quick Push Commands (From `WebAgent` Root)
Before running `git add .`, check `git status` to verify neither `agent/.env` nor `client/client/.env` appears in the untracked/modified list:
```bash
git status
git add .
git commit -m "Add hybrid LCEL search agent, LightRAG knowledge base, and README"
git push
