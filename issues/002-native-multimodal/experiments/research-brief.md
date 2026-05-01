# 研究简报 · 原生多模态大模型到底是什么

> 调查日期：2026-04-26
> 来源：3 个并行 web 调查 agent（概念原理 / 闭源旗舰 / 开源 GitHub）
> 所有事实带可点击来源，**写文章时直接复用脚注**

---

## 一、"原生多模态"这个词的来源

- **大规模流行始于 Google Gemini 1.0**（2023-12-06 发布）。Google 官博明确写到 Gemini 是 "built from the ground up to be multimodal"、"pre-trained from the start on different modalities"（来源：[Introducing Gemini](https://blog.google/technology/ai/google-gemini-ai/)）
- Gemini 1.0 技术报告（[arXiv:2312.11805](https://arxiv.org/abs/2312.11805)）写到模型 "trained jointly across image, audio, video, and text data"，图像 patch、视频帧、音频图谱与文本 token 投到统一潜在空间
- **OpenAI 在 2024-05-13 发布 GPT-4o 时正式接过这个词**："trained end-to-end across text, vision, and audio ... all inputs and outputs are processed by the same neural network"（来源：[Hello GPT-4o](https://openai.com/index/hello-gpt-4o/)）
- 中文圈"原生多模态"翻译随 Gemini 1.0 同步出现（2023-12），机器之心、智源社区、品玩等几乎第一时间用此译法（来源：[谷歌最强模型 Gemini 来了！真正多模态 · 品玩](https://www.pingwest.com/a/290792)、[Gemini 解读：原生多模态 · 智源社区](https://hub.baai.ac.cn/view/33344)）

---

## 二、技术分水岭：原生 vs 嫁接式

### 嫁接式（bolted-on / late fusion）

vision encoder + projector/adapter + 冻结 LLM，模态在中后期融合。代表：

| 模型 | 年代 | 嫁接方式 | 来源 |
|---|---|---|---|
| **CLIP** | 2021 | 对比学习对齐图文嵌入 | [arXiv:2103.00020](https://arxiv.org/abs/2103.00020) |
| **Flamingo** | 2022 | 冻结 vision + LM，cross-attention 桥接 | [arXiv:2204.14198](https://arxiv.org/abs/2204.14198) |
| **BLIP-2** | 2023 | Q-Former 适配器连冻结的图像编码器与冻结 LLM | — |
| **LLaVA** | 2023 | CLIP ViT-L/14 + 线性投影 + Vicuna，仅训练 projector | [Visual Instruction Tuning](https://openreview.net/forum?id=w0H2xGHlkw) |

### 原生（native / early fusion）

所有模态从输入就 token 化，进同一个 transformer 联合训练。**Chameleon 论文给出最清晰的技术定义**："projects all modalities into a shared representational space from the start"（来源：[Chameleon paper, arXiv:2405.09818](https://arxiv.org/abs/2405.09818)）

> early/late fusion 这个术语本身来自传统多模态学习综述（[Multimodal Alignment and Fusion Survey](https://arxiv.org/html/2411.17040v1)），不是大模型时代发明的。

---

## 三、闭源旗舰：谁真原生、谁不是

> 标注规则：**[官方声称]** = 厂商在官方 blog/技术报告中明确用了 "native/natively multimodal" 或同义表述；**[外界推测]** = 媒体或社区描述，厂商未自称。

### OpenAI GPT-4o 系列

- **[官方声称]** "We trained a single new model end-to-end across text, vision, and audio, meaning that all inputs and outputs are processed by the same neural network."（来源：[Hello GPT-4o](https://openai.com/index/hello-gpt-4o/)）
- **端到端证据**：旧 Voice Mode 是 ASR→GPT-3.5/4→TTS 三模型 pipeline；GPT-4o 单模型，音频响应最低 232ms、平均 320ms（接近人类对话延迟）
- **后续**：gpt-realtime 2025-08-28 GA，speech-to-speech，Big Bench Audio 82.8%（前代 65.6%）（来源：[Introducing gpt-realtime](https://openai.com/index/introducing-gpt-realtime/)）
- **Sora 关系**：Sora 是独立的 diffusion transformer (DiT)，与 GPT-4o 同属 transformer 路线但**不是同一模型**（来源：[Video generation models as world simulators](https://openai.com/index/video-generation-models-as-world-simulators/)）

### Google Gemini 系列

| 版本 | 关键事实 | 来源 |
|---|---|---|
| Gemini 1.0 | **[官方声称]** "natively multimodal, pre-trained from the start on different modalities" | [Introducing Gemini](https://blog.google/technology/ai/google-gemini-ai/) |
| Gemini 1.5 | **[官方声称]** 原生处理音视频文本交错输入，最长 10M token | [Gemini 1.5 Technical Report (arXiv:2403.05530)](https://arxiv.org/abs/2403.05530) |
| Gemini 2.0 Flash | 新增**原生图像输出 + 可控 TTS 音频输出**，单次 API 可返回 text+image+audio 混合 | [Google introduces Gemini 2.0](https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/) |

### Anthropic Claude

- **Anthropic 官方从未声称 "native multimodal"**。官方文档措辞为 "vision"、"image input"、"multimodal understanding"（来源：[Claude Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)）
- **Claude 3 / 3.5 / 4 / 4.7 系列均为 vision-input-only + text-output**，无音频、无图像/视频生成（来源：[Claude 3 Model Card PDF](https://www-cdn.anthropic.com/de8ba9b01c9ab7cbabf5c33b80b7bbc618857627/Model_Card_Claude_3.pdf)、[Introducing Claude Opus 4.7](https://www.anthropic.com/news/claude-opus-4-7)）
- 严格意义上是 "**vision-augmented LLM**"，**不是 any-to-any 原生多模态**

### 其他闭源

| 模型 | 定性 | 依据 |
|---|---|---|
| **豆包 Doubao 1.8 / Seedance 1.5 Pro** | **[官方声称]** "原生音视频联合生成架构" | [ByteDance Volcano Engine 报道](https://en.tmtpost.com/post/7645516) |
| **Kimi K2.5** | **[官方声称]** "原生多模态架构"，自研 400M MoonViT 编码器，文本/代码/图像/视频统一为 token 联合预训练 | [Kimi K2.5 技术解读](https://yuanchaofa.com/post/kimi-k2-5-reading-notes)、[Kimi K2.5 论文解读](https://github.com/datawhalechina/self-llm/blob/master/models/Kimi-K2.5/01-Kimi-K2.5-%E8%AE%BA%E6%96%87%E8%A7%A3%E8%AF%BB.md) |
| **智谱 GLM-4.5V / 4.6V** | **嫁接式**：ViT 编码器 (AIMv2-Huge) + MLP 投影 + LLM 解码器的传统 VLM pipeline | [Z.ai GLM-4.6V](https://venturebeat.com/technology/z-ai-debuts-open-source-glm-4-6v-a-native-tool-calling-vision-model-for)、[GLM-4.5V/4.1V arXiv](https://arxiv.org/abs/2507.01006) |
| **DeepSeek-V3** | **不是原生多模态**：V3 本体是纯文本 MoE (671B/37B 激活)，多模态走独立 DeepSeek-VL / Janus 系列 | [DeepSeek-V3 Tech Report (arXiv:2412.19437)](https://arxiv.org/abs/2412.19437)、[DeepSeek-VL GitHub](https://github.com/deepseek-ai/DeepSeek-VL) |

> ⚠️ **Joy 注意**：调查未找到 "DeepSeek V4-Pro" 的官方原始资料（可能是中文社区昵称或漏了来源链接）。你 001 篇引用了 V4-Pro，写 002 时建议回 001 校对原始来源是否准确，避免被"V4-Pro 是不是原生多模态"这类追问 cornered。

---

## 四、开源 GitHub 全景（按团队归类）

> 数据采集：2026-04-26，stars 用 `gh api` 实时取。

| 模型 | 团队 | 发布 | GitHub | Stars | 论文 | 真原生？ | 备注 |
|---|---|---|---|---|---|---|---|
| **Chameleon 7B/30B** | Meta FAIR | 2024-05 论文 / 2024-06 代码 | [facebookresearch/chameleon](https://github.com/facebookresearch/chameleon) | 2,094 | [arXiv:2405.09818](https://arxiv.org/abs/2405.09818) | ✅ early-fusion | 仓库已 archived，最后 push 2024-07-29，权重阉割了 image generation head |
| **Llama 4 Scout/Maverick** | Meta | 2025-04-05 | [meta-llama/llama-models](https://github.com/meta-llama/llama-models) | — | [Meta blog](https://ai.meta.com/blog/llama-4-multimodal-intelligence/) | ✅ 官宣 native + 联合预训练 | "open-weight" 非开源；MoE；Behemoth 未发 |
| **Janus / Janus-Pro** | DeepSeek-AI | 2024-10 / 2025-01 | [deepseek-ai/Janus](https://github.com/deepseek-ai/Janus) | 17,700 | [Janus arXiv:2410.13848](https://arxiv.org/abs/2410.13848) / [Janus-Pro arXiv:2501.17811](https://arxiv.org/abs/2501.17811) | ✅ 解耦视觉编码 + 单一 Transformer | 与 DeepSeek-VL（嫁接式）有本质区别 |
| **Qwen2.5-Omni-7B** | 阿里 Qwen | 2025-03-26 | [QwenLM/Qwen2.5-Omni](https://github.com/QwenLM/Qwen2.5-Omni) | 3,981 | [arXiv:2503.20215](https://arxiv.org/abs/2503.20215) | ✅ end-to-end，Thinker-Talker + TMRoPE | 实时语音生成 |
| **Qwen2.5-VL** | 阿里 Qwen | 2025-01 | [QwenLM/Qwen3-VL](https://github.com/QwenLM/Qwen3-VL)（已合并）| 19,051 | [arXiv:2502.13923](https://arxiv.org/abs/2502.13923) | ❌ 视觉编码器+LLM 嫁接 | 跟 Omni 是两条线，**不要混** |
| **MiniCPM-o 2.6 (8B)** | OpenBMB / 面壁 | 2025-01 | [OpenBMB/MiniCPM-o](https://github.com/OpenBMB/MiniCPM-o) | 24,402 | [arXiv:2408.01800](https://arxiv.org/abs/2408.01800) | ⚠️ end-to-end 但**模块化组装** (SigLip + Whisper + ChatTTS + Qwen2.5) | "原生编排"非"原生融合"，写时要小心区分 |
| **Show-o** | NUS Show Lab | 2024-08-22 | [showlab/Show-o](https://github.com/showlab/Show-o) | 1,918 | [arXiv:2408.12528](https://arxiv.org/abs/2408.12528) | ✅ 单 Transformer，AR + 离散扩散混合 | ICLR & NeurIPS 2025 |
| **Emu3** | 智源 BAAI | 2024-09-27 | [baaivision/Emu3](https://github.com/baaivision/Emu3) | 2,399 | [arXiv:2409.18869](https://arxiv.org/abs/2409.18869) | ✅ 纯 next-token，文/图/视频统一离散 token | 不依赖 CLIP/扩散，"Next-Token Prediction is All You Need" |
| **AnyGPT** | OpenMOSS（复旦）| 2024-02 | [OpenMOSS/AnyGPT](https://github.com/OpenMOSS/AnyGPT) | 879 | [arXiv:2402.12226](https://arxiv.org/abs/2402.12226) | ✅ 4 模态全部离散 token 化 | 最近 push 2024-08，活跃度低 |
| **Fuyu-8B** | Adept | 2023-10 | 无 GitHub，权重在 [HF: adept/fuyu-8b](https://huggingface.co/adept/fuyu-8b) | — | [Adept blog](https://www.adept.ai/blog/fuyu-8b/) | ✅ **无 vision encoder**，patch 直接线性投影进 LLM | Adept 已被 Amazon 吸收，停滞 |
| **Mini-Omni / Omni2** | gpt-omni（清华等）| 2024-08 / 2024-10 | [gpt-omni/mini-omni](https://github.com/gpt-omni/mini-omni) / [mini-omni2](https://github.com/gpt-omni/mini-omni2) | 3,541 / 1,884 | [arXiv:2408.16725](https://arxiv.org/abs/2408.16725) / [arXiv:2410.11190](https://arxiv.org/abs/2410.11190) | ✅ 端到端语音对话 ("边听边想边说") | Omni2 加视觉，对标 GPT-4o |

---

## 五、关键技术点

### 统一 tokenize

- **图像**：常用 VQ-VAE / 残差量化（RVQ）
- **音频**：借鉴 Google **SoundStream** 用 RVQ 离散化
- **Chameleon 实操**：把 512×512 图像离散化成 token 序列与文本拼接
- 综述：[Discrete Tokenization for Multimodal LLMs Survey (2025)](https://arxiv.org/pdf/2507.22920)

### 训练数据混合（Chameleon 实例）

- 一阶段（80% 训练）：2.9T 纯文本 + 1.5T 图文配对 token + 0.4T 交错图文 token
- 二阶段：把一阶段数据降权 50%，引入高质数据
- 来源：[Chameleon paper](https://arxiv.org/html/2405.09818v1)

### 训练不稳定 & QK-Norm（最有戏的技术八卦）

- 文本 token 熵低、图像 token 熵高，混合后 softmax 不稳定
- Chameleon 用 **QK-Norm**（对 Q、K 向量做 LayerNorm）控制 attention 输入范数
- 7B 还需 dropout + z-loss
- 34B 需要把 norm 移到 attention/FFN 之前（pre-norm）
- 这是**写文章时一段非常香的技术细节** —— 说明"原生多模态"不是一句口号，是真在解决工程难题
- 来源：[Chameleon paper §2.4](https://arxiv.org/html/2405.09818v1)

### any-to-any 生成 vs 仅文本输出

- 纯理解类（Flamingo / LLaVA / BLIP-2）：只输出文字
- any-to-any 类（Chameleon、Unified-IO 2、CoDi-2、GPT-4o image generation、Gemini 2.0、Qwen2.5-Omni）：能生成图/音/文
- 来源：[Awesome Unified Multimodal Models](https://github.com/showlab/Awesome-Unified-Multimodal-Models)

---

## 六、核心争议："是不是真原生" 无法被验证

- **Nathan Lambert（Interconnects 主笔，西方 AI 圈最重要的独立分析师之一）**直接点出：是否原生多模态在 scaling 上有根本优势"仍是最大开放问题"，承认这需要"对长期轨迹的信仰"而非实证（来源：[GPT-4o's images and lessons from native input-output multimodality](https://www.interconnects.ai/p/gpt-4os-images-and-lessons-from-native)）
- **Chameleon 是公开权重唯一全开源的"真原生"参照**，但 Meta 出于安全把图像生成权重阉割掉了
- **GPT-4V 普遍归为非原生**（在 GPT-4 上后接视觉），GPT-4o / Gemini 因闭源**无法验证训练流程**
- **"什么程度才算原生"目前没有学术共识**：
  - 有人定义为联合预训练
  - 有人定义为统一 token 空间
  - 有人要求 any-to-any 输出

---

## 七、写文章时的 Top 5 必读链接

1. [Chameleon: Mixed-Modal Early-Fusion Foundation Models (Meta FAIR, 2024)](https://arxiv.org/abs/2405.09818) — 唯一公开的"真原生"训练细节，QK-Norm/数据比例/稳定性全披露
2. [Gemini 1.0 Technical Report (arXiv:2312.11805)](https://arxiv.org/abs/2312.11805) — "原生多模态"营销词的源头文档
3. [Hello GPT-4o (OpenAI 官方)](https://openai.com/index/hello-gpt-4o/) — OpenAI 对"single neural network end-to-end"的官方表述
4. [Nathan Lambert: lessons from native input-output multimodality](https://www.interconnects.ai/p/gpt-4os-images-and-lessons-from-native) — 西方 AI 圈最有影响力的批判性解读
5. [Discrete Tokenization for Multimodal LLMs Survey (2025)](https://arxiv.org/pdf/2507.22920) — VQ-VAE / RVQ / 音视频 token 化的系统综述

---

## 八、来源汇总（统一脚注表）

> 写文章时把这一节当 reference 库用，每条事实标注 `^[N]`，文末列脚注。

**官方一手**

1. [Introducing Gemini · Google blog (2023-12-06)](https://blog.google/technology/ai/google-gemini-ai/)
2. [Gemini 1.0 Technical Report · arXiv:2312.11805](https://arxiv.org/abs/2312.11805)
3. [Gemini 1.5 Technical Report · arXiv:2403.05530](https://arxiv.org/abs/2403.05530)
4. [Google introduces Gemini 2.0 · Google blog](https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/)
5. [Hello GPT-4o · OpenAI blog (2024-05-13)](https://openai.com/index/hello-gpt-4o/)
6. [Introducing gpt-realtime · OpenAI](https://openai.com/index/introducing-gpt-realtime/)
7. [Video generation models as world simulators · OpenAI (Sora)](https://openai.com/index/video-generation-models-as-world-simulators/)
8. [Claude Models Overview · Anthropic platform docs](https://platform.claude.com/docs/en/about-claude/models/overview)
9. [Claude 3 Model Card (PDF)](https://www-cdn.anthropic.com/de8ba9b01c9ab7cbabf5c33b80b7bbc618857627/Model_Card_Claude_3.pdf)
10. [Introducing Claude Opus 4.7 · Anthropic](https://www.anthropic.com/news/claude-opus-4-7)
11. [Llama 4 multimodal intelligence · Meta AI blog](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)
12. [Adept Fuyu-8B blog](https://www.adept.ai/blog/fuyu-8b/)

**学术论文**

13. [CLIP · arXiv:2103.00020](https://arxiv.org/abs/2103.00020)
14. [Flamingo · arXiv:2204.14198](https://arxiv.org/abs/2204.14198)
15. [LLaVA / Visual Instruction Tuning · OpenReview](https://openreview.net/forum?id=w0H2xGHlkw)
16. [Chameleon · arXiv:2405.09818](https://arxiv.org/abs/2405.09818)
17. [Janus · arXiv:2410.13848](https://arxiv.org/abs/2410.13848)
18. [Janus-Pro · arXiv:2501.17811](https://arxiv.org/abs/2501.17811)
19. [Qwen2.5-Omni · arXiv:2503.20215](https://arxiv.org/abs/2503.20215)
20. [Qwen2.5-VL · arXiv:2502.13923](https://arxiv.org/abs/2502.13923)
21. [MiniCPM-V · arXiv:2408.01800](https://arxiv.org/abs/2408.01800)
22. [Show-o · arXiv:2408.12528](https://arxiv.org/abs/2408.12528)
23. [Emu3 · arXiv:2409.18869](https://arxiv.org/abs/2409.18869)
24. [AnyGPT · arXiv:2402.12226](https://arxiv.org/abs/2402.12226)
25. [Mini-Omni · arXiv:2408.16725](https://arxiv.org/abs/2408.16725)
26. [Mini-Omni2 · arXiv:2410.11190](https://arxiv.org/abs/2410.11190)
27. [GLM-4.5V/4.1V-Thinking · arXiv:2507.01006](https://arxiv.org/abs/2507.01006)
28. [DeepSeek-V3 Technical Report · arXiv:2412.19437](https://arxiv.org/abs/2412.19437)
29. [Multimodal Alignment and Fusion Survey · arXiv:2411.17040](https://arxiv.org/html/2411.17040v1)
30. [Discrete Tokenization for Multimodal LLMs Survey · arXiv:2507.22920](https://arxiv.org/pdf/2507.22920)

**GitHub 仓库**

31. [facebookresearch/chameleon](https://github.com/facebookresearch/chameleon)
32. [meta-llama/llama-models](https://github.com/meta-llama/llama-models)
33. [deepseek-ai/Janus](https://github.com/deepseek-ai/Janus)
34. [deepseek-ai/DeepSeek-VL](https://github.com/deepseek-ai/DeepSeek-VL)
35. [QwenLM/Qwen2.5-Omni](https://github.com/QwenLM/Qwen2.5-Omni)
36. [QwenLM/Qwen3-VL](https://github.com/QwenLM/Qwen3-VL)
37. [OpenBMB/MiniCPM-o](https://github.com/OpenBMB/MiniCPM-o)
38. [showlab/Show-o](https://github.com/showlab/Show-o)
39. [baaivision/Emu3](https://github.com/baaivision/Emu3)
40. [OpenMOSS/AnyGPT](https://github.com/OpenMOSS/AnyGPT)
41. [gpt-omni/mini-omni](https://github.com/gpt-omni/mini-omni)
42. [gpt-omni/mini-omni2](https://github.com/gpt-omni/mini-omni2)
43. [HuggingFace: adept/fuyu-8b](https://huggingface.co/adept/fuyu-8b)
44. [Awesome Unified Multimodal Models](https://github.com/showlab/Awesome-Unified-Multimodal-Models)

**第三方分析**

45. [Nathan Lambert · GPT-4o's images and lessons from native input-output multimodality](https://www.interconnects.ai/p/gpt-4os-images-and-lessons-from-native)
46. [谷歌最强模型 Gemini 来了！真正多模态 · 品玩](https://www.pingwest.com/a/290792)
47. [Gemini 解读：原生多模态 · 智源社区](https://hub.baai.ac.cn/view/33344)
48. [Z.ai GLM-4.6V · VentureBeat](https://venturebeat.com/technology/z-ai-debuts-open-source-glm-4-6v-a-native-tool-calling-vision-model-for)
49. [Kimi K2.5 技术解读 · chaofa](https://yuanchaofa.com/post/kimi-k2-5-reading-notes)
50. [Kimi K2.5 论文解读 · datawhalechina](https://github.com/datawhalechina/self-llm/blob/master/models/Kimi-K2.5/01-Kimi-K2.5-%E8%AE%BA%E6%96%87%E8%A7%A3%E8%AF%BB.md)
51. [豆包多模态 · TMTPost](https://en.tmtpost.com/post/7645516)
52. [Kimi K2.5 论文](https://arxiv.org/abs/2410.13848)
