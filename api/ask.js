// api/ask.js
// This is the RAG (Retrieval-Augmented Generation) endpoint.
// Step 1 — RETRIEVE: find which chunks of the knowledge base actually
//          relate to the visitor's question (simple keyword matching —
//          no vector database needed for a knowledge base this size).
// Step 2 — AUGMENT: stuff those chunks into the system prompt as context.
// Step 3 — GENERATE: ask the LLM to answer using ONLY that context.
// This is what stops the AI from making things up about you.

import { knowledgeBase } from '../kb.js';

const STOPWORDS = new Set([
  'the','a','an','is','are','was','were','and','or','but','of','to','in','on',
  'for','with','about','what','who','how','does','do','did','has','have',
  'his','him','he','you','your','it','this','that','can','will','would',
  'could','tell','me','i','am','be','been'
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w));
}

function retrieve(question, topK = 3) {
  const qWords = tokenize(question);
  const scored = knowledgeBase.map(chunk => {
    const cWords = tokenize(chunk.topic + ' ' + chunk.text);
    let score = 0;
    qWords.forEach(w => { if (cWords.includes(w)) score += 1; });
    return { ...chunk, score };
  });
  return scored
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { question } = req.body || {};
  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Missing a question.' });
  }
  if (question.length > 500) {
    return res.status(400).json({ error: 'That question is too long (max 500 characters).' });
  }

  const matches = retrieve(question, 3);
  const context = matches.length
    ? matches.map(m => `[${m.topic}]\n${m.text}`).join('\n\n')
    : '(Nothing in the knowledge base matched this question.)';

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is not configured with a Groq API key yet.' });
  }

  const systemPrompt = `You are the AI assistant on Harshvardhan Sachora's portfolio website, answering questions from visitors such as potential clients or recruiters.

Answer using ONLY the context below. If the answer is not contained in the context, say clearly that you don't have that information and suggest the visitor contact Harsh directly. Never invent facts that aren't in the context. Be concise and friendly — 2-4 sentences unless more detail is genuinely needed.

Context:
${context}`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        max_tokens: 400,
        temperature: 0.4
      })
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text();
      console.error('Groq API error:', detail);
      return res.status(502).json({ error: 'The AI service returned an error. Try again in a moment.' });
    }

    const data = await groqRes.json();
    const answer = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content.trim()
      : '';

    if (!answer) {
      return res.status(502).json({ error: 'The AI service returned an empty response.' });
    }

    return res.status(200).json({
      answer,
      sources: matches.map(m => m.topic)
    });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Something went wrong on the server. Try again.' });
  }
}
