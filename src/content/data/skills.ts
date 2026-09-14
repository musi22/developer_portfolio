// Engineering Capabilities & Systems Architecture Map
// Replaces generic percentage bars with a structured systems map

export interface SystemCapability {
  name: string;
  category: string;
  iconName: string;
  description: string;
  productionContext: string;
  technologies: Array<{
    name: string;
    level: "Core" | "Advanced" | "Production";
    context: string;
  }>;
}

export const engineeringSystems: SystemCapability[] = [
  {
    name: "Agent & AI Systems",
    category: "autonomous-intelligence",
    iconName: "Cpu",
    description:
      "Deterministic orchestration architectures that turn non-deterministic models into production-grade systems with verifiable guarantees.",
    productionContext:
      "Built 9-node state machines in LangGraph separating classification, planning, authorization, tool calling, human-in-the-loop sign-off, validation, and SHA-256 evidence logging.",
    technologies: [
      { name: "LangGraph", level: "Production", context: "Cyclic state graphs, checkpointing, conditional branches" },
      { name: "LangChain", level: "Production", context: "Prompt pipelines, schema parsers, tool abstractions" },
      { name: "Agent Orchestration", level: "Core", context: "Multi-agent planner-verifier-synthesizer topologies" },
      { name: "LLM Tool Calling", level: "Production", context: "Strict Pydantic v2 JSON-schema deterministic dispatch" },
      { name: "RAG & Hybrid Search", level: "Advanced", context: "Dense semantic + sparse BM25 with Reciprocal Rank Fusion" },
      { name: "Human-in-the-Loop", level: "Production", context: "Supervisory queues for high-risk concessions > $50" },
      { name: "Policy Enforcement", level: "Production", context: "Deterministic RBAC, resource ownership, prompt injection defense" },
    ],
  },
  {
    name: "Backend Systems",
    category: "service-layer",
    iconName: "Server",
    description:
      "High-throughput, asynchronous API backends with robust schema validation, connection pooling, and resilient failure recovery.",
    productionContext:
      "Engineered FastAPI microservices and REST gateways serving WebSockets and asynchronous tasks with low latency and clean modular separation.",
    technologies: [
      { name: "Python 3.11+", level: "Production", context: "Modern type hinting, dataclasses, async event loops" },
      { name: "FastAPI", level: "Production", context: "Asynchronous route handlers, dependency injection, OpenAPI" },
      { name: "Node.js & Express.js", level: "Advanced", context: "Full-stack event-driven services and tooling" },
      { name: "REST APIs", level: "Production", context: "Idempotent mutation endpoints, RFC-7807 problem details" },
      { name: "WebSockets", level: "Production", context: "Sub-10ms duplex streaming with per-connection bounded queues" },
      { name: "Async Programming", level: "Production", context: "asyncio, task groups, non-blocking I/O multiplexing" },
      { name: "SQLAlchemy (Async)", level: "Production", context: "Async ORM, connection pool tuning, migration integrity" },
      { name: "Pydantic v2", level: "Production", context: "Rust-accelerated schema validation and serialization" },
    ],
  },
  {
    name: "Distributed Systems",
    category: "event-infrastructure",
    iconName: "Network",
    description:
      "Event-driven streaming infrastructure with message durability, backpressure handling, and fault isolation under peak concurrency.",
    productionContext:
      "Designed real-time market data streaming with Apache Kafka / Redpanda partitions and Redis state caches sustaining 10,000 events/second.",
    technologies: [
      { name: "Apache Kafka", level: "Production", context: "Partition keys, consumer groups, offset commit management" },
      { name: "Redpanda", level: "Production", context: "Drop-in Kafka-compatible C++ event streaming broker" },
      { name: "Redis 7", level: "Production", context: "Pub/Sub, atomic key reservations, TTL caching, token stores" },
      { name: "Event-Driven Architecture", level: "Production", context: "Transactional outbox pattern, domain event dispatch" },
      { name: "Backpressure Management", level: "Advanced", context: "Slow-consumer frame eviction, bounded ring buffers" },
      { name: "Idempotency Controls", level: "Production", context: "0.0% duplicate writes under transient network retries" },
      { name: "Retry & Recovery", level: "Production", context: "Bounded exponential backoff with jitter (2^(N-1) * 0.1s)" },
      { name: "Fault Isolation", level: "Production", context: "Circuit breakers, bulkhead isolation across microservices" },
    ],
  },
  {
    name: "Data & Retrieval",
    category: "persistence-layer",
    iconName: "Database",
    description:
      "Hybrid storage architecture uniting relational ACID transactions, high-performance caches, and dense/sparse vector search.",
    productionContext:
      "Combined PostgreSQL for transactional ledgers with Qdrant vector embeddings and Elasticsearch BM25 for hybrid enterprise knowledge search.",
    technologies: [
      { name: "PostgreSQL 16", level: "Production", context: "ACID compliance, schema constraints, JSONB, indexing" },
      { name: "MongoDB", level: "Advanced", context: "Document persistence, aggregation pipelines, replica sets" },
      { name: "Qdrant", level: "Production", context: "High-dimensional dense vector indexing and cosine distance" },
      { name: "Elasticsearch", level: "Advanced", context: "Inverted index, BM25 text relevance, tokenizers" },
      { name: "Vector & Hybrid Search", level: "Production", context: "Reciprocal Rank Fusion (RRF), cross-encoder re-ranking" },
      { name: "SHA-256 Hash Chaining", level: "Production", context: "Append-only tamper-evident cryptographic evidence ledger" },
    ],
  },
  {
    name: "Infrastructure & Quality",
    category: "devops-testing",
    iconName: "ShieldCheck",
    description:
      "Containerized reproducible environments, automated CI/CD validation gates, distributed telemetry, and rigorous test coverage.",
    productionContext:
      "Engineered automated release gates with 20 ground-truth synthetic scenarios, Docker Compose multi-service stacks, and OpenTelemetry instrumentation.",
    technologies: [
      { name: "Docker & Compose", level: "Production", context: "Multi-stage builds, rootless containers, microservice stacks" },
      { name: "GitHub Actions", level: "Production", context: "Automated linting, test suites, and deployment workflows" },
      { name: "Linux / POSIX", level: "Production", context: "Shell scripting, process management, socket configuration" },
      { name: "Prometheus & Grafana", level: "Advanced", context: "Custom system metric collectors, dashboard alerts" },
      { name: "OpenTelemetry", level: "Advanced", context: "Distributed trace spans across agent tool executions" },
      { name: "Pytest", level: "Production", context: "Parametrized fixtures, async testing, mock fault injection" },
      { name: "Vitest & Playwright", level: "Production", context: "Next.js component tests and end-to-end smoke verification" },
      { name: "Synthetic Evaluation", level: "Production", context: "Controlled benchmark harnesses with seeded network faults" },
    ],
  },
];
