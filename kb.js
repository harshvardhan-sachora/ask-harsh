// kb.js
// This is your knowledge base — the ONLY facts the AI agent is allowed to
// answer from. Edit these freely with your real, up-to-date information.
// Each entry is one "chunk" the retrieval step can pull from independently,
// so keep each one focused on a single topic rather than mixing many
// unrelated facts into one entry.

export const knowledgeBase = [
  {
    id: 'about',
    topic: 'About Harsh',
    text: 'Harshvardhan Sachora is a computer science engineer building a portfolio of independent software projects from scratch. He uses AI-assisted development tools to move quickly as a solo developer and is working toward starting his own IT services company, focused on AI-integrated tools for small and medium businesses.'
  },
  {
    id: 'skills',
    topic: 'Skills',
    text: 'Harsh works with HTML, CSS, and JavaScript for frontend development, Git and GitHub for version control, and deploys full-stack applications using Vercel. He has hands-on experience writing serverless backend functions in Node.js and connecting them to real databases such as Redis.'
  },
  {
    id: 'project-calculator',
    topic: 'Project: Tally (Calculator)',
    text: 'Tally is a calculator web app with a scientific mode, a history "tape" showing past calculations, full keyboard support, and a day/night theme toggle. Built with vanilla HTML, CSS, and JavaScript, no frameworks.'
  },
  {
    id: 'project-todo',
    topic: 'Project: Pinboard (To-do list)',
    text: 'Pinboard is a to-do list app styled like a corkboard with pinned index cards. It supports tagging tasks as today, urgent, or someday, marks tasks done with a stamp animation, and saves tasks using browser storage.'
  },
  {
    id: 'project-weather',
    topic: 'Project: Skyline (Weather app)',
    text: 'Skyline is a live weather app that fetches real weather data for any city and shows an animated sky background, sun, moon, clouds, rain, or snow, that changes based on the real conditions. It uses the free Open-Meteo API with no API key required.'
  },
  {
    id: 'project-redline',
    topic: 'Project: Redline (AI text editor)',
    text: 'Redline is an AI-powered text editing tool that summarizes, simplifies, rewrites for a professional tone, or fixes grammar in pasted text using the Claude API. It uses a serverless backend function to keep the API key secret instead of exposing it in the browser.'
  },
  {
    id: 'project-quotevault',
    topic: 'Project: Quote Vault',
    text: 'Quote Vault is a quote-saving app with a real shared backend. It fetches quotes from a free public API and lets visitors save favorites into a Redis database, so saved quotes are visible to every visitor, not just stored in one browser.'
  },
  {
    id: 'availability',
    topic: 'Availability',
    text: 'Harsh is available for freelance and contract software development work, particularly small business websites, automation tools, and AI-integrated features. Interested clients or recruiters should reach out directly to discuss a project.'
  },
  {
    id: 'approach',
    topic: 'Working style',
    text: 'Harsh\'s approach is to ship small, complete projects end-to-end, covering frontend, backend, and deployment, and to learn new skills such as databases and AI integration by building real working tools rather than isolated tutorials.'
  }
];
