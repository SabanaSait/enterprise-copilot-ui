# Enterprise Copilot UI

A modern copilot-style chat interface for enterprise SaaS platforms, built with real-time streaming UX and scalable frontend architecture.

This project focuses on implementing ChatGPT-like streaming interactions and preparing a foundation for AI-driven workflows.

## Related Repositories

- Admin Frontend (Angular): [angular-enterprise-ui](https://github.com/SabanaSait/angular-enterprise-ui)
- Backend (NestJS API + WebSocket): [enterprise-platform-backend](https://github.com/SabanaSait/enterprise-platform-backend)

## Features

- Real-time streaming chat UI (ChatGPT-style)
- Typing indicator with progressive rendering
- Abortable requests using AbortController
- Clean separation of API and UI layers
- Backend-integrated streaming support

## Tech Stack

### Frontend

- Next.js (App Router, v16.2.4)
- React (v19.2.4)
- TypeScript (v5.9.3)
- Tailwind CSS (v4.2.4)

### Backend (Integrated)

- NestJS
- Streaming HTTP responses

## Key Concepts

- Real-time streaming chat (chunk-based rendering)
- Custom `useChat` hook with reducer state management
- API abstraction layer for backend communication
- Streaming integration with NestJS backend
- Scalable, feature-based frontend architecture

> AI-related capabilities are planned and not yet implemented.

## Streaming Behavior

- User sends a message
- Frontend reads response as a ReadableStream
- Data is processed in chunks
- UI updates incrementally (typing effect)

> Note: Current backend returns a mocked (echo) response to simulate real AI streaming.

## Project Structure

```
src/
 ├── app/
 ├── components/
 ├── features/
 │    └── chat/
 ├── lib/api/
 ├── hooks/
 ├── store/
 └── types/
```

## Setup

```bash
npm install
npm run dev
```

### Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Roadmap

- [x] Streaming chat UI
- [x] Backend streaming integration
- [ ] LLM integration
- [ ] Context-aware prompts
- [ ] AI → API tool execution
- [ ] Real-time AI insights

## Documentation

- [Architecture](./docs/architecture.md) - System design, data flows, and AI integration

## Purpose

This project demonstrates:

- Real-time streaming UI patterns
- Frontend architecture for AI-ready systems
- Backend integration using streaming APIs

## Author

Built as part of a full-stack portfolio showcasing frontend, backend, real-time systems, and AI-ready architecture.
