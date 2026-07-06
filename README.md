# Ask Harsh — AI Support Agent (RAG)

An AI chat assistant that answers questions about Harshvardhan Sachora — his skills, projects, and availability — using Retrieval-Augmented Generation (RAG). Styled as a help-desk console, with a transparency feature: every answer shows exactly which knowledge base entries it pulled from.

## Live Demo
[Ask Harsh](https://ask-harsh.vercel.app/)

## Why this project matters
This isn't a general chatbot that makes things up — it only answers from a specific, editable knowledge base. If a visitor asks something outside that knowledge base, the agent says so honestly instead of guessing. That grounding behavior is the entire point of RAG, and it's what separates a real AI product from a chatbot wrapper.

## How it works (RAG pipeline)
1. **Retrieve** — the backend scores every entry in the knowledge base against the visitor's question using keyword matching, and picks the most relevant ones
2. **Augment** — those matched entries are inserted into the AI's system prompt as context
3. **Generate** — the AI answers using only that context, and is instructed to admit when it doesn't know rather than inventing an answer
## Features
- Chat interface with a live "agent online" status indicator
- Suggested question chips for quick starts
- Every AI answer is tagged with its "Sources" — the specific knowledge base topics used to generate it
- Graceful, in-voice error handling if the AI service is unreachable
- Fully responsive, mobile-friendly console layout

## Built With
- HTML, CSS, JavaScript (vanilla frontend)
- Node.js serverless functions (Vercel)
- [Groq API](https://groq.com/) — free-tier LLM inference
- A custom keyword-based retrieval system (no vector database required for a knowledge base this size)

## What I Learned
- The core RAG pattern: retrieve relevant context, then constrain the LLM to answer only from it
- Why grounding AI answers in real data matters more than just "having an AI feature"
- Building a simple but genuine retrieval system without needing a vector database or embeddings API
- Structuring a knowledge base so it's easy to keep updated as new facts (like new projects) come in
- Designing UI that makes an AI system's behavior transparent (showing sources) rather than a black box

## Updating the Knowledge Base
The AI's "knowledge" lives entirely in `kb.js`. To add or change what it knows:
1. Edit or add an entry in `kb.js` (one clear topic per entry)
2. Commit and push — Vercel redeploys automatically

## Run It Locally
This project requires a live Groq API key to function (the chat responses won't work without it):
1. Clone this repository
2. Set a `GROQ_API_KEY` environment variable with a free key from [console.groq.com](https://console.groq.com)
3. Deploy via Vercel (or an equivalent platform that supports serverless functions) — opening `index.html` directly won't work since it depends on the `/api/ask` backend function

## Author
Built by Harshvardhan Sachora as part of a growing portfolio of independent projects.
