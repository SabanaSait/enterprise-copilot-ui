# Architecture — Enterprise Copilot

## 1. Overview

Enterprise Copilot is a React (Next.js)-based AI assistant interface designed to enhance an enterprise SaaS admin platform.

It enables:

- Natural language interaction with system data
- AI-powered insights from real-time metrics
- Execution of backend operations via intelligent tooling

This UI integrates with an existing NodeJS (NestJS) backend and Angular admin dashboard.

## 2. System Architecture

> Primary data flow: UI → Backend → AI Module → Model → Response

```text
[Admin UI]
        ↓ (context only)
[Next.js Copilot UI]
        ↓ (message + context)
POST /ai/chat
        ↓
[NestJS AI Module]
        ↓
 ┌──────────────────────────────────────────┐
 │ Context Validator / Enhancer            │
 │ Context Injection Layer                │
 │ Conversation Memory                    │
 │ Tool Router (context-aware)            │
 │ Prompt Processor                       │
 │ AI Model                               │
 │ Tool Executor                          │
 │ Response Formatter                     │
 └──────────────────────────────────────────┘
        ↓
Response → UI
```

## 3. Core Components

### 3.1 Copilot UI (Next.js)

- Chat interface
- Message rendering
- Input handling
- Context injection (page, filters, selections)

### 3.2 AI Module (NestJS)

- Prompt processing
- Context enrichment
- Tool resolution and execution
- AI model communication

### 3.3 Backend Services

- Users Service (CRUD, pagination, search)
- Metrics Service (dashboard data)
- WebSocket Gateway (real-time updates)

### 3.4 API Layer

- REST endpoints exposed via NestJS controllers
- AI endpoints:
  - POST /ai/chat
  - POST /ai/execute-tool
- Follows DTO validation and pagination contracts

## 4. Data Flows

### 4.1 Chat Interaction Flow

```text
User Prompt
   ↓
Copilot UI
   ↓
POST /ai/chat/stream
   ↓
AI Module
   ↓
Context Validator / Enhancer
   ↓
AI Model
   ↓
Response → UI
```

### 4.2 Tool Execution Flow

```text
User Prompt
   ↓
AI decides action
   ↓
POST /ai/execute-tool
   ↓
Tool Executor
   ↓
Users/Metrics Service
   ↓
Result → UI
```

### 4.3 Real-Time Insight Flow

```text
System Event (WebSocket)
   ↓
Backend emits update
   ↓
Copilot receives event/context
   ↓
AI processes event for insight generation (optional)
   ↓
UI displays suggestion/insight
```

## 5. AI Architecture

The AI system acts as an orchestration layer between user intent and backend capabilities.

### Responsibilities:

- Interpret natural language prompts
- Inject system context into prompts
- Decide when to execute tools
- Format structured responses for UI

### Execution Modes:

- Direct Response: AI returns a conversational answer
- Tool Execution: AI triggers backend APIs for actions/data

### Tooling Concept:

```json
{
  "name": "getUsers",
  "description": "Fetch users with filters and pagination",
  "endpoint": "/users",
  "method": "GET"
}
```

## 6. Context Awareness

To provide relevant responses, the Copilot uses contextual data:

```json
{
  "page": "users",
  "filters": {
    "search": "john",
    "role": "admin"
  },
  "selectedEntity": null,
  "metricsSnapshot": {}
}
```

This allows:

- Pagination-aware queries
- Filter-aware responses
- Page-specific assistance

## 7. Key Design Decisions

### 7.1 Backend Reuse

The existing NestJS backend is extended with an AI module instead of creating a separate service.

### 7.2 Modular AI Layer

AI logic is isolated into:

- Prompt processing
- Context building
- Tool execution

### 7.3 Real-Time Integration

WebSocket events are leveraged to provide live insights and updates.

### 7.4 Mock vs Live Mode

Supports toggling between:

- Mock AI responses
- Real AI model integration

## 8. Future Enhancements

- Streaming AI responses (SSE/WebSocket)
- Multi-step agent workflows
- Advanced recommendations engine
- Role-based AI capabilities
- Prompt/response audit logging
- AI-assisted bulk operations

## 9. Error Handling & Resilience

- Graceful handling of AI failures (fallback responses)
- Timeout handling for AI requests
- Safe tool execution with validation
- User-friendly error messages in UI

## 10. Design Goals

- Improve admin productivity via natural language interaction
- Reduce manual operations through AI-assisted workflows
- Provide real-time, intelligent system insights
