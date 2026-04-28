# Enterprise Copilot UI

An AI-powered copilot interface designed for an enterprise SaaS admin platform.

This project extends an existing full-stack system by introducing a React-based AI Copilot that enables intelligent interactions, real-time insights, and natural language-driven operations across the platform.

## Related Repositories

- **Admin Frontend (Angular):** [angular-enterprise-ui](https://github.com/SabanaSait/angular-enterprise-ui)
- **Backend (NestJS API + WebSocket):** [enterprise-platform-backend](https://github.com/SabanaSait/enterprise-platform-backend)

## Features

### AI Copilot

- Context-aware chat interface
- Natural language → system queries
- AI-assisted user management workflows
- Tool execution (create/update/delete users)

### Metrics Intelligence

- AI-generated summaries of dashboard metrics
- Real-time insights powered by WebSocket events
- Anomaly detection and activity explanations

### Users Module Integration

- AI-driven search, filtering, and sorting
- Pagination-aware operations
- Multi-tab synchronized updates

### System Capabilities

- Mock ↔ Live mode support
- Backend contract-aligned APIs
- Real-time event-driven architecture

## Tech Stack

### Frontend

- Next.js (App Router, v16.2.4)
- React (v19.2.4)
- TypeScript (v5.9.3)
- Tailwind CSS (v4.2.4)

### Backend (Integrated)

- NestJS
- Socket.IO
- REST APIs with pagination, sorting, search

## Key Concepts

- AI-assisted admin workflows
- Context-aware UI interactions
- Real-time system integration
- Agent-like tool execution
- Scalable frontend architecture

## Project Structure

```
src/
 ├── app/
 ├── components/
 ├── features/
 │    └── ai-copilot/
 ├── services/
 ├── hooks/
 ├── store/
 └── types/
```

## Getting Started

```bash
npm install
npm run dev
```

## Roadmap

- [ ] AI chat UI (MVP)
- [ ] Backend AI integration
- [ ] Context-aware prompts
- [ ] AI → API tool execution
- [ ] Real-time AI insights

## Documentation

- [Architecture](./docs/architecture.md) - System design, data flows, and AI integration

## Purpose

This project demonstrates how AI can be integrated into enterprise admin platforms to improve operational efficiency, decision-making, and system interaction.

## Author

Built as part of a full-stack portfolio showcasing frontend, backend, real-time systems, and AI integration.
