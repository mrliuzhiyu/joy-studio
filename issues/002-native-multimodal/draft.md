# 原生多模态大模型到底是什么

2022 年 11 月 30 日，ChatGPT 上线，第一周用户破百万，两个月破一亿。

但它有一个不太被讨论的限制：是个纯文字模型，无法直接处理图像和音频。

接下来三年整个行业在解的最大问题，就是怎么让这个 AI 也能处理图像、音频、视频。

解题过程一共走了三代。前两代不够好，到第三代才出现今天所有 AI 厂商发布会都在抢的那个词——原生多模态。

原生多模态不是学术术语，是 Google 在 2023 年 12 月发布 Gemini 1.0 时造出来的营销词。在那之前，学界讨论的是 early fusion / late fusion 这些更技术化的概念。后来 OpenAI 用 GPT-4o 把它接过去，全行业开始抢用，到今天已经被用得快磨损了。

但抛开营销，它确实对应一类跟以往不同的模型架构。这篇文章讲清楚这件事——它从哪来、谁真做到、谁假装、为什么难。

---

## 01 LLM 一开始只能处理文字

LLM 全称 Large Language Model。它从训练第一天起，见过的所有数据都是离散的文字 token，工作方式是吃一串 token、预测下一个 token。这是 2017 年 Transformer 论文（[Attention Is All You Need, arXiv:1706.03762](https://arxiv.org/abs/1706.03762)）打开的路。从 GPT-3 到 GPT-3.5 再到 GPT-4，每一代都是把读更多文字、预测得更准这条路压到极限。

这个范式在文字任务上太成功了。成功到一个程度——大家都差点忘了它本质上只能处理文字。

我自己用了 ChatGPT 一年多才意识到这件事的影响有多大。客服系统接不进语音通话，用户的产品反馈截图还是要我自己复述一遍，会议录音想让 AI 总结得先转成文字。这些不是边角料场景，是大量真实需求。一个只能处理文字的 AI，能做的事远比看上去窄。

更关键的是这不是工程层面能解决的问题。LLM 范式从底层就只接受 token 序列。它的输入端连接收图像或音频的接口都没有。这是 LLM 范式的天花板，不是某个模型实现的小毛病。

所以从 ChatGPT 火的那天起，整个行业就在解同一个问题：怎么让 LLM 处理文字以外的模态。

后来三年这件事走了三代解法，每一代对应一种思路。第一代最朴素，但走不远。

---

## 02 第一代：图像识别 + 文字描述 + LLM

最早的解法是在 LLM 前面接一个图像识别模型，把图片描述成一段文字，再把文字交给 LLM。

这种结构在 ChatGPT 出来之前就有。2022 年 Salesforce 发布的 BLIP（image captioning + visual question answering）是这个套路的典型——先给图生成一段描述，再用这段描述回答用户问题。

为什么这条路注定不行。

一张图里有几百万个像素，包含人物表情、空间位置、文字内容、光线氛围、构图角度、人物之间的眼神交互、物体细节、背景信息。压缩成三十字的描述，绝大部分信息都在这一步被丢掉。LLM 接到的不是图像，是一段干瘪的描述。模型回答得再好，也只是基于这段描述在推理，跟图本身关系不大。

我读到过一个真实的 demo 翻车例子。某个早期图文系统给一张照片生成的描述是 a man in a suit holding a phone。用户问：照片里的人在干什么？模型一本正经回答：他在打电话。其实照片里那位西装男士正举起手机自拍，旁边还有三个人。模型从来没见过照片，只见过那段描述，它说的话听上去合理但跟现实没关系。

错误是结构性的，不是模型参数堆得不够大就能解决的。LLM 永远卡在那段描述本身的精度上。描述里没写的细节，无论参数多大它都补不回来。

这一代在 2022 到 2023 年那批早期图文模型上有过尝试，效果都很尴尬：能识别图里有什么物体，涉及空间关系、复杂文字、构图判断、跨物体的语义关联，几乎全错。

行业里没有人正式宣布放弃这条路，因为也没人正式拥抱过它。它只是悄悄被下一代解法取代。下一代的核心想法是：拿掉文字描述这个中间层。

![四代多模态架构演进示意图（占位 · 见 assets/diagram-1-evolution.html）](assets/diagram-1-evolution.html)

---

## 03 第二代：视觉编码器接入 LLM

第二代的思路是给 LLM 配一个视觉编码器。编码器把图像转成一组高维数学向量，通过一个连接器送进 LLM 的隐藏层。视觉信息不再被压缩成文字，而是以向量形式直接进入。

这一代真正打开局面的是 OpenAI 在 2021 年发布的 CLIP（[Learning Transferable Visual Models From Natural Language Supervision, arXiv:2103.00020](https://arxiv.org/abs/2103.00020)）。

CLIP 的核心方法是用对比学习把图像和文字对齐到同一个向量空间。具体做法是给它 4 亿对图文配对（一张图 + 它的文字描述），训练目标是让正确配对的图文在向量空间里距离近，错配的距离远。训练完成后，一张狗的照片和狗这个词，在 CLIP 的数学空间里距离很近。CLIP 通过这种方式学会了一种跨模态的图像表征。

CLIP 出来后整整两年，开源界几乎所有视觉语言模型都建立在它之上。LLaVA（[Visual Instruction Tuning, OpenReview](https://openreview.net/forum?id=w0H2xGHlkw)）用 CLIP ViT-L/14 加一个简单的线性投影层，再接 Vicuna 这个开源 LLM，仅训练投影层就做出了相当不错的视觉对话能力。LLaVA 论文里只用了 595K 条 instruction 样本，就把模型做到了当时 GPT-4V 大约 70% 的水平。这个数字在开源圈是个分水岭——它说明 adapter 路线在数据量很小的情况下也能走得相当远。

后续路线还有 BLIP-2（用 Q-Former 适配器连接冻结的图像编码器和冻结的 LLM，把训练成本压到很低）和 DeepMind 的 Flamingo（[arXiv:2204.14198](https://arxiv.org/abs/2204.14198)，用 cross-attention 机制让 LLM 在生成每个 token 时主动查询视觉信息）。今天 GitHub 上能下载到的大部分开源 VLM，本质都是这个架构家族的变体。

这条路保留了远多于文字描述的视觉信息，但有一个根本问题：视觉编码器和 LLM 是分开训练的。

视觉模块在它自己的图像数据上学，LLM 在它自己的文本数据上学。两个模块拼到一起后协作不充分——视觉编码器提取出的细节，LLM 不一定用得上；LLM 想做空间或位置层面的推理，视觉编码器给的信息又不够细。表现就是：识别图里的物体可以做得不错，但涉及位置关系、复杂文字、构图判断这类任务上，模型仍然容易出错。

后来这条路又做了一步改进：把视觉编码器和 LLM 放在一起继续训练，让两个模块逐步对齐。这一步叫联合微调或视觉指令微调，LLaVA-1.5 是其中代表。配合好了很多，但绕不过去一个事实——文字依然是绝对主角。所有推理都通过文字层面的表征完成，图像信息只是输入端的一个补充。

具体什么意思？你给 GPT-4V 看一张复杂图，它能告诉你图里有什么、能描述构图、能识别 OCR 出来的文字。但你让它做更深的视觉推理——比如根据图里几个人的眼神判断他们的社交关系、根据建筑细节推断照片拍摄年代——它内部的处理路径仍然是先把图转成文本表征再推理。视觉是个补充输入，推理还是文本层面的。

今天大量主流的多模态产品仍然停在这一代。包括阿里的 Qwen2.5-VL（[arXiv:2502.13923](https://arxiv.org/abs/2502.13923)）、智谱的 GLM-4.5V 和 GLM-4.6V（[arXiv:2507.01006](https://arxiv.org/abs/2507.01006)）、面壁智能的 MiniCPM-V（[arXiv:2408.01800](https://arxiv.org/abs/2408.01800)）。这不是说它们做得不好——很多任务上它们就是好用。是说架构属于这一代。

这里有一个反例值得单独讲清楚：Anthropic 的 Claude。

Claude 4.7 仍然只支持图像输入加文字输出，没有音频、没有图像生成、没有视频（[Claude Models 总览](https://platform.claude.com/docs/en/about-claude/models/overview)、[Introducing Claude Opus 4.7](https://www.anthropic.com/news/claude-opus-4-7)）。架构上属于这一代。但 Anthropic 的官方文档从来没用过 native multimodal 这个说法，措辞一直是 vision、image input、multimodal understanding。

所有竞品都在抢一个营销词的时候，Claude 选择不蹭。这个克制大概率不是偶然——Anthropic 是从 OpenAI 离开的安全派别建立的，整个公司的调性是强调可控性、强调 RLHF 的可解释性、强调 constitutional AI。这种基因决定了他们对扩展模型能力的态度比同行保守。每增加一个新模态就是一个新的失败模式、一个新的越狱入口、一个新的不可控来源。Anthropic 选择在还没想清楚的时候不铺开。

从商业角度看，这个判断也合理。Claude 主打的是企业市场，企业客户更需要可控、稳定、推理能力强的 AI 助手，不是音频生成这类消费级花活。Claude 的强项是推理，推理任务上原生多模态没有显著优势。能做更激进的事不代表必须做。在所有人都抢一个词的氛围里，老老实实说自己只是 vision-augmented 反而成了行业里最诚实的描述。

我对这个判断的态度是：长期会被验证为对的。如果原生多模态在推理任务上没有压倒性优势，Anthropic 就是节省了大量资源做了对的取舍。

下一代解法把上面所有的局限一起重新处理了一遍。

---

## 04 第三代真原生：所有模态在 token 层统一

第三代的思路彻底改变。

前两代的本质都是给 LLM 加装一个独立模块：图像识别是独立模块、视觉编码器是独立模块、连接器是独立模块。LLM 本身仍然是文字模型，独立模块帮它把图像转成它能消化的形式。无论独立模块做得多好，LLM 的核心架构从来没接受过图像作为输入。

第三代的做法是：既然文字在 LLM 里是离散 token，那就把图像和音频也切成 token，让所有模态用同一种格式从输入第一层进同一个模型。不再有独立的视觉模块，模型从训练第一天起就同时看到所有模态的 token。

怎么把连续的图像变成离散 token？常用技术是 VQ-VAE 和它的改进版本残差量化（RVQ）。先把图像压缩成低维的连续向量，再把这些向量量化到一个固定的码本里。这个码本是预先定义的，比如 8192 个或 16384 个条目，每个条目是一个固定的向量。每张图像被切成若干 patch，每个 patch 找到码本里跟它最接近的那个条目，整张图就变成一串码本编号。这串编号就是 LLM 接收的 token 序列。

为什么必须离散化，不直接用连续 embedding？因为 LLM 的训练目标是预测下一个 token，需要一个有限的预测空间用 softmax 输出概率分布。连续 embedding 没有这种离散结构，没法跟 LLM 的训练范式对齐。这个工程约束决定了真原生路线的所有架构选择。

音频用类似的办法处理。Google 在 2021 年发布的音频压缩模型 SoundStream 是这个方向的代表，把音频波形量化成离散 token。今天主流的真原生模型基本都用这套思路。一份系统综述见 2025 年的这篇（[Discrete Tokenization for Multimodal LLMs Survey, arXiv:2507.22920](https://arxiv.org/pdf/2507.22920)）。

文字、图像、音频被映射到同一个数学空间。在这个空间里，红色这个词的向量和红色色块图像 token 的向量距离很近，狗这个词的向量和狗叫声音频 token 的向量距离也很近。模型不需要任何形式的翻译，可以直接在数学层面计算跨模态的关联。

![token 化原理：所有模态映射到同一个数学空间（占位 · 见 assets/diagram-2-token-space.html）](assets/diagram-2-token-space.html)

到这一代，LLM 的输入不再只有文字。模型可以直接在视觉、听觉对应的 token 序列上做推理，不需要先把它们转成文本表征。跨模态的推理才真正成为可能。

这是真原生跟前两代最根本的区别。前两代是给文字模型外接一个视觉模块，无论外接做得多好，模型推理依赖的还是文字层面的表征。这一代是把所有模态都变成模型能直接处理的输入形式，模型在视觉、听觉的层面就能直接做推理。

公开承认走这条路并且权重开源的代表是 Meta 的 Chameleon（[Chameleon: Mixed-Modal Early-Fusion Foundation Models, arXiv:2405.09818](https://arxiv.org/abs/2405.09818)、[GitHub](https://github.com/facebookresearch/chameleon)）。论文里把这种架构叫 mixed-modal early-fusion，明确写到所有模态从输入开始就投射到同一个表征空间。后续开源的真原生模型还有 DeepSeek 的 Janus 和 Janus-Pro（[Janus arXiv:2410.13848](https://arxiv.org/abs/2410.13848)、[Janus-Pro arXiv:2501.17811](https://arxiv.org/abs/2501.17811)、[GitHub](https://github.com/deepseek-ai/Janus)），阿里 Qwen 的 Qwen2.5-Omni（[arXiv:2503.20215](https://arxiv.org/abs/2503.20215)、[GitHub](https://github.com/QwenLM/Qwen2.5-Omni)），智源研究院的 Emu3（[arXiv:2409.18869](https://arxiv.org/abs/2409.18869)、[GitHub](https://github.com/baaivision/Emu3)）。

这四个是真原生在开源世界唯一的硬证据。你能下载权重、能读论文、能看到训练细节、能验证厂商说的是不是真的。下面的章节会详细讲第一个。

闭源里 OpenAI 的 GPT-4o 和 Google 的 Gemini 都声称走这条路。GPT-4o 官方博客原话：trained end-to-end across text, vision, and audio，all inputs and outputs are processed by the same neural network（[Hello GPT-4o](https://openai.com/index/hello-gpt-4o/)）。Gemini 1.0 官方博客原话：built from the ground up to be multimodal（[Introducing Gemini](https://blog.google/technology/ai/google-gemini-ai/)）。但他们的权重不公开、训练流程不透明，外界无法独立验证。

Interconnects 主笔 Nathan Lambert 在去年的一篇分析里直接写到：原生多模态在大模型 scaling 上是否真有根本优势，仍然是一个最大的开放问题（[GPT-4o's images and lessons from native input-output multimodality](https://www.interconnects.ai/p/gpt-4os-images-and-lessons-from-native)）。Nathan 是西方 AI 圈最有影响力的独立分析师之一。他这句话的意思是：连这件事是不是值得做、连原生比嫁接式到底好多少，连学术界都没有定论。

对消费者意味着什么？意味着原生多模态在闭源世界里无法被独立验证。你买的不是真原生，是厂商关于真原生的承诺。GPT-4o 的演示视频很惊艳，但你没法证明它跟一个工程做得很好的嫁接式模型有本质区别。当一件事既无法被验证又被全行业反复声称的时候，它正在变成一种营销话术。

这就是为什么开源的真原生四件套（Chameleon / Janus-Pro / Qwen2.5-Omni / Emu3）格外重要——它们是这个领域唯一可以独立验证的参照基准。没有它们，所有"我们是真原生"的发布会声明都飘在云上，所有人只能选择相信厂商。

---

## 05 真原生的工程难度

把这件事真正做出来，工程难度远比概念上说的要大。

最有说服力的例子来自 Chameleon 论文的第 2.4 节。Meta 的 FAIR 团队在训练 7B 模型时，发现训练过程极度不稳定，损失函数会突然剧烈震荡，有时候直接发散。诊断了很久才搞清楚原因。

原因是文本 token 和图像 token 的统计特性差异极大。文本 token 之间区分度低、熵低，因为人类语言的每个词在向量空间里跟其他词的距离都不会太远。图像 token 之间区分度高、熵高，因为视觉信号本身就比文字噪声多。两种 token 混在同一个序列里训练时，注意力机制里的 softmax 计算会数值溢出——具体说就是 query 和 key 向量相乘的结果太大，超出浮点数表示范围，梯度炸掉。

解法是一个叫 QK-Norm 的小技巧：在算注意力之前，对 query 向量和 key 向量分别做一次 LayerNorm，把数值范围压回正常区间。Chameleon 7B 还需要额外加 dropout 和 z-loss 才能跑稳。到了 34B 规模，这些都不够，必须把所有 LayerNorm 从注意力之后移到注意力之前——这是对 Transformer 基础架构的小改动。

这一节在论文里只占两页，行文淡淡几行字。背后是 FAIR 团队几个月的训练失败、调代码、看 loss 曲线、推翻假设、重新尝试。把不同模态融合到同一个 token 空间里，看上去是数据格式问题，实际是数值稳定性问题。这种问题在前两代不会出现——前两代的视觉模块和 LLM 是分开训练的，各自的训练动态成熟可控。第三代把它们硬塞在一起，带来了大量从未见过的训练故障模式。

![MiniCPM-o 模块化拼接 vs Chameleon 真原生融合（占位 · 见 assets/diagram-3-architecture-compare.html）](assets/diagram-3-architecture-compare.html)

第二个例子是 MiniCPM-o。

这个模型在 GitHub 上有 2.4 万 stars（[OpenBMB/MiniCPM-o](https://github.com/OpenBMB/MiniCPM-o)），定位是端侧端到端全模态。乍看跟 Qwen2.5-Omni 在同一个赛道——都说自己端到端、都说自己处理全模态。

但严格看架构，它其实是四个模型组装：SigLip 负责视觉编码（400M 参数），Whisper 负责音频输入（300M），ChatTTS 负责语音输出（200M），Qwen2.5-7B 是文本主干。这四个模型分别由不同团队、用不同数据预训练好，再串成一条 pipeline。这种结构可以叫端到端编排，但跟 Chameleon、Emu3、Janus-Pro 那种 token 级别统一的真原生融合，本质上不是同一件事。

我提这个例子不是说 MiniCPM-o 不好。从端侧用户体验角度看，组装路线反而是聪明的——四个模块各自参数小、可以独立优化、容易在手机或 PC 上部署、坏了哪一块换一个就行。学术上它不是真原生，产品上它跑得很顺。这两个判断不冲突。

但它说明端到端这三个字现在已经被营销过度。看到一个项目说自己端到端全模态，先别激动，先问一句它的 token 是不是从输入第一层就在同一个空间里。

第三个值得记住的时间点：Meta 在 2025 年 4 月 5 日发布 Llama 4 Scout 和 Maverick 时，官方原话是 first natively multimodal Llama（[Llama 4 multimodal intelligence](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)）。

这句话的弦外之音很有意思。意思是此前所有版本的 Llama 都不算。从 2023 年的 Llama 1 到 2024 年的 Llama 3.2，包括所有第三方基于 Llama 做的多模态变体，都是嫁接式。Meta 自己用了三年才把这件事做出来。

这个三年是怎么算的。Chameleon 论文是 2024 年 5 月发布，意味着 Meta FAIR 内部的早期探索更早，可能是 2023 年。从 Chameleon 到 Llama 4 又是接近一年。Meta 这样的公司——有顶尖团队、几乎无限的算力、公开承认走这条路的内部探索——把真原生从概念做到旗舰模型，仍然花了大约三年。

那当一家公司告诉你"我们三个月前发布了一个真原生多模态模型"的时候，应该问什么？至少应该问：训练数据混合比例是多少？训练崩了多少次？怎么解决数值不稳定的？是不是把 LayerNorm 从 post-norm 改到 pre-norm 了？

把这三个例子放一起，我的判断是：原生多模态的工程门槛被严重低估了。它在发布会上是一个箭头加一个 token 化模块就能讲清楚的事，在工程实践里是几个月的训练失败、几次架构重构、对 Transformer 内部组件的精细调整。这也是为什么真正做出真原生模型的团队，目前全球还是个位数。

---

## 06 现在主流多模态模型怎么分类

把目前主流的多模态模型按这个标准分类，大致是三层。

**第一层，自称原生且公开承认走 token 级融合路线。** 代表：OpenAI GPT-4o（[Hello GPT-4o](https://openai.com/index/hello-gpt-4o/)）、Google Gemini 1.0 起的整个系列（[Introducing Gemini](https://blog.google/technology/ai/google-gemini-ai/)、[Gemini 1.5 技术报告](https://arxiv.org/abs/2403.05530)、[Gemini 2.0 公告](https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/)）、Meta Llama 4（[Llama 4 blog](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)）。这些是西方主流真原生阵营。可信度来自厂商技术力背书 + 长期演示一致性，但严格说仍然是承诺。

**第二层，国内厂商自称原生、外界无法独立验证。** 代表：字节豆包 Seedance（[TMTPost 报道](https://en.tmtpost.com/post/7645516)）、月之暗面 Kimi K2.5（[Kimi K2.5 论文解读](https://github.com/datawhalechina/self-llm/blob/master/models/Kimi-K2.5/01-Kimi-K2.5-%E8%AE%BA%E6%96%87%E8%A7%A3%E8%AF%BB.md)）。这些模型从厂商描述看都属于真原生，但权重不开源、训练细节不公开。国内厂商的发布会修辞通常更激进——你会看到原生多模态、全模态、端到端这些词高频出现，但当你想验证的时候，能拿到的资料比西方厂商更少。这跟资本市场和"赶上 OpenAI"的焦虑有关。

**第三层，公开承认是嫁接式视觉语言模型。** 代表：阿里 Qwen2.5-VL、智谱 GLM-4.5V/4.6V、面壁 MiniCPM-V。这些都是好模型，只是不属于原生多模态那个定义。把它们叫多模态没问题，叫原生多模态就跟事实不符。

几个特殊位置值得单独说：

- **Anthropic Claude**：架构上属于嫁接式那一层，但官方从未声称自己是原生多模态。是行业里少见的、不蹭这个词的旗舰。我认为这是个长期会被验证为正确的判断——如果原生多模态在推理任务上没有压倒性优势，Claude 这种克制就是节省了大量资源做了对的取舍。

- **DeepSeek**：DeepSeek-V3 本体（[DeepSeek-V3 技术报告](https://arxiv.org/abs/2412.19437)）是纯文本 MoE 模型，根本不在多模态赛道上。DeepSeek 把多模态拆出来由 Janus 系列单独承担。这是一个资源约束下的精明决策——DeepSeek 没有 OpenAI、Google 那么多算力，与其搞一个什么都做的全能模型，不如把文本和多模态分两条线各自做扎实。结果是 DeepSeek-V3 是当前最好的开源文本模型之一，Janus-Pro 是当前最好的开源真原生多模态模型之一。

- **真原生开源四件套**：Chameleon、Janus-Pro、Qwen2.5-Omni、Emu3。这是这个领域唯一能让你独立验证的参照基准。如果没有它们，所有闭源公司的"我们是真原生"声明，都没有可对照的参考物。

闭源真原生跟开源真原生的本质差别在于可验证性。闭源演示再惊艳，你买的还是承诺；开源演示也许没那么炫，但你能下载权重、能跑模型、能读论文。这两件事在投资逻辑上是一样的——前者要相信团队，后者可以独立尽调。

辨别口诀：自称原生不重要，要看两件事——图像和音频是否被切成 token、是否在预训练阶段就跟文字一起被喂进同一个模型。能给出这两个证据的，是真原生；只说自己端到端、自己全模态、自己原生但拿不出具体证据的，要打个问号。

我自己日常用模型的分工是这样的：文字推理（写代码、读论文、做长文档总结）用 Claude——它在这件事上是最好的选择之一，跟原不原生多模态没关系；需要看图、听声、生图的任务用 GPT-4o——这是目前真原生体验最完整的产品；偶尔在本地跑 Janus-Pro 做一些对比实验，验证开源真原生跟闭源旗舰的差距到底有多大（差距是有的，但比想象中小）。

下一年这个赛道我最关心两件事。第一，Llama 4 之后会不会有更多团队走真原生路线，把这件事从一个旗舰才能玩的事，变成开源中等规模团队也能做的事。如果会，开源真原生就会从四件套变成一片森林，整个生态会被撬动。第二，原生多模态在推理任务上到底比嫁接式有多大差别。如果差别不大，Anthropic 的克制选择就被验证；如果差别很大——具体说就是真原生模型在视觉推理、跨模态推理这些任务上系统性地超过最好的嫁接式模型——那 Claude 就要回头补课了。

下次再听到某个新模型自称原生多模态，你至少知道该问什么。

---

## 参考资料

**官方一手资料**

- [Introducing Gemini · Google blog (2023-12-06)](https://blog.google/technology/ai/google-gemini-ai/)
- [Gemini 1.0 Technical Report · arXiv:2312.11805](https://arxiv.org/abs/2312.11805)
- [Gemini 1.5 Technical Report · arXiv:2403.05530](https://arxiv.org/abs/2403.05530)
- [Google introduces Gemini 2.0 · Google blog](https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/)
- [Hello GPT-4o · OpenAI blog (2024-05-13)](https://openai.com/index/hello-gpt-4o/)
- [Introducing gpt-realtime · OpenAI](https://openai.com/index/introducing-gpt-realtime/)
- [Claude Models Overview · Anthropic 平台文档](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Introducing Claude Opus 4.7 · Anthropic](https://www.anthropic.com/news/claude-opus-4-7)
- [Llama 4 multimodal intelligence · Meta AI blog](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)

**学术论文**

- [Attention Is All You Need · arXiv:1706.03762](https://arxiv.org/abs/1706.03762)
- [CLIP · arXiv:2103.00020](https://arxiv.org/abs/2103.00020)
- [Flamingo · arXiv:2204.14198](https://arxiv.org/abs/2204.14198)
- [LLaVA / Visual Instruction Tuning · OpenReview](https://openreview.net/forum?id=w0H2xGHlkw)
- [Chameleon · arXiv:2405.09818](https://arxiv.org/abs/2405.09818)
- [Janus · arXiv:2410.13848](https://arxiv.org/abs/2410.13848)
- [Janus-Pro · arXiv:2501.17811](https://arxiv.org/abs/2501.17811)
- [Qwen2.5-Omni · arXiv:2503.20215](https://arxiv.org/abs/2503.20215)
- [Qwen2.5-VL · arXiv:2502.13923](https://arxiv.org/abs/2502.13923)
- [MiniCPM-V · arXiv:2408.01800](https://arxiv.org/abs/2408.01800)
- [Emu3 · arXiv:2409.18869](https://arxiv.org/abs/2409.18869)
- [GLM-4.5V/4.1V-Thinking · arXiv:2507.01006](https://arxiv.org/abs/2507.01006)
- [DeepSeek-V3 Technical Report · arXiv:2412.19437](https://arxiv.org/abs/2412.19437)
- [Discrete Tokenization for Multimodal LLMs Survey · arXiv:2507.22920](https://arxiv.org/pdf/2507.22920)

**GitHub 仓库**

- [facebookresearch/chameleon](https://github.com/facebookresearch/chameleon)
- [meta-llama/llama-models](https://github.com/meta-llama/llama-models)
- [deepseek-ai/Janus](https://github.com/deepseek-ai/Janus)
- [QwenLM/Qwen2.5-Omni](https://github.com/QwenLM/Qwen2.5-Omni)
- [OpenBMB/MiniCPM-o](https://github.com/OpenBMB/MiniCPM-o)
- [baaivision/Emu3](https://github.com/baaivision/Emu3)

**第三方分析**

- [Nathan Lambert · GPT-4o's images and lessons from native input-output multimodality](https://www.interconnects.ai/p/gpt-4os-images-and-lessons-from-native)
- [Z.ai GLM-4.6V · VentureBeat](https://venturebeat.com/technology/z-ai-debuts-open-source-glm-4-6v-a-native-tool-calling-vision-model-for)
- [Kimi K2.5 论文解读 · datawhalechina](https://github.com/datawhalechina/self-llm/blob/master/models/Kimi-K2.5/01-Kimi-K2.5-%E8%AE%BA%E6%96%87%E8%A7%A3%E8%AF%BB.md)
- [豆包多模态 · TMTPost](https://en.tmtpost.com/post/7645516)
