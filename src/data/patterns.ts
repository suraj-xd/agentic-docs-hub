export type ComplexityLevel = 'beginner' | 'intermediate' | 'advanced' | 'experimental';

export interface Resource {
  name: string;
  url: string;
}

export interface Pattern {
  id: number;
  slug: string;
  title: string;
  summary: string;
  analogy: string;
  complexity: ComplexityLevel;
  whenToUse: string[];
  applications: string[];
  pros: string[];
  cons: string[];
  resources?: Resource[];
  keyConsideration?: string;
  mermaidDiagram?: string;
}

export const patterns: Pattern[] = [
  {
    id: 1,
    slug: "prompt-chaining",
    title: "Prompt Chaining",
    summary: "Breaking a large task into smaller, sequential steps where each step validates the output before passing to the next.",
    analogy: "Like an assembly line where each station completes its part, checks quality, then hands off to the next section.",
    complexity: "beginner",
    whenToUse: [
      "Complex multi-step processes",
      "Data transformation pipelines",
      "Dirty or unstructured data cleaning",
      "Document processing",
      "Code generation workflows"
    ],
    applications: [
      "Legal document analysis",
      "E-commerce product descriptions",
      "Academic research assistance",
      "Report generation"
    ],
    pros: [
      "Modular design (swap components easily)",
      "Multiple validation checkpoints",
      "Easier debugging"
    ],
    cons: [
      "Context explosion (carrying too much data forward)",
      "Error propagation if validation fails",
      "Slower due to multiple inference points",
      "Diminishing returns after 5-7 chains"
    ],
    keyConsideration: "Magic number is typically 3-5 chains. Each step must validate before proceeding.",
    resources: [
      { name: "LangChain", url: "https://python.langchain.com/" },
      { name: "LangGraph", url: "https://langchain-ai.github.io/langgraph/" },
      { name: "Langbase SDK", url: "https://langbase.com/" },
      { name: "Dust.tt", url: "https://dust.tt/" },
      { name: "OpenManus", url: "https://github.com/openmanus/openmanus" },
      { name: "Flowise", url: "https://flowiseai.com/" },
      { name: "FreeCodeCamp: Build Autonomous Agents", url: "https://www.freecodecamp.org/news/build-autonomous-agents-using-prompt-chaining-with-ai-primitives/" },
      { name: "Anthropic: Building Effective Agents", url: "https://www.anthropic.com/engineering/building-effective-agents" },
      { name: "Prompt Engineering Guide: Prompt Chaining", url: "https://www.promptingguide.ai/techniques/prompt_chaining" },
      { name: "Refonte Learning Guide", url: "https://www.refontelearning.com/blog/prompt-chaining-and-advanced-orchestration-methods" },
      { name: "NivaLabs: Prompt Chaining for AI Agents", url: "https://medium.com/@nivalabs.ai/prompt-chaining-for-the-ai-agents-modular-reliable-and-scalable-workflows-a22d15fd5d33" },
      { name: "Prompt Chain AI Guide", url: "https://reply.io/blog/prompt-chain-ai/" },
      { name: "GoCodeo: Prompt Chaining for Agents", url: "https://www.gocodeo.com/post/prompt-chaining-for-agents-from-zero-shot-tasks-to-full-autonomy" },
      { name: "MindPal", url: "https://mindpal.io/" },
      { name: "OpenPrompt Framework", url: "https://github.com/thunlp/OpenPrompt" }
    ],
    mermaidDiagram: `graph TD
    A[User Input] --> B[Break into Subtasks]
    B --> C[Define Data Contracts]
    C --> D[Execute Task 1]
    D --> E{Validate Output 1}
    E -->|Pass| F[Execute Task 2]
    E -->|Fail| G[Retry Task 1]
    G --> D
    F --> H{Validate Output 2}
    H -->|Pass| I[Execute Task 3]
    H -->|Fail| J[Retry Task 2]
    J --> F
    I --> K[Merge Results]
    K --> L[Assemble Final Output]
    L --> M[Log All Artifacts]`
  },
  {
    id: 2,
    slug: "routing",
    title: "Routing",
    summary: "Incoming requests are analyzed and sent to the right specialist agent based on their needs.",
    analogy: "A smart receptionist who listens to what you need and directs you to the right department.",
    complexity: "intermediate",
    whenToUse: [
      "Multiple domain expertise needed",
      "Tool segregation required",
      "Preventing agent misfires",
      "Specialized workflows"
    ],
    applications: [
      "Customer service platforms",
      "Enterprise automations",
      "Healthcare triage systems",
      "Multi-department operations"
    ],
    pros: [
      "Specialization per domain",
      "Scalable architecture",
      "Efficient resource usage"
    ],
    cons: [
      "Potential routing errors",
      "Edge case challenges",
      "Needs confidence intervals",
      "Complexity in decision logic"
    ],
    keyConsideration: "Add confidence scoring (1-10) and request clarification if confidence < threshold",
    resources: [
      { name: "AutoGen (Microsoft)", url: "https://microsoft.github.io/autogen/" },
      { name: "LangGraph", url: "https://langchain-ai.github.io/langgraph/" },
      { name: "CrewAI", url: "https://www.crewai.com/" },
      { name: "LangGraph vs AutoGen", url: "https://www.truefoundry.com/blog/autogen-vs-langgraph" },
      { name: "AutoGen vs LangGraph vs CrewAI Battle", url: "https://medium.com/@vikaskumarsingh_60821/battle-of-ai-agent-frameworks-langgraph-vs-autogen-vs-crewai-3c7bf5c18979" },
      { name: "Agent Orchestration Frameworks", url: "https://medium.com/@akankshasinha247/agent-orchestration-when-to-use-langchain-langgraph-autogen-or-build-an-agentic-rag-system-cc298f785ea4" },
      { name: "Top 10+ Agentic Orchestration Frameworks", url: "https://research.aimultiple.com/agentic-orchestration/" },
      { name: "Top 5 Open-Source Agentic Frameworks", url: "https://research.aimultiple.com/agentic-frameworks/" },
      { name: "A Detailed Comparison of Top 6 AI Agent Frameworks", url: "https://www.turing.com/resources/ai-agent-frameworks" },
      { name: "LangGraph vs AutoGen Comparison", url: "https://blog.promptlayer.com/langgraph-vs-autogen/" },
      { name: "LangGraph Integration with AutoGen & CrewAI", url: "https://docs.langchain.com/langgraph-platform/autogen-integration" },
      { name: "AutoGen Studio (No-code)", url: "https://microsoft.github.io/autogen/" },
      { name: "LangGraph Visual Studio", url: "https://langchain-ai.github.io/langgraph/" }
    ],
    mermaidDiagram: `graph TD
    A[User Request] --> B[Analyze Intent & Context]
    B --> C{Route Decision}
    C -->|Technical| D[Technical Support Agent]
    C -->|Sales| E[Sales Agent]
    C -->|Account| F[Account Management Agent]
    C -->|Unclear| G[Request Clarification]
    G --> A
    D --> H[Process & Respond]
    E --> H
    F --> H
    H --> I{Success?}
    I -->|Yes| J[Deliver Result]
    I -->|No| K[Handle Failure]`
  },
  {
    id: 3,
    slug: "parallelization",
    title: "Parallelization",
    summary: "Splitting a large job into independent chunks processed simultaneously by multiple workers.",
    analogy: "Having 10 people each read different chapters of a book simultaneously, then combining summaries.",
    complexity: "intermediate",
    whenToUse: [
      "Large-scale data processing",
      "Time-sensitive operations",
      "Web scraping at scale",
      "Batch operations"
    ],
    applications: [
      "Document processing (multiple files)",
      "Data enrichment pipelines",
      "Research automation",
      "Testing frameworks",
      "News aggregation"
    ],
    pros: [
      "Specialization per worker",
      "Highly scalable",
      "Faster completion"
    ],
    cons: [
      "Complexity increases with workers",
      "Difficult to unify outputs",
      "Need 'HR' agents for management",
      "Resource intensive"
    ],
    resources: [
      { name: "LangChain", url: "https://python.langchain.com/" },
      { name: "AutoGen (parallel agents)", url: "https://microsoft.github.io/autogen/" },
      { name: "CrewAI (crews)", url: "https://www.crewai.com/" }
    ],
    mermaidDiagram: `graph TD
    A[Large Input] --> B[Analyze Input]
    B --> C[Split Into Subtasks]
    C --> D[Check Resources]
    D --> E[Spawn Parallel Workers]
    E --> F[Worker 1: Task A]
    E --> G[Worker 2: Task B]
    E --> H[Worker 3: Task C]
    E --> I[Worker N: Task N]
    F --> J{Retry Until Success}
    G --> J
    H --> J
    I --> J
    J --> K[Collect Results]
    K --> L[Normalize Format]
    L --> M[Merge Results]
    M --> N[Generate Summary]
    N --> O[Cite Provenance]`
  },
  {
    id: 4,
    slug: "reflection",
    title: "Reflection",
    summary: "Generate a first draft, have a critic review it, revise based on feedback, repeat until quality standards are met.",
    analogy: "Writing an essay, having a teacher review it, making improvements until you get a passing grade.",
    complexity: "intermediate",
    whenToUse: [
      "Quality control critical",
      "Complex reasoning tasks",
      "Creative content with constraints",
      "Iterative refinement needed"
    ],
    applications: [
      "Content generation (blogs, articles)",
      "Legal document writing",
      "Academic writing",
      "Product descriptions at scale"
    ],
    pros: [
      "High quality outputs",
      "Built-in quality gates",
      "Self-improvement loops"
    ],
    cons: [
      "Higher API costs",
      "API throttling risks",
      "Slower processing",
      "Need robust rubrics"
    ],
    keyConsideration: "Set max retry count (typically 3) to avoid infinite loops",
    resources: [
      { name: "LangChain with critic agents", url: "https://python.langchain.com/" },
      { name: "AutoGen with feedback loops", url: "https://microsoft.github.io/autogen/" }
    ]
  },
  {
    id: 5,
    slug: "tool-use",
    title: "Tool Use",
    summary: "When AI needs external information or actions, it discovers available tools, checks permissions, calls the right tool with proper parameters.",
    analogy: "A chef checking the pantry for ingredients, verifying they can use them, then retrieving and using them in the recipe.",
    complexity: "beginner",
    whenToUse: [
      "External data required",
      "Multi-step operations",
      "API integrations",
      "Data analysis needs"
    ],
    applications: [
      "Research assistance",
      "Data analysis platforms",
      "Customer service bots",
      "Content management systems"
    ],
    pros: [
      "Quality improvement",
      "Error reduction",
      "Extended capabilities"
    ],
    cons: [
      "Tool misfire risks",
      "Cascading errors if wrong tool used",
      "Permission management complexity"
    ],
    resources: [
      { name: "LangChain Tools", url: "https://python.langchain.com/docs/modules/agents/tools/" },
      { name: "Anthropic MCP (Model Context Protocol)", url: "https://www.anthropic.com/news/model-context-protocol" },
      { name: "MCP Documentation", url: "https://modelcontextprotocol.io/" }
    ],
    mermaidDiagram: `graph TD
    A[User Request] --> B[Analyze Requirements]
    B --> C[Discover Available Tools]
    C --> D[Tool Options]
    D --> E[Web Search API]
    D --> F[Database Query]
    D --> G[Calculator]
    D --> H[File System]
    D --> I[Other APIs]
    C --> J[Select Tool]
    J --> K{Safety Check}
    K -->|Pass| L[Prepare Tool Call]
    K -->|Fail| M[Deny with Reason]
    L --> N[Execute Tool]
    N --> O{Success?}
    O -->|Yes| P[Parse Output]
    O -->|No| Q[Fallback Method]
    P --> R[Normalize with LLM]
    Q --> R
    M --> S[Log Error]`
  },
  {
    id: 6,
    slug: "planning",
    title: "Planning",
    summary: "Creating a step-by-step plan with milestones, dependencies, and constraints before execution.",
    analogy: "Planning a road trip with checkpoints, monitoring traffic, and rerouting as needed.",
    complexity: "intermediate",
    whenToUse: [
      "Goal-oriented workflows",
      "Ambitious projects with substeps",
      "Software development",
      "Research projects"
    ],
    applications: [
      "Project management",
      "Software development lifecycle",
      "Strategic planning",
      "Complex research initiatives"
    ],
    pros: [
      "Strategic execution",
      "Clear roadmap",
      "Adaptable to changes"
    ],
    cons: [
      "Setup complexity",
      "Agent coordination overhead",
      "Requires robust fallback mechanisms"
    ],
    resources: [
      { name: "LangGraph (graph-based planning)", url: "https://langchain-ai.github.io/langgraph/" },
      { name: "AutoGen (conversational planning)", url: "https://microsoft.github.io/autogen/" }
    ]
  },
  {
    id: 7,
    slug: "multi-agent-collaboration",
    title: "Multi-Agent Collaboration",
    summary: "Multiple specialized agents working together on different parts of a complex task, coordinated by a central manager with shared memory.",
    analogy: "A film crew where the director coordinates while camera, sound, and lighting specialists each handle their part, sharing the same script and timeline.",
    complexity: "advanced",
    whenToUse: [
      "Iterative refinement needed",
      "Multiple expertise areas",
      "Complex workflows",
      "Product development cycles"
    ],
    applications: [
      "Software development",
      "Product development",
      "Financial analysis",
      "Content production",
      "Research projects"
    ],
    pros: [
      "Specialization per agent",
      "Parallel processing",
      "Collaborative problem-solving"
    ],
    cons: [
      "Complex setup and testing",
      "Coordination overhead",
      "Memory management challenges",
      "Model drift concerns"
    ],
    resources: [
      { name: "CrewAI (role-based)", url: "https://www.crewai.com/" },
      { name: "AutoGen (conversational)", url: "https://microsoft.github.io/autogen/" },
      { name: "LangGraph (graph coordination)", url: "https://langchain-ai.github.io/langgraph/" },
      { name: "Agent Orchestration Framework Comparison", url: "https://research.aimultiple.com/agentic-orchestration/" },
      { name: "Multi-Agent Tools Compared", url: "https://www.amplework.com/blog/langgraph-vs-autogen-vs-crewai-multi-agent-framework/" }
    ]
  },
  {
    id: 8,
    slug: "memory-management",
    title: "Memory Management",
    summary: "Classifying incoming information as short-term conversation, episodic events, or long-term knowledge, storing each with metadata like recency and relevance.",
    analogy: "How your brain keeps track of things briefly, specific memories, or permanent knowledge.",
    complexity: "intermediate",
    whenToUse: [
      "Conversational continuity",
      "Personalized experiences",
      "Customer service",
      "Educational platforms"
    ],
    applications: [
      "Chatbots with context",
      "Personal assistants",
      "Educational tutoring systems",
      "Customer service platforms"
    ],
    pros: [
      "Context preservation",
      "Personalized interactions",
      "Learning from history"
    ],
    cons: [
      "Security concerns",
      "Storage overhead",
      "Memory flush strategies needed",
      "Privacy considerations"
    ],
    keyConsideration: "Implement memory decay for old/irrelevant information",
    resources: [
      { name: "Mem0", url: "https://mem0.ai/" },
      { name: "Mem0 GitHub", url: "https://github.com/mem0ai/mem0" },
      { name: "Mem0 Paper", url: "https://arxiv.org/abs/2504.19413" },
      { name: "Zep", url: "https://www.getzep.com/" },
      { name: "Zep Blog", url: "https://blog.getzep.com/" },
      { name: "Supermemory", url: "https://supermemory.ai/" },
      { name: "Supermemory MCP Documentation", url: "https://supermemory.ai/docs/supermemory-mcp/introduction" },
      { name: "MemOS", url: "https://github.com/MemTensor/MemOS" },
      { name: "Cognee", url: "https://www.cognee.ai/" },
      { name: "Cognee Evaluation Blog", url: "https://www.cognee.ai/blog/deep-dives/ai-memory-tools-evaluation" },
      { name: "Mem0 vs Zep Performance Analysis", url: "https://blog.getzep.com/lies-damn-lies-statistics-is-mem0-really-sota-in-agent-memory/" },
      { name: "AI Memory Layer: Top Platforms", url: "https://arize.com/ai-memory/" }
    ],
    mermaidDiagram: `graph TD
    A[User Interaction] --> B[Capture Information]
    B --> C{Memory Type?}
    C -->|Short-term| D[Session Memory]
    C -->|Episodic| E[Event Memory]
    C -->|Long-term| F[Knowledge Base]
    D --> G{Context Window Full?}
    G -->|Yes| H[Compress Memory]
    G -->|No| I[Continue]
    E --> J[Index & Add Metadata]
    F --> J
    J --> K[Recency Score]
    J --> L[Frequency Tags]
    J --> M[Topic Tags]
    K --> N[Store in Vector DB]
    L --> N
    M --> N
    N --> O[Query Memory Store]
    O --> P[Apply Filters]
    P --> Q[Pick Relevant Memories]
    Q --> R{Privacy Concerns?}
    R -->|Yes| S[Redact/Modify]
    R -->|No| T[Use Memory]
    S --> T
    T --> U[Process Request]`
  },
  {
    id: 9,
    slug: "learning-adaptation",
    title: "Learning & Adaptation",
    summary: "Collecting feedback from user corrections, ratings, and outcomes to update prompts, policies, or examples.",
    analogy: "Adjusting a recipe based on customer feedback and taste tests.",
    complexity: "intermediate",
    whenToUse: [
      "Feedback incorporation needed",
      "Continuous improvement systems",
      "Tailored services",
      "Customer-facing applications"
    ],
    applications: [
      "Customer service improvement",
      "Product recommendation engines",
      "Content personalization",
      "Educational platforms"
    ],
    pros: [
      "Continuous improvement",
      "Self-optimization",
      "Better user experience"
    ],
    cons: [
      "Training costs",
      "Risk of learning wrong patterns",
      "Requires validation checks",
      "Combinatorial cost problems"
    ],
    resources: [
      { name: "LangChain feedback loops", url: "https://python.langchain.com/" }
    ]
  },
  {
    id: 10,
    slug: "goal-setting-monitoring",
    title: "Goal Setting & Monitoring",
    summary: "Defining SMART goals (Specific, Measurable, Achievable, Realistic, Time-based) with continuous monitoring and course correction.",
    analogy: "GPS that sets a destination, monitors progress, and recalculates when you're off course.",
    complexity: "advanced",
    whenToUse: [
      "Complex projects",
      "Autonomous operations",
      "Strategic execution",
      "Resource optimization"
    ],
    applications: [
      "Sales pipelines",
      "System optimization",
      "Cost management",
      "Enterprise operations"
    ],
    pros: [
      "Resource efficiency",
      "Clear metrics",
      "Adaptability"
    ],
    cons: [
      "Goal conflicts possible",
      "Rigid constraints",
      "Edge case sensitivity",
      "Complex setup"
    ],
    resources: [
      { name: "LangGraph with state tracking", url: "https://langchain-ai.github.io/langgraph/" }
    ]
  },
  {
    id: 11,
    slug: "exception-handling-recovery",
    title: "Exception Handling & Recovery",
    summary: "Comprehensive error catching system with classification, backoff strategies, and fallback mechanisms.",
    analogy: "Like having multiple safety nets in a circus - if one fails, others catch you.",
    complexity: "advanced",
    whenToUse: [
      "Production systems",
      "Quality assurance critical",
      "Cost management",
      "Enterprise deployments"
    ],
    applications: [
      "Mission-critical systems",
      "Financial platforms",
      "Healthcare systems",
      "Enterprise AI deployments"
    ],
    pros: [
      "Performance visibility",
      "User trust",
      "Multiple fallbacks",
      "Robust error handling"
    ],
    cons: [
      "Infrastructure complexity",
      "False alarm potential",
      "Alert fatigue risk",
      "Setup overhead"
    ],
    resources: [
      { name: "Error handling in LangChain", url: "https://python.langchain.com/" },
      { name: "Retry mechanisms in AutoGen", url: "https://microsoft.github.io/autogen/" }
    ]
  },
  {
    id: 12,
    slug: "human-in-the-loop",
    title: "Human-in-the-Loop",
    summary: "Strategic intervention points where humans review, approve, or take over during high-risk situations or edge cases.",
    analogy: "Like needing to manually enter credentials when an automated system reaches a login page.",
    complexity: "beginner",
    whenToUse: [
      "High-stake decisions",
      "Regulatory compliance",
      "Edge cases",
      "Login/authentication needs"
    ],
    applications: [
      "Content moderation",
      "Medical diagnosis",
      "Financial approvals",
      "Legal document review"
    ],
    pros: [
      "Increased trust",
      "Critical oversight",
      "Quality assurance"
    ],
    cons: [
      "Added latency",
      "Workflow interruption",
      "Requires human availability"
    ],
    resources: [
      { name: "LangGraph (interrupt_before breakpoints)", url: "https://langchain-ai.github.io/langgraph/" },
      { name: "AutoGen (UserProxyAgent)", url: "https://microsoft.github.io/autogen/" },
      { name: "CrewAI (human_input=True)", url: "https://www.crewai.com/" }
    ],
    mermaidDiagram: `graph TD
    A[Agent Processing] --> B{Decision Point}
    B -->|Review Needed| C[Review Queue]
    B -->|Continue| D[Automated Processing]
    C --> E[Prioritize by Urgency]
    E --> F[Present in UI]
    F --> G[Show Full Context]
    G --> H[Display Differences]
    G --> I[Set Timer]
    H --> J{Human Decision}
    J -->|Approve| K[Continue Workflow]
    J -->|Deny| L[Stop/Redirect]
    J -->|Edit| M[Modify & Continue]
    J -->|Takeover| N[Manual Control]
    K --> O{More Intervention?}
    O -->|No| P[Complete]
    O -->|Yes| C`
  },
  {
    id: 13,
    slug: "retrieval-rag",
    title: "Retrieval (RAG)",
    summary: "Indexing documents by parsing, chunking, and creating searchable embeddings for knowledge retrieval.",
    analogy: "A librarian who categorizes and indexes information for easy retrieval.",
    complexity: "beginner",
    whenToUse: [
      "Document knowledge bases",
      "Enterprise search",
      "Customer support with docs",
      "Research assistance"
    ],
    applications: [
      "Enterprise search systems",
      "Customer support bots",
      "Research assistants",
      "Documentation systems"
    ],
    pros: [
      "Accuracy improvement",
      "Scalable knowledge",
      "Grounded responses"
    ],
    cons: [
      "Infrastructure maintenance",
      "Vector database costs",
      "Hallucination from bad matches",
      "Chunking strategy complexity"
    ],
    resources: [
      { name: "Pinecone", url: "https://www.pinecone.io/" },
      { name: "Pinecone RAG Guide", url: "https://www.pinecone.io/learn/retrieval-augmented-generation/" },
      { name: "Pinecone RAG Series", url: "https://www.pinecone.io/learn/series/rag/" },
      { name: "Weaviate", url: "https://weaviate.io/" },
      { name: "Weaviate RAG Documentation", url: "https://docs.weaviate.io/weaviate/starter-guides/generative" },
      { name: "Chroma", url: "https://www.trychroma.com/" },
      { name: "Chroma GitHub", url: "https://github.com/chroma-core/chroma" },
      { name: "Qdrant", url: "https://qdrant.tech/" },
      { name: "Qdrant GitHub", url: "https://github.com/qdrant/qdrant" },
      { name: "Milvus", url: "https://milvus.io/" },
      { name: "FAISS (Facebook)", url: "https://github.com/facebookresearch/faiss" },
      { name: "MongoDB Atlas", url: "https://www.mongodb.com/products/platform/atlas-vector-search" },
      { name: "Redis Stack", url: "https://redis.io/docs/stack/" },
      { name: "Neo4j", url: "https://neo4j.com/" },
      { name: "Pgvector", url: "https://github.com/pgvector/pgvector" },
      { name: "LlamaIndex", url: "https://www.llamaindex.ai/" },
      { name: "Lantern", url: "https://lantern.dev/" },
      { name: "Langfuse", url: "https://langfuse.com/" },
      { name: "Ragas", url: "https://github.com/explodinggradients/ragas" },
      { name: "LangSmith", url: "https://www.langchain.com/langsmith" },
      { name: "Weights & Biases", url: "https://wandb.ai/" },
      { name: "Agenta", url: "https://www.agenta.ai/" },
      { name: "Building RAG with LangChain + Pinecone", url: "https://medium.com/@abdulll8392/building-a-retrieval-augmented-generation-rag-system-with-langchain-pinecone-and-chromadb-187827c46c3b" },
      { name: "RAG with Weaviate", url: "https://docs.weaviate.io/weaviate/starter-guides/generative" },
      { name: "Primer on Vector Databases and RAG", url: "https://blog.gopenai.com/primer-on-vector-databases-and-retrieval-augmented-generation-rag-using-langchain-pinecone-37a27fb10546" },
      { name: "Architecting for Scale: Vector Database Options", url: "https://ragaboutit.com/architecting-for-scale-evaluating-vector-database-options-for-production-rag-systems/" },
      { name: "Agentic RAG with AutoGen and LangGraph", url: "https://medium.com/@shradhacea/agentic-rag-using-autogen-and-langchain-langgraph-framework-89ac2d684702" },
      { name: "Top 10 Platforms for RAG Systems", url: "https://blog.o11yai.com/blog/top-10-platforms-for-building-retrieval-augmented-generation-rag-systems-in/" },
      { name: "Awesome RAG", url: "https://github.com/Danielskry/Awesome-RAG" }
    ],
    mermaidDiagram: `graph TD
    A[Source Documents] --> B[Parse Documents]
    B --> C[Chunk Strategy]
    C --> D[Fixed Size]
    C --> E[Semantic Boundaries]
    C --> F[Context Aware]
    D --> G[Generate Embeddings]
    E --> G
    F --> G
    G --> H[Store in Vector DB]
    I[User Query] --> J{Query Rewrite?}
    J -->|Yes| K[Optimize Query]
    J -->|No| L[Use Original]
    K --> M[Retrieve Top K Matches]
    L --> M
    M --> N[Rerank Results]
    N --> O[Score & Optimize]
    O --> P[Generate Response]
    P --> Q{Test RAG}
    Q -->|Pass| R[Deliver Response]
    Q -->|Fail| S[Adjust Parameters]
    R --> T[Add Citations]
    T --> U[Measure Precision/Recall]`
  },
  {
    id: 14,
    slug: "inter-agent-communication",
    title: "Inter-Agent Communication",
    summary: "Agents communicate through structured messaging systems with defined protocols, message IDs, expiration times, and security checks.",
    analogy: "Office email system with read receipts, security clearances, and spam filters.",
    complexity: "experimental",
    whenToUse: [
      "Warning: Experimental Pattern",
      "Enterprise-level systems only",
      "Complex multi-agent orchestration",
      "Theoretical implementations"
    ],
    applications: [
      "Smart city systems (theoretical)",
      "Complex enterprise automation",
      "Research prototypes"
    ],
    pros: [
      "Fault isolation",
      "Full traceability",
      "Scalable in theory"
    ],
    cons: [
      "Extremely complex",
      "High debugging difficulty",
      "Context management challenges",
      "Not production-ready for most cases",
      "Framework limitations"
    ],
    keyConsideration: "This is the most complex pattern. Not recommended for production unless you have significant resources and engineering expertise.",
    resources: [
      { name: "AutoGen (message passing)", url: "https://microsoft.github.io/autogen/" },
      { name: "LangGraph (graph communication)", url: "https://langchain-ai.github.io/langgraph/" },
      { name: "CrewAI (team communication)", url: "https://www.crewai.com/" }
    ]
  },
  {
    id: 15,
    slug: "resource-aware-optimization",
    title: "Resource-Aware Optimization",
    summary: "Analyzing task complexity and routing to appropriate resources - simple tasks use cheap/fast models, complex tasks use powerful/expensive models.",
    analogy: "Choosing between walking, bus, or taxi depending on distance, urgency, and budget.",
    complexity: "advanced",
    whenToUse: [
      "Cost-sensitive operations",
      "High-volume processing",
      "Budget constraints",
      "Enterprise-scale systems"
    ],
    applications: [
      "Large-scale platforms",
      "Enterprise SaaS",
      "High-volume APIs",
      "Cost optimization systems"
    ],
    pros: [
      "Cost reduction",
      "Efficient resource usage",
      "Scalable economics"
    ],
    cons: [
      "Complexity increase",
      "Tuning challenges",
      "Edge case handling",
      "Rubric development needed"
    ],
    keyConsideration: "Combine with prompt chaining to use multiple cheap models instead of one expensive one",
    resources: [
      { name: "GPT-4o mini vs GPT-4o routing", url: "https://openai.com/" },
      { name: "Claude Haiku vs Sonnet routing", url: "https://www.anthropic.com/" }
    ],
    mermaidDiagram: `graph TD
    A[Task Received] --> B[Analyze Complexity]
    B --> C[Set Budget]
    C --> D[Token Limit]
    C --> E[Time Constraint]
    C --> F[Money Budget]
    D --> G[Router Agent Classifies]
    E --> G
    F --> G
    G --> H{Complexity Level}
    H -->|Simple| I[Small Model]
    H -->|Medium| J[Standard Model]
    H -->|Complex| K[Reasoning Model]
    H -->|Unknown| L[Quick Test]
    L --> H
    I --> M[Execute Task]
    J --> M
    K --> M
    M --> N[Monitor Resources]
    N --> O[Track Token Count]
    N --> P[Track Response Time]
    N --> Q[Track API Costs]
    O --> R{Within Limits?}
    P --> R
    Q --> R
    R -->|Yes| S[Continue Processing]
    R -->|No| T[Optimization Needed]
    T --> U[Cut Context]
    T --> V[Use Prompt Caching]
    T --> W[Switch to Cheaper Model]
    S --> X[Task Complete]`
  },
  {
    id: 16,
    slug: "reasoning-techniques",
    title: "Reasoning Techniques",
    summary: "Choosing the right reasoning method for the problem: Chain of Thought (sequential), Tree of Thought (branching), Self-Consistency (multiple solutions), or Debate (adversarial).",
    analogy: "Solving a puzzle by trying different strategies until one works.",
    complexity: "advanced",
    whenToUse: [
      "Advanced technique only",
      "Complex mathematical reasoning",
      "Strategic planning at scale",
      "Creative problem-solving",
      "Research applications"
    ],
    applications: [
      "Legal analysis",
      "Medical diagnosis",
      "Scientific research",
      "Complex decision-making"
    ],
    pros: [
      "Exhaustive exploration",
      "Robust solutions",
      "Creative approaches"
    ],
    cons: [
      "High token consumption",
      "Complexity overhead",
      "Overthinking risk",
      "Latency issues",
      "Cost explosion"
    ],
    keyConsideration: "Not needed for 90%+ of use cases. Highly experimental - use only with resources and expertise.",
    resources: [
      { name: "LangChain (Chain of Thought, Tree of Thought)", url: "https://python.langchain.com/" }
    ]
  },
  {
    id: 17,
    slug: "evaluation-monitoring",
    title: "Evaluation & Monitoring",
    summary: "Setting up quality gates and golden test sets before deployment, continuously monitoring accuracy, performance, cost, and drift in production.",
    analogy: "Factory quality control system that checks products at every stage.",
    complexity: "advanced",
    whenToUse: [
      "Production-grade systems",
      "Quality assurance critical",
      "Enterprise deployments",
      "Regulated industries"
    ],
    applications: [
      "Enterprise SaaS platforms",
      "Healthcare systems",
      "Finance/banking",
      "Large-scale e-commerce"
    ],
    pros: [
      "High reliability",
      "Early problem detection",
      "Compliance tracking"
    ],
    cons: [
      "Alert fatigue",
      "Performance impact",
      "Infrastructure requirements",
      "Complexity at scale"
    ],
    keyConsideration: "This level of infrastructure cannot be fully automated by current AI - requires human expertise",
    resources: [
      { name: "Langfuse", url: "https://langfuse.com/" },
      { name: "LangSmith", url: "https://www.langchain.com/langsmith" },
      { name: "Weights & Biases", url: "https://wandb.ai/" },
      { name: "Agenta", url: "https://www.agenta.ai/" },
      { name: "Lilypad", url: "https://lilypad.so/" },
      { name: "Mirascope", url: "https://mirascope.com/" },
      { name: "PromptLayer", url: "https://promptlayer.com/" },
      { name: "Best Prompt Engineering Tools", url: "https://mirascope.com/blog/prompt-engineering-tools" }
    ]
  },
  {
    id: 18,
    slug: "guardrails-safety",
    title: "Guardrails & Safety",
    summary: "Checking all inputs for harmful content, PII, or injection attacks, classifying risk levels, and applying appropriate controls.",
    analogy: "Airport security with multiple checkpoints checking for threats.",
    complexity: "advanced",
    whenToUse: [
      "Public-facing systems",
      "PR-sensitive applications",
      "Government systems",
      "Customer-facing chatbots",
      "Enterprise platforms"
    ],
    applications: [
      "Customer service chatbots",
      "Public interfaces",
      "Content moderation systems",
      "Government services"
    ],
    pros: [
      "Risk mitigation",
      "Compliance protection",
      "Brand safety",
      "User safety"
    ],
    cons: [
      "False positives",
      "User friction",
      "Complexity",
      "Balance needed"
    ],
    keyConsideration: "Use pre-prompted strategies (clickable options) instead of open text boxes for maximum security",
    resources: [
      { name: "Content moderation APIs", url: "https://www.openai.com/" },
      { name: "PII detection libraries", url: "https://github.com/" }
    ],
    mermaidDiagram: `graph TD
    A[Input Received] --> B[Sanitize Input]
    B --> C{Check Input Type}
    C --> D[PII Detection]
    D --> E[Detect & Redact]
    C --> F[Injection Detection]
    F --> G[SQL Injection Check]
    F --> H[Prompt Injection Check]
    C --> I[Malicious Content]
    I --> J[Filter or Block]
    E --> K[Risk Classification]
    G --> K
    H --> K
    J --> K
    K --> L{Risk Level}
    L -->|Low| M[Process Normally]
    L -->|Medium| N[Additional Constraints]
    L -->|High| O[Human in Loop]
    M --> P[Execute Task]
    N --> P
    O --> P
    P --> Q[Output Moderation]`
  },
  {
    id: 19,
    slug: "prioritization",
    title: "Prioritization",
    summary: "Scoring tasks based on value, risk, effort, and urgency, building dependency graphs, and dynamically re-prioritizing as conditions change.",
    analogy: "Emergency room triage that handles critical cases first while ensuring everyone gets seen.",
    complexity: "advanced",
    whenToUse: [
      "Dynamic environments",
      "Resource constraints",
      "Complex workflows",
      "Changing priorities"
    ],
    applications: [
      "Task management systems",
      "Customer service queues",
      "Manufacturing scheduling",
      "Healthcare triage",
      "DevOps pipelines"
    ],
    pros: [
      "Adaptability",
      "Transparency",
      "Optimal resource usage"
    ],
    cons: [
      "Context switching overhead",
      "Non-deterministic behavior",
      "Edge case challenges",
      "Complexity in dynamic environments"
    ],
    keyConsideration: "Priority Score = (Value × Effort × Urgency) ÷ Risk",
    resources: [
      { name: "Task queuing systems", url: "https://github.com/" }
    ],
    mermaidDiagram: `graph TD
    A[Task List] --> B[Build Dependency Graph]
    B --> C[Score Each Task]
    C --> D[Dependency Count]
    C --> E[Time Sensitivity]
    C --> F[Effort Required]
    C --> G[Risk Level]
    C --> H[Business Value]
    D --> I[Calculate Priority Score]
    E --> I
    F --> I
    G --> I
    H --> I
    I --> J[Priority = Value × Effort × Urgency ÷ Risk]
    J --> K[Rank Tasks]
    K --> L[Scheduling Strategy]
    L --> M[Load Balancing]
    L --> N[Task Aging]
    L --> O[Apply Quotas]
    M --> P[Prioritize in Queue]
    N --> P
    O --> P
    P --> Q[Execute Top Task]`
  },
  {
    id: 20,
    slug: "exploration-discovery",
    title: "Exploration & Discovery",
    summary: "Broadly exploring knowledge spaces across papers, data, and expert sources, identifying patterns, clustering into themes, then focusing on promising leads.",
    analogy: "A detective gathering clues from everywhere, finding patterns, then focusing on the most promising leads.",
    complexity: "advanced",
    whenToUse: [
      "Deep research needed",
      "Competitive analysis",
      "Knowledge synthesis",
      "Discovery projects"
    ],
    applications: [
      "Academic research",
      "R&D departments",
      "Drug discovery",
      "Market research",
      "Competitive intelligence",
      "Deep Research features (Perplexity, Claude)"
    ],
    pros: [
      "Innovation enablement",
      "Comprehensive coverage",
      "Pattern recognition",
      "Smart focus"
    ],
    cons: [
      "Time-intensive",
      "Resource-heavy",
      "High API costs",
      "Document processing overhead"
    ],
    keyConsideration: "This pattern powers features like Perplexity Deep Research and Claude Deep Research.",
    resources: [
      { name: "Deep Research features (Perplexity, Claude)", url: "https://www.perplexity.ai/" },
      { name: "Academic search APIs", url: "https://www.semanticscholar.org/" }
    ],
    mermaidDiagram: `graph TD
    A[Research Goal] --> B[Explore Sources]
    B --> C[Domain Experts]
    B --> D[Data Sets]
    B --> E[Academic Papers]
    B --> F[Industry Reports]
    C --> G[Compile Information]
    D --> G
    E --> G
    F --> G
    G --> H[Map Knowledge Space]
    H --> I[Identify Key Areas]
    I --> J[Cluster Themes]
    J --> K[Selection Criteria]
    K --> L[Novelty Score]
    K --> M[Potential Impact]
    K --> N[Knowledge Gaps]
    K --> O[Feasibility]
    L --> P{Pick Exploration Target}
    M --> P
    N --> P
    O --> P
    P --> Q[Deep Investigation]
    Q --> R[Synthesize Insights]
    R --> S{Continue Exploring?}
    S -->|Yes| B
    S -->|No| T[Generate Report]`
  }
];

export const patternSelectionMatrix = [
  { useCase: "Content Creation", patterns: "Reflection (#4), Prompt Chaining (#1)" },
  { useCase: "Customer Service", patterns: "Routing (#2), Human-in-Loop (#12), RAG (#13)" },
  { useCase: "Data Processing", patterns: "Parallelization (#3), Prompt Chaining (#1)" },
  { useCase: "Research", patterns: "Exploration & Discovery (#20), RAG (#13)" },
  { useCase: "Production", patterns: "Exception Handling (#11), Evaluation (#17), Guardrails (#18)" },
  { useCase: "Cost Optimization", patterns: "Resource-Aware (#15), Prompt Chaining (#1)" },
  { useCase: "Complex Projects", patterns: "Planning (#6), Multi-Agent (#7), Goal Setting (#10)" },
  { useCase: "Learning Systems", patterns: "Learning & Adaptation (#9), Memory Management (#8)" }
];

export const getComplexityColor = (complexity: ComplexityLevel): string => {
  switch (complexity) {
    case 'beginner':
      return 'bg-badge-beginner text-primary-foreground';
    case 'intermediate':
      return 'bg-badge-intermediate text-foreground';
    case 'advanced':
      return 'bg-badge-advanced text-primary-foreground';
    case 'experimental':
      return 'bg-badge-experimental text-primary-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const getComplexityTextColor = (complexity: ComplexityLevel): string => {
  switch (complexity) {
    case 'beginner':
      return 'text-green-600';
    case 'intermediate':
      return 'text-blue-600';
    case 'advanced':
      return 'text-orange-600';
    case 'experimental':
      return 'text-purple-600';
    default:
      return 'text-muted-foreground';
  }
};
