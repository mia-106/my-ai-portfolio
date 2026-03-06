/**
 * 作品集项目数据 - 硬核AI工程师版
 * 面试官视角：展示工程能力和解决复杂问题的能力
 */

export interface Challenge {
  scenario: string;
  challenge: string;
  solution: string;
}

export interface DemoVideo {
  title: string;
  description: string;
  video: string;
  features: string[];
}

export interface Capability {
  icon: string;
  label: string;
  labelEn: string;
  proof: string;
}

export interface Feature {
  title: string;
  description: string;
  image?: string;
  diagram?: string;
  interactiveChart?: {
    title: string;
    description: string;
    nodes: {
      id: string;
      label: string;
      x: number;
      y: number;
      color: string;
      type: 'input' | 'process' | 'decision' | 'output';
    }[];
    connections: {
      from: string;
      to: string;
      label?: string;
      color: string;
    }[];
  };
  terminalFlow?: {
    title: string;
    description: string;
    steps: {
      node: {
        id: string;
        label: string;
        type: 'input' | 'process' | 'decision' | 'output';
        description?: string;
        code?: string;
      };
      delay: number;
      highlight?: string[];
    }[];
  };
  points?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  coverImage: string;
  screenshot?: string;
  completedDate?: string;
  architecture: string;
  architectureTitle?: string;
  architectureDescription?: string;
  challenges: Challenge[];
  highlights: string[];
  demoVideos?: DemoVideo[];
  github?: string;
  demo?: string;
  capabilities?: Capability[];
  features?: Feature[];
  productionEngineering?: {
    title: string;
    description: string;
    challenge: {
      title: string;
      content: string;
    };
    solution: {
      title: string;
      content: string;
    };
  };
  // AI Career Agent 特有字段
  businessModel?: {
    valueProposition: string;
    targetUsers: string[];
    painPoints: string[];
  };
  technicalStack?: {
    frontend: string[];
    backend: string[];
    ai: string[];
    tools: string[];
  };
  metrics?: {
    developmentTime: string;
    model: string;
    temperature: number;
    responseFormat: string;
  };
  projectInsights?: {
    title: string;
    description: string;
    technicalGrowth: string[];
    productThinking: string[];
    keyLearnings: string[];
  };
}

export const projects: Project[] = [
  {
    id: 'ai-career-agent',
    title: 'AI Career Agent',
    subtitle: '2025年12月底实战作品 - 全流程求职辅助系统',
    description: '一个基于 Next.js + DeepSeek API 的全栈 AI 应用，通过 OEP 胜任力评估模型、STAR 原则简历重铸、多 Agent 模拟面试三大核心功能，为求职者提供从诊断到精修再到面试验证的完整闭环解决方案。',
    tags: ['Next.js 14', 'TypeScript', 'DeepSeek API', 'Zustand', 'Tailwind CSS', 'Chart.js'],
    coverImage: '/project-screenshots/求职项目封面.png',
    
    // 业务价值与商业模式
    businessModel: {
      valueProposition: '用 AI 让每位求职者都拥有世界500强的求职教练团队',
      targetUsers: [
        '转行者：从其他行业转入 AI/技术领域，需要系统性准备',
        '应届毕业生：缺乏求职经验，需要专业指导',
        '职场进阶者：希望跳槽到更好的公司，需要针对性优化'
      ],
      painPoints: [
        '不知道自己与目标职位的差距 - 凭感觉/他人主观评价',
        '简历不知道怎么写 - 模板套用/付费修改',
        'AI 改写后信息断层 - 无法自圆其说',
        '面试准备无从下手 - 网上搜面经/死记硬背'
      ]
    },
    
    // 技术栈详情
    technicalStack: {
      frontend: ['Next.js 14.2 (App Router)', 'React 18', 'TypeScript 5.2', 'Tailwind CSS 3.4', 'Chart.js + react-chartjs-2'],
      backend: ['Next.js API Routes', 'DeepSeek API', 'pdf-lib + pdf-parse'],
      ai: ['DeepSeek V3 API', 'OEP 胜任力评估模型', 'STAR 原则 Prompt 工程', '多 Agent 人设设计'],
      tools: ['Zustand 4.4 (状态管理)', 'React Markdown', 'Lucide Icons', 'LocalStorage 持久化']
    },
    
    // 核心技术指标
    metrics: {
      developmentTime: '2025年12月下旬开始，实际约2个月',
      model: 'deepseek-chat',
      temperature: 0.2,
      responseFormat: 'JSON (严格结构化输出)'
    },
    
    architecture: `flowchart TD
    subgraph Frontend["前端层"]
        UI[React UI Components]
        Store[Zustand 状态管理]
        Chart[Chart.js 可视化]
        UI --> Store --> Chart
    end
    
    subgraph Backend["后端 API 层"]
        Diagnostic[深度诊断服务]
        Refine[简历重铸服务]
        Interview[模拟面试服务]
        Chat[AI助教聊天]
        Parse[PDF解析服务]
    end
    
    subgraph AI["AI 处理层"]
        OEP[OEP 胜任力模型]
        STAR[STAR 原则引擎]
        Interviewers[三轮面试官]
        CoT[思维链推理]
    end
    
    subgraph External["外部服务"]
        DeepSeek[DeepSeek API]
        PDF[PDF 处理库]
        DeepSeek --> PDF
    end
    
    Frontend --> Backend
    Backend --> AI
    AI --> External`,
    architectureTitle: 'Next.js 全栈架构',
    architectureDescription: '采用 Next.js App Router + API Routes 全栈架构，前端通过 Zustand 管理状态并自动持久化到 LocalStorage，后端通过 API Routes 安全调用 DeepSeek API，实现 API Key 的服务端隔离。',
    
    // 核心能力展示
    capabilities: [
      {
        icon: '🧠',
        label: 'OEP 胜任力评估模型',
        labelEn: 'OEP Competency Assessment',
        proof: '自研评估模型：总得分 = (Outcomes 产出 × 0.4) + (Evidence 证据 × 0.4) + (Potential 潜能 × 0.2)，通过 AI 分析简历与 JD 的匹配度，输出量化雷达图和深度诊断报告。'
      },
      {
        icon: '⚡',
        label: 'STAR 原则简历重铸',
        labelEn: 'STAR Principle Resume Refinement',
        proof: '左侧对话式交互 + 右侧实时 A4 预览，采用镜像匹配、数字量化、强动词开头等六大黄金法则，确保简历内容与 JD 高度匹配且保持职业诚实。'
      },
      {
        icon: '🎭',
        label: '多 Agent 模拟面试',
        labelEn: 'Multi-Agent Interview Simulation',
        proof: '构建 TA(招募顾问)、HM(业务主管)、Director(综合决策)三轮面试官人设，采用一致性审计哲学和有限追问机制，提供沉浸式面试演练和详细复盘报告。'
      },
      {
        icon: '🔒',
        label: '企业级安全设计',
        labelEn: 'Enterprise-Grade Security',
        proof: 'API Key 通过 Vercel 环境变量服务端隔离，所有 AI 调用经过 Next.js API Routes 转发，前端无法直接访问 DeepSeek API，确保密钥安全。'
      }
    ],
    
    // 功能特性展示
    features: [
      {
        title: '深度诊断',
        description: '基于 OEP 胜任力评估模型，对比简历与目标 JD，生成包含技能矩阵、竞争力分析、优化建议的完整诊断报告。',
        points: [
          '多职位 JD 对比分析',
          '雷达图可视化展示',
          'AI 驱动的优化建议',
          '个性化学习策略'
        ]
      },
      {
        title: '智感编辑器',
        description: '分栏式设计，左侧自然语言交互，右侧实时 A4 预览，支持 Markdown 渲染和 PDF 导出。',
        points: [
          '所见即所得编辑体验',
          'STAR 原则自动重写',
          '事实锚定防信息断层',
          '实时预览与导出'
        ]
      },
      {
        title: '模拟面试',
        description: '三轮不同角色面试官，采用追问机制和一致性审计，生成包含评分、优缺点分析的复盘报告。',
        points: [
          '三轮面试官人设',
          'SSE 流式问答体验',
          'AI 复盘报告生成',
          '面试历史记录'
        ]
      }
    ],
    
    // 技术挑战与解决方案
    challenges: [
      {
        scenario: 'AI 输出格式不可控',
        challenge: 'DeepSeek API 有时会在 JSON 外层包装 Markdown 标签，导致前端解析失败。',
        solution: '实现多层容错机制：先尝试直接解析，失败后用正则提取 JSON，最后兜底处理。确保系统鲁棒性。'
      },
      {
        scenario: '状态管理复杂度高',
        challenge: '应用包含诊断、精修、面试等多个模块，状态关系复杂，需要处理页面刷新数据丢失问题。',
        solution: '采用 Zustand + persist 中间件，实现状态自动持久化到 LocalStorage，并通过 partialize 选择性持久化，排除敏感信息。'
      },
      {
        scenario: '流式响应处理',
        challenge: '面试复盘报告需要逐字显示，提升用户体验，但 Next.js API Routes 默认不支持流式响应。',
        solution: '使用 Server-Sent Events (SSE) 技术，通过 ReadableStream 逐块返回 AI 生成内容，前端监听 text/event-stream 实现打字机效果。'
      }
    ],
    
    // 项目亮点
    highlights: [
      '7天完成从 0 到 1 的全栈 AI 应用开发，展示快速学习能力',
      '自研 OEP 胜任力评估模型，量化求职竞争力',
      '实现企业级 API Key 安全管理，服务端隔离设计',
      '采用 Zustand 状态管理，支持自动持久化',
      '设计多 Agent 人设系统，提供真实面试体验',
      '支持 SSE 流式响应，提升用户体验'
    ],
    
    // 生产级工程实践
    productionEngineering: {
      title: '生产级部署与监控',
      description: '项目部署在 Vercel 平台，利用其零配置部署和自动扩缩容能力。通过环境变量管理 API Key，确保生产环境安全。采用 TypeScript 类型系统，减少运行时错误。',
      challenge: {
        title: 'AI API 成本控制',
        content: 'DeepSeek API 按调用次数收费，需要控制成本避免意外超支。按 token 计费，输入约 ¥1/百万 token，输出约 ¥2/百万 token。在用户量增长时，成本可能快速失控。'
      },
      solution: {
        title: '多层成本控制策略',
        content: '实现 temperature=0.2 低随机性设置减少重复调用，使用 localStorage 缓存诊断结果避免重复计算，前端添加请求节流防止用户频繁操作。同时建立成本监控机制，设置预算告警，确保可持续运营。'
      }
    },
    
    // 项目收获与反思
    projectInsights: {
      title: '项目收获与反思',
      description: '通过这个7天的实战项目，不仅掌握了全栈 AI 应用开发技能，更重要的是培养了产品思维和工程化意识。',
      technicalGrowth: [
        'Next.js 14 App Router 深入理解与实战应用',
        'React 18 Hooks 与 TypeScript 类型系统掌握',
        'Zustand 状态管理与持久化最佳实践',
        'Prompt 工程与 OEP 胜任力评估模型设计',
        'SSE 流式响应与 API 成本控制策略'
      ],
      productThinking: [
        '从真实痛点出发设计产品功能',
        '用数据驱动决策（OEP 量化评估模型）',
        'MVP 思维：优先核心功能，快速验证假设',
        '平衡功能复杂度与用户体验',
        '基于用户反馈持续迭代优化'
      ],
      keyLearnings: [
        'Vibe Coding 不等于随意编码，仍需架构思维',
        'AI 应用的核心价值在于解决真实问题',
        '成本控制是 AI 产品可持续性的关键',
        '用户体验决定产品成败，技术只是手段',
        '快速学习能力比技术栈本身更重要'
      ]
    },
    
    // 链接信息
    github: 'https://github.com/mia-106/zhigan-agent',
    demo: 'https://zhigan-agent.vercel.app'
  },
  {
    id: 'youtube-agentic-rag',
    title: 'YouTube Agentic RAG',
    subtitle: '2026年2月实战作品 - 生产级多智能体知识问答系统',
    description: '基于 LangGraph 的生产级 RAG 系统，构建 IP 知识引擎，让用户可以与 YouTube 思想者的内容进行深度对话。',
    tags: ['Python', 'LangGraph', 'PGVector', 'FastAPI', 'Hybrid Search'],
    coverImage: '/project-screenshots/RAG封面.png',
    screenshot: '/project-screenshots/RAG封面.png',
    completedDate: '2026年2月实战作品',
    architecture: `flowchart TB
    subgraph Agent["LangGraph 工作流"]
        route["route_query<br/>Intent Routing"] -->|chitchat| chat["handle_chitchat<br/>Chat Handler"]
        route -->|search_direct| web["web_search<br/>Web Search"]
        route -->|query| sum["summarize_conversation<br/>Conversation Summary"]
        sum --> ret["retrieve<br/>Hybrid Retrieval"]
        ret --> grade["grade_documents<br/>Semantic Scoring"]
        grade -->|sufficient| gen["generate<br/>Generate Response"]
        grade -->|insufficient| web
        gen --> correct["self_correct<br/>Self Correction"]
        correct --> update["update_profile<br/>Update Profile"]
    end
    
    subgraph Retrieval["检索层"]
        vec["Vector Search<br/>BGE-M3"]
        bm25["BM25 Search<br/>Keyword Search"]
        rrf["RRF Fusion<br/>Fusion Algorithm"]
        rerank["Rerank<br/>BGE Reranking"]
        
        ret --> vec
        ret --> bm25
        vec & bm25 --> rrf
        rrf --> rerank
        rerank --> grade
    end
    
    subgraph Storage["存储层"]
        pg["PostgreSQL<br/>Metadata Storage"]
        vector["PGVector<br/>Vector Database"]
        cache["Redis<br/>Cache Layer"]
    end
    
    subgraph External["外部服务"]
        youtube["YouTube API<br/>Video Data"]
        firecrawl["Firecrawl<br/>Web Crawler"]
        openai["OpenAI API<br/>LLM Model"]
    end
    
    style Agent fill:transparent,stroke:#ffffff,color:#fff
    style Retrieval fill:transparent,stroke:#ffffff,color:#fff
    style Storage fill:transparent,stroke:#ffffff,color:#fff
    style External fill:transparent,stroke:#ffffff,color:#fff`,
    challenges: [
      {
        scenario: '长对话成本',
        challenge: '上下文累积导致 token 消耗剧增，API 成本失控',
        solution: '超过8轮自动触发记忆摘要，压缩历史消息',
      },
      {
        scenario: '知识不足',
        challenge: '本地 RAG 召回内容无法回答用户问题',
        solution: 'grade_documents 节点判断充分性，不足则触发 web_search 补充外部知识',
      },
    ],
    features: [
      {
        title: '多智能体协作',
        description: 'LangGraph 状态机管理 9 个核心节点，支持条件分支和循环处理',
        terminalFlow: {
          title: 'LangGraph 工作流执行',
          description: '状态机驱动的多节点协作流程',
          steps: [
            {
              node: {
                id: 'route_query',
                label: 'route_query',
                type: 'process',
                description: '分析用户输入，判断查询类型',
                code: 'def route_query(state: AgentState):\n  question = state["question"]\n  # 正则匹配闲聊模式\n  if re.match(chitchat_patterns, question):\n    return {"intent": "chitchat"}\n  # LLM 意图分类\n  return {"intent": "query"}'
              },
              delay: 0
            },
            {
              node: {
                id: 'retrieve',
                label: 'retrieve',
                type: 'process',
                description: '混合检索：向量 + BM25 + RRF 融合',
                code: 'async def retrieve(state):\n  queries = await generate_multi_queries(question)\n  vector_results = await vector_search(queries)\n  bm25_results = await bm25_search(queries)\n  fused = reciprocal_rank_fusion(vector, bm25)\n  return {"documents": rerank(question, fused)}'
              },
              delay: 1
            },
            {
              node: {
                id: 'grade',
                label: 'grade_documents',
                type: 'decision',
                description: '判断本地知识是否充分',
                code: 'def grade_documents(state):\n  result = llm.invoke(f"Evaluate: {question} vs {documents}")\n  is_sufficient = result.get("is_sufficient", False)\n  return {"is_sufficient": is_sufficient}'
              },
              delay: 2,
              highlight: ['sufficient', 'false', 'true']
            },
            {
              node: {
                id: 'generate',
                label: 'generate',
                type: 'output',
                description: '基于检索结果生成回答',
                code: 'def generate(state):\n  response = llm.invoke(f"Answer: {question}\\nContext: {documents}")\n  return {"response": response, "sources": documents}'
              },
              delay: 3
            },
            {
              node: {
                id: 'self_correct',
                label: 'self_correct',
                type: 'process',
                description: '自我纠错：检测幻觉并修正',
                code: 'def self_correct(state):\n  hallucination_check = llm.invoke(f"Check: {generation}")\n  if hallucination_check["has_hallucination"]:\n    generation = fix_hallucination(generation)\n  return {"generation": generation}'
              },
              delay: 4,
              highlight: ['hallucination', 'fix']
            }
          ]
        },
        points: [
          '状态机管理：9个核心节点的条件路由',
          '条件分支：基于意图的智能分发',
          '循环处理：支持多轮对话和迭代优化',
          '错误恢复：节点异常时的自动降级'
        ]
      },
      {
        title: '智能检索',
        description: '向量检索 + 关键词检索 + 重排序融合，提升召回精度',
        terminalFlow: {
          title: '混合检索流程',
          description: 'Multi-Query + 并行搜索 + RRF 融合的完整检索链',
          steps: [
            {
              node: {
                id: 'multi_query',
                label: 'Multi-Query Generation',
                type: 'process',
                description: '生成多个查询变体提升召回覆盖面',
                code: 'async def generate_multi_queries(question):\n  prompt = f"Generate 3 queries for: {question}"\n  queries = await llm.invoke(prompt)\n  return [question] + queries.split("\\n")'
              },
              delay: 0
            },
            {
              node: {
                id: 'parallel_search',
                label: 'Parallel Search',
                type: 'process',
                description: '向量检索和 BM25 并行执行',
                code: '# 并行执行向量检索和关键词检索\nvector_task = vector_search(queries)\nbm25_task = bm25_search(queries)\nvector_results, bm25_results = await asyncio.gather(vector_task, bm25_task)'
              },
              delay: 1,
              highlight: ['parallel', 'gather']
            },
            {
              node: {
                id: 'rrf_fusion',
                label: 'RRF Fusion',
                type: 'decision',
                description: 'Reciprocal Rank Fusion 融合算法',
                code: 'def reciprocal_rank_fusion(vector, bm25, k=60):\n  scores = {}\n  for doc in set(vector + bm25):\n    vector_rank = vector.index(doc) if doc in vector else float(\'inf\')\n    bm25_rank = bm25.index(doc) if doc in bm25 else float(\'inf\')\n    scores[doc] = 1/(k + vector_rank) + 1/(k + bm25_rank)\n  return sorted(scores.items(), key=lambda x: x[1], reverse=True)'
              },
              delay: 2,
              highlight: ['fusion', 'reciprocal', 'rank']
            },
            {
              node: {
                id: 'rerank',
                label: 'BGE Rerank',
                type: 'process',
                description: '基于 BGE 模型重排序提升精度',
                code: 'async def rerank(question, documents, top_k=5):\n  pairs = [(question, doc) for doc in documents]\n  scores = await rerank_model.predict(pairs)\n  ranked = sorted(zip(documents, scores), key=lambda x: x[1], reverse=True)\n  return ranked[:top_k]'
              },
              delay: 3,
              highlight: ['rerank', 'top_k']
            }
          ]
        },
        points: [
          'BGE-M3 向量模型：多语言支持',
          'BM25 关键词检索：精确匹配',
          'RRF 融合算法：多路结果合并',
          'BGE 重排序：二次精准筛选'
        ]
      },
      {
        title: '幻觉防护',
        description: '双重保险防止幻觉，确保回答基于真实资料',
        terminalFlow: {
          title: '纠错流程',
          description: '语义评分与事实核查的双重保障机制',
          steps: [
            {
              node: {
                id: 'generate',
                label: 'Initial Generation',
                type: 'process',
                description: '基于检索内容生成初始回答',
                code: 'def generate(state):\n  context = "\\n".join(state["documents"][:3])\n  response = llm.invoke(f"Answer: {question}\\n\\nContext:\\n{context}")\n  return {"response": response, "sources": state["documents"][:3]}'
              },
              delay: 0
            },
            {
              node: {
                id: 'semantic_check',
                label: 'Semantic Scoring',
                type: 'decision',
                description: '评估回答与问题的语义相关性',
                code: 'def semantic_score(question, answer):\n  prompt = f"Score relevance (0-1):\\nQ: {question}\\nA: {answer}"\n  score = llm.invoke(prompt)\n  return float(score.strip())'
              },
              delay: 1,
              highlight: ['relevance', 'score']
            },
            {
              node: {
                id: 'fact_check',
                label: 'Fact Verification',
                type: 'decision',
                description: '交叉验证关键事实的准确性',
                code: 'def fact_check(response, sources):\n  facts = extract_facts(response)\n  verifications = []\n  for fact in facts:\n    for source in sources:\n      if fact in source:\n        verifications.append(True)\n        break\n  return len(verifications) / len(facts) if facts else 0'
              },
              delay: 2,
              highlight: ['verification', 'facts', 'accuracy']
            },
            {
              node: {
                id: 'citation',
                label: 'Citation Builder',
                type: 'process',
                description: '为回答添加引用来源',
                code: 'def add_citations(response, sources):\n  sentences = response.split(". ")\n  cited_response = []\n  for sentence in sentences:\n    best_source = find_best_source(sentence, sources)\n    cited_response.append(f"{sentence} [{sources.index(best_source)}]")\n  return ". ".join(cited_response)'
              },
              delay: 3,
              highlight: ['citation', 'source']
            },
            {
              node: {
                id: 'final_output',
                label: 'Final Output',
                type: 'output',
                description: '输出带引用的可靠回答',
                code: 'final_response = {\n  "answer": cited_response,\n  "sources": used_sources,\n  "confidence": semantic_score * fact_check_score,\n  "citations": citation_map\n}'
              },
              delay: 4,
              highlight: ['confidence', 'citations']
            }
          ]
        },
        points: [
          '语义评分：判断文档相关性',
          '事实核查：交叉验证回答准确性',
          '引用溯源：每条回答附带来源'
        ]
      },
      {
        title: '多层成本控制',
        description: '四重策略确保AI应用可持续运营',
        terminalFlow: {
          title: '成本控制策略',
          description: '从上下文压缩到实时监控的完整成本控制链',
          steps: [
            {
              node: {
                id: 'context_compress',
                label: 'Context Compression',
                type: 'process',
                description: '对话超过8轮时自动压缩历史消息',
                code: 'def summarize_conversation(state):\n  chat_history = state.get("chat_history", [])\n  if len(chat_history) > 8:\n    summary = llm.invoke(f"Summarize: {chat_history[-8:]}")\n    return {"chat_history": [summary] + chat_history[-2:]}\n  return {}'
              },
              delay: 0,
              highlight: ['compress', 'summary']
            },
            {
              node: {
                id: 'token_limit',
                label: 'Token Limitation',
                type: 'process',
                description: '限制RAG上下文最多5000 tokens',
                code: 'def truncate_context(documents, max_tokens=5000):\n  current_tokens = 0\n  truncated_docs = []\n  for doc in documents:\n    doc_tokens = count_tokens(doc)\n    if current_tokens + doc_tokens > max_tokens:\n      break\n    truncated_docs.append(doc)\n    current_tokens += doc_tokens\n  return truncated_docs'
              },
              delay: 1,
              highlight: ['truncate', '5000']
            },
            {
              node: {
                id: 'pre_decision',
                label: 'Pre-decision Filter',
                type: 'decision',
                description: 'Semantic Grader预判断是否需要生成',
                code: 'def semantic_grader(question, documents):\n  prompt = f"Grade if sufficient: {question} vs {documents}"\n  result = llm.invoke(prompt)\n  is_sufficient = result.get("is_sufficient", False)\n  return {"should_generate": is_sufficient}'
              },
              delay: 2,
              highlight: ['grade', 'sufficient']
            },
            {
              node: {
                id: 'cost_monitor',
                label: 'Cost Monitoring',
                type: 'process',
                description: '实时监控Token消耗并设置告警',
                code: 'def track_token_usage(operation, tokens_used):\n  cost_per_token = {"input": 0.001, "output": 0.002}\n  cost = tokens_used * cost_per_token[operation]\n  redis.incrby(f"daily_cost:{date}", cost)\n  if get_daily_cost() > BUDGET_LIMIT:\n    send_cost_alert()'
              },
              delay: 3,
              highlight: ['monitor', 'alert', 'budget']
            }
          ]
        },
        points: [
          '上下文压缩：对话超过8轮自动摘要',
          '检索截断：RAG上下文最多5000 tokens',
          '决策前置：Semantic Grader预判断',
          '实时监控：Token消耗追踪告警'
        ]
      }
    ],
    highlights: [
      'LangGraph DAG 状态机，9个核心节点的条件路由',
      '混合搜索：Vector + BM25 + RRF 融合 + BGE 重排序',
      '自我纠错节点：幻觉检测 + 引用保护',
      '多 Agent 动态切换（Dan Koe / Naval）'
    ],
    demoVideos: [
      {
        title: '问答演示 1',
        description: '展示用户提问与AI回答的完整交互过程',
        video: '/project-screenshots/回复1.mp4',
        features: ['实时流式响应', '引用溯源', '多轮对话']
      },
      {
        title: '问答演示 2',
        description: '展示不同类型问题的回答效果和准确性',
        video: '/project-screenshots/回复2.mp4',
        features: ['智能理解', '精准回答', '上下文记忆']
      }
    ],
    projectInsights: {
      title: '项目收获与反思',
      description: '通过这个YouTube Agentic RAG项目，深入掌握了生产级AI系统的开发全流程，从架构设计到部署上线的完整实践。',
      technicalGrowth: [
        'LangGraph状态机设计：掌握复杂工作流的编排与条件路由',
        '混合检索系统：实现Vector + BM25 + RRF融合的高精度搜索',
        '流式响应处理：SSE技术在实时交互中的应用',
        '成本控制策略：多维度优化确保AI应用可持续运营',
        '错误处理机制：构建健壮的分布式系统容错能力'
      ],
      productThinking: [
        '用户体验优先：从实际需求出发设计功能模块',
        '技术选型平衡：在性能、成本、维护性间找到最佳平衡点',
        '迭代式开发：通过快速原型验证技术可行性',
        '监控驱动：建立完善的系统可观测性体系',
        '扩展性设计：为未来功能扩展预留架构空间'
      ],
      keyLearnings: [
        'RAG系统的核心在于检索质量，而非模型大小',
        '生产级应用必须考虑成本控制和异常处理',
        '用户体验的流畅性比功能复杂度更重要',
        '技术架构的可观测性是长期维护的关键',
        '多Agent协作是提升系统智能的有效路径'
      ]
    },
    github: 'https://github.com/mia-106/rag-youtube',
    demo: 'https://rag-youtube-silk.vercel.app/',
  },
  {
    id: 'mind-dump',
    title: 'Mind Dump',
    subtitle: '2026年1月实战作品-AI 赋能的时间可视化工具',
    description: '一款创新的AI赋能时间管理工具，将流逝的时间转化为可交互的纸团堆叠。集成DeepSeek AI作为"时光合伙人"，通过思维树决策模型提供智能情感交互，让用户获得"今天也干了很多事情，没有白干"的成就感。',
    tags: ['React', 'TypeScript', 'Vite', 'Matter.js', 'Tailwind CSS', 'DeepSeek AI', 'Node.js'],
    coverImage: '/project-screenshots/minddump封面.png',
    screenshot: '/project-screenshots/mind-dump.png',
    completedDate: '2025年12月实战作品',
    architecture: `flowchart TB
    subgraph UI["用户界面层"]
        Start[StartPage<br/>Launch Guide]
        Home[HomePage<br/>Task Recording]
        History[HistoryPage<br/>History Review]
        Start --> Home
        Home --> History
    end

    subgraph Components["组件层"]
        Physics[PhysicsCanvas<br/>Physics Canvas]
        Time[TimePicker<br/>Time Selection]
        Category[CategorySelect<br/>Category Selection]
        Export[ExportService<br/>Data Export]
    end

    subgraph Engine["物理引擎层"]
        World[物理世界<br/>World.create]
        Bodies["Paper Ball Gen<br/>Bodies.fromVertices"]
        Collision[碰撞检测<br/>Events.on]
        Gravity[重力系统<br/>Engine.gravity]
    end

    subgraph Storage["数据层"]
        Local[localStorage<br/>Local Persistence]
        Format[时间格式化<br/>formatDuration]
        Stats[统计分析<br/>Time Summary]
    end

    subgraph AI["AI服务层"]
        API[API Routes<br/>/api/chat]
        Prompt[思维树决策<br/>Prompt工程]
        DeepSeek[DeepSeek AI<br/>大语言模型]
        API --> Prompt
        Prompt --> DeepSeek
    end

    Home --> Physics
    Home --> Time
    Home --> Category
    Home --> API
    History --> Export
    History --> Stats

    Physics --> World
    World --> Bodies
    Bodies --> Collision
    Collision --> Gravity

    Time --> Format
    Category --> Local
    Local --> Stats

    classDef ui fill:#1a1a1a,stroke:#ffffff,color:#ffffff
    classDef component fill:#1a1a1a,stroke:#ffffff,color:#ffffff  
    classDef engine fill:#1a1a1a,stroke:#ffffff,color:#ffffff
    classDef storage fill:#1a1a1a,stroke:#ffffff,color:#ffffff
    classDef ai fill:#1a1a1a,stroke:#ffffff,color:#ffffff
    
    class UI ui
    class Components component
    class Engine engine
    class Storage storage
    class AI ai`,
    architectureTitle: 'AI 赋能的全栈应用',
    architectureDescription: '采用 React + Vite 前端架构，深度集成 Matter.js 物理引擎。后端使用 Node.js Serverless Functions，集成 DeepSeek AI 提供智能情感交互。通过思维树决策模型实现四种回复模式，打造有温度的AI时光合伙人。',
    
    // 核心能力展示
    capabilities: [
      {
        icon: '🎯',
        label: '物理引擎集成',
        labelEn: 'Physics Engine Integration',
        proof: '深度集成 Matter.js 2D 物理引擎，实现纸团的重力、碰撞、摩擦力真实模拟。通过随机顶点生成算法，每个纸团都有独特的揉皱效果，解决命令式物理引擎与声明式 React 的集成挑战。'
      },
      {
        icon: '🎨',
        label: 'Neo-Brutalism 设计',
        labelEn: 'Neo-Brutalism Design',
        proof: '自研 Neo-Brutalism 设计系统：2-3px 黑色边框、4px 硬阴影、高饱和分类色彩。通过 Tailwind CSS 抽象 shadow-neo 等 utility class，提升组件开发效率。'
      },
      {
        icon: '🤖',
        label: 'AI 智能赋能',
        labelEn: 'AI-Powered Intelligence',
        proof: '集成 DeepSeek AI 作为"时光合伙人"，通过思维树决策模型分析用户情绪状态。提供深层接纳、现实锚点、高光共鸣、虚无摆渡四种智能回复模式，每个回复控制在25字以内。'
      },
      {
        icon: '🔧',
        label: '工程化实践',
        labelEn: 'Engineering Practices',
        proof: 'TypeScript 类型系统保障代码质量，React.memo 减少重渲染，虚拟滚动处理大量历史数据。物理引擎限流机制（最多50个纸团），确保性能表现。'
      }
    ],
    
    // 功能特性展示
    features: [
      {
        title: 'AI 智能交互',
        description: '集成 DeepSeek AI 作为"时光合伙人"，通过思维树决策模型提供智能情感交互。',
        points: [
          '思维树决策模型：根系感知、枝干选择、叶片生长三步推演',
          '四种回复模式：深层接纳、现实锚点、高光共鸣、虚无摆渡',
          '智能情绪识别：Anxiety、Anger、Sadness、Joy、Neutral、Boredom',
          '极简回复设计：25字以内，无Emoji，去定义化表达'
        ]
      },
      {
        title: '事项记录系统',
        description: '支持5种事项类型的完整记录系统，每个事项包含内容、分类、时长等完整信息。',
        points: [
          '5种事项分类：生活/日常、工作/学习、运动/健康、娱乐/休闲、其他/杂项',
          '时间选择器：支持小时分钟级精度输入',
          '事项分类色彩系统：薄荷绿、天空蓝、珊瑚粉、柠檬黄、薰衣草紫',
          'TaskEntry 数据结构：id、content、category、duration、timestamp'
        ]
      },
      {
        title: '物理引擎模拟',
        description: '基于 Matter.js 的真实物理引擎，纸团具有重力、碰撞、摩擦力等真实物理特性。',
        points: [
          '随机多边形算法：8-12个顶点生成独特纸团形状',
          '物理参数调优：弹性0.3、摩擦力0.5、空气阻力0.02',
          '纸团大小与时长关联：基础半径30px，每30分钟增加5px，最大60px',
          '音效系统：揉纸声(crumple)和落地声(drop)'
        ]
      }
    ],
    
    // 技术挑战与解决方案
    challenges: [
      {
        scenario: 'Matter.js 与 React 集成冲突',
        challenge: 'Matter.js 使用命令式渲染直接操作DOM，与React的声明式渲染理念冲突，需要处理好引擎生命周期和事件桥接。',
        solution: '通过 useRef 管理 Matter.js 引擎实例，在 useEffect 中正确初始化和销毁引擎。将物理事件转换为 React 状态，避免不必要的重渲染。'
      },
      {
        scenario: '物理引擎性能瓶颈',
        challenge: '纸团数量增加导致物理计算开销增大，移动设备可能出现卡顿和电池消耗过快问题。',
        solution: '实现物理引擎限流机制，最多保留50个纸团。使用 React.memo 对 PhysicsCanvas 组件进行记忆化处理，历史记录采用虚拟滚动技术。'
      },
      {
        scenario: '时间可视化设计挑战',
        challenge: '如何将抽象的时间投入转化为具象的视觉元素，让用户直观感受时间分布。',
        solution: '设计纸团大小与时长成正比的映射关系，通过时间标签功能显示具体时长。使用分类色彩系统区分不同类型事项的时间投入。'
      }
    ],
    
    // 项目亮点
    highlights: [
      'Matter.js 物理引擎与 React 深度集成，解决命令式与声明式冲突',
      'Neo-Brutalism 设计系统，独特视觉风格提升产品辨识度',
      '创新的时间可视化理念，纸团大小与时长动态关联',
      '完整的性能优化方案，确保流畅用户体验',
      '模块化组件设计，支持功能快速迭代扩展',
      'TypeScript 类型系统保障代码质量和维护性'
    ],
    
    // 生产级工程实践
    productionEngineering: {
      title: '前端性能优化与工程化',
      description: '项目采用 Vite 构建工具，享受极速的开发体验。通过多种优化手段确保生产环境的性能表现，并建立完善的组件设计系统。',
      challenge: {
        title: '物理模拟高频更新与React渲染平衡',
        content: 'Matter.js 每帧都需要进行物理计算，高频更新容易导致React过度重渲染。特别是在组件状态复杂时，可能出现性能下降和用户体验卡顿。'
      },
      solution: {
        title: '分层优化与状态隔离',
        content: '使用 useRef 管理物理引擎实例，避免 React 状态干扰。实现 React.memo 记忆化处理，对 PhysicsCanvas 组件进行浅比较优化。建立虚拟滚动机制处理大量历史数据，确保界面响应性。'
      }
    },
    
    // 项目收获与反思
    projectInsights: {
      title: '项目收获与反思',
      description: '通过 Mind Dump 项目的开发，掌握了物理引擎集成、复杂交互设计、性能优化等技能，培养了产品思维和工程化意识。',
      technicalGrowth: [
        'Matter.js 物理引擎深度集成与性能调优',
        'React + TypeScript 复杂组件设计最佳实践',
        'Neo-Brutalism 设计系统从零到一构建',
        'Vite 构建工具深度使用与优化配置',
        '前端性能优化与状态管理技巧'
      ],
      productThinking: [
        '从用户痛点出发设计产品功能（时间流逝感强、成就感缺失）',
        '用视觉语言强化产品理念（纸团堆叠带来成就感）',
        '平衡功能复杂度与用户体验流畅性',
        '通过技术选型体现产品特色和差异化',
        '建立完整的设计系统和组件规范'
      ],
      keyLearnings: [
        '物理引擎不只是炫技，而是解决用户体验问题的工具',
        '设计系统的价值在于提升开发效率和产品一致性',
        '命令式与声明式编程的冲突需要合理的架构设计',
        '性能优化是产品成功的关键因素，需要多维度考虑',
        '个人项目是技术学习和展示的最佳载体'
      ]
    },
    
    github: 'https://github.com/mia-106/mind-dump',
    demo: 'https://mind-dump-pi.vercel.app/'
  },
  {
    id: 'xhs-content-engine',
    title: 'XHS Content Engine',
    subtitle: 'Claude Code Skills 驱动的全链路自动化流水线',
    description: '从语音灵感到视觉成品的工业级AI创作系统，通过Claude Code Skill机制实现60-120倍效率提升，彻底解决小红书内容创作瓶颈。',
    tags: ['Python', 'Claude Code Skills', 'Playwright', 'Jinja2', 'Prompt Engineering'],
    coverImage: '/project-screenshots/xhs封面.jpg',
    architecture: `flowchart LR
    %% 输入层
    A[语音输入] --> SP[Speech Processing Engine]
    C[配置系统] --> SP
    C --> AN[Analysis Engine] 
    C --> DA[Director Agent Engine]

    %% 核心处理引擎
    subgraph SP [Speech Processing Engine]
        SP_Entry[语音转录] --> SP_Process[智能处理] --> SP_Exit[结构化输出]
    end
    
    subgraph AN [Analysis Engine]
        AN_Entry[内容扫描] --> AN_Analyze[爆款分析] --> AN_Exit[策略输出]
    end
    
    subgraph DA [Director Agent Engine]
        DA_Entry[创作策划] --> DA_Gen[内容生成] --> DA_Render[视觉渲染] --> DA_Exit[图文成品]
    end

    %% 核心数据流
    SP_Exit --> AN_Entry
    AN_Exit --> DA_Entry

    %% 样式定义
    classDef default fill:#0a0a0a,stroke:#ffffff,color:#ffffff,font-size:12px
    classDef engine fill:#1a1a1a,stroke:#ffffff,color:#ffffff,font-size:11px
    classDef io fill:#0a0a0a,stroke:#ffffff,color:#ffffff,font-size:10px
    
    class SP,AN,DA engine
    class A,C,SP_Entry,AN_Entry,DA_Entry,DA_Exit io
`,
    challenges: [
      {
        scenario: 'Skill状态管理',
        challenge: '多阶段工作流的状态维护复杂，用户交互需要物理确认',
        solution: 'Claude Code Skill机制 + Phase Gate设计，每个阶段用户点头才继续，确保质量门禁',
      },
      {
        scenario: '文件驱动耦合',
        challenge: '三个Skill之间数据传递容易出错，依赖硬编码路径',
        solution: '配置驱动架构 + Obsidian知识库衔接，通过文件系统实现松耦合',
      },
      {
        scenario: '视觉一致性',
        challenge: '批量生成时排版风格不统一，需要重复设计',
        solution: 'Jinja2模板系统 + 零Emoji禁令 + 品牌视觉规范，工业化标准输出',
      }
    ],
    highlights: [
      'Claude Code Skill机制：voice2note、analyzer_content、yy_director三重技能串联',
      '主动追问能力：AI发现模糊点主动询问，人机协作提升准确率30%',
      '配置驱动架构：config.json动态路径映射，跨设备无缝迁移',
      '工业级视觉系统：Outfit+Noto Serif字体，#007AFF品牌色，2x高清渲染',
      '8阶段SOP流程：从选题诊断到可视化渲染的标准化生产流水线',
      '文件驱动数据流：Skill间通过Obsidian知识库衔接，无需数据库',
    ],
    capabilities: [
      {
        icon: '🧠',
        label: 'Claude Code Skill 机制',
        labelEn: 'Claude Code Skills Framework',
        proof: '创新性使用Claude Code的Skill机制，将三个技能串联成有状态的工作流，支持配置读取、阶段执行、物理拦截，本质是小型的Agent Framework。'
      },
      {
        icon: '🎯',
        label: '主动追问与质量门禁',
        labelEn: 'Active Q&A & Quality Gates',
        proof: '在voice2note Skill中加入主动追问环节，AI发现模糊点会停下来询问用户，确保准确性，将纯AI整理的准确率提升30%。'
      },
      {
        icon: '📊',
        label: '七维爆款分析模型',
        labelEn: '7D Winning Content Analysis',
        proof: '构建七维分析模型：标题结构、情绪曲线、关键词密度、互动模式、语言风格、视觉节奏、转化要素，提取可复制的成功模式。'
      },
      {
        icon: '🔄',
        label: '8阶段标准化流程',
        labelEn: '8-Phase SOP Pipeline',
        proof: '实现完整的8阶段创作流程：选题诊断→调研→对齐策略→策划蓝图→脚本定稿→可视化渲染→归档溯源→经验沉淀。'
      },
      {
        icon: '🎨',
        label: '品牌视觉规范系统',
        labelEn: 'Brand Visual System',
        proof: '建立完整的品牌视觉规范：Outfit 900标题字体、Noto Serif SC正文字体、#007AFF主色调、750x1000px画布比例、2x高清渲染。'
      },
      {
        icon: '⚙️',
        label: '配置驱动架构',
        labelEn: 'Configuration-Driven Architecture',
        proof: '采用config.json动态路径映射机制，彻底告别硬编码。支持跨设备无缝迁移，体现工业级软件的设计思维。'
      }
    ],
    github: '#',
    demo: '#',
  },
];
