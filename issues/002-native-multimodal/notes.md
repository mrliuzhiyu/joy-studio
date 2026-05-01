# 002 · 原生多模态大模型到底是什么 · notes

## 一句话定位

LLM 一开始是关上眼睛的纯文字模型。怎么让它看懂图、听懂声？过去三年走了三代解法，到第三代才出现原生多模态这个词。

## 核心观点

- 原生多模态不是学术术语，是 Google 2023-12 造出来的营销词，OpenAI 接棒，全行业抢用
- 但它背后确实对应一类不同于以往的模型架构（token 级融合 / 联合预训练）
- 真正做出来的团队全球还是个位数，工程门槛被严重低估
- 行业里 Anthropic 的克制选择（不蹭这个词）反而值得尊敬
- 读者拿走辨别口诀：看图像音频是否被 tokenize、是否在预训练阶段联合参与

## 读者画像

用过 ChatGPT、关心 AI 的城市读者。可以是产品、设计、前端，也可以是非技术但常刷 AI 内容的人。不是 AI 研究员，也不是完全零基础的家人群读者。

## 6 章提纲

### 01 ChatGPT 那时候，AI 还是关上眼睛的

- 铺垫：ChatGPT 2022-11 上线，是个纯文字模型
- LLM 的 L = Language，工作方式是吃文字 token 预测下一个文字 token
- 这个范式在文字任务上极其成功，但人类的世界不只有文字
- 过去三年的工业题：怎么让 LLM 长出眼睛和耳朵
- 引出三代解法

### 02 第一代：把图片翻译成文字

- 最朴素的解法：图像识别 → 文字描述 → LLM
- 信息严重损失，盲人摸象
- 这条路今天没人走了
- 章末插图：四代演进总图

### 03 第二代：装上视觉义眼

- 视觉编码器（CLIP）+ 连接器 + LLM
- 视觉以向量形式注入隐藏层
- 但编码器和 LLM 分开训练 → 排异 → 睁眼瞎
- 后续改进：联合微调
- 但文字仍是绝对主角
- 今天大量 VLM 仍停在这一代：Qwen2.5-VL、智谱 GLM-V、MiniCPM-V
- **观点段：Anthropic Claude 也是这条路，但官方刻意不蹭"原生"这个词。我看下来是行业里少见的克制，把视觉做扎实远比凑齐音频图像生成要务实**

### 04 第三代真原生：把图像也变成 token

- 思路彻底变：不要外挂，把图像音频也切成 token，跟文字一起进模型
- VQ-VAE 和 RVQ 把图像音频离散化
- 章中插图：token 化数学空间
- 金句：红色词的坐标 ≈ 红色光波的坐标
- 代表：开源 Chameleon / Janus-Pro / Qwen2.5-Omni / Emu3，闭源 GPT-4o / Gemini（声称）
- **观点段：到这一代文字才不再是 LLM 的特权语言，所有模态平起平坐，跨模态推理才真正成为可能**
- Nathan Lambert 引用：原生在 scaling 上是否真有根本优势仍是开放问题

### 05 原生不是口号，是工程地狱

- 一深两浅
- 深例子：Chameleon QK-Norm 八卦（softmax 爆炸 / QK-Norm / 34B 换 pre-norm）
- 章中插图：MiniCPM-o vs Chameleon 架构对比
- 浅例子 1：MiniCPM-o 24.4k stars 是 4 模型组装伪装
- 浅例子 2：Llama 4 在 2025-04 才宣布 first natively multimodal Llama
- **观点段：工程门槛被严重低估，全球能做出来的团队个位数**

### 06 现在的景观，以及你怎么辨别

- 三层分类
  - 第一层：自称原生 + 可信（GPT-4o / Gemini / Llama 4）
  - 第二层：自称原生 + 不可验证（豆包 / Kimi K2.5）
  - 第三层：嫁接式（Qwen2.5-VL / GLM-V / MiniCPM-V）
- 几个特殊位置：Anthropic / DeepSeek-V3 / 真原生开源四件套
- 辨别口诀：看 token 化、看是否预训练联合
- **观点段：我自己用什么模型，我对接下来一年的预测**

## 风格约束

- 不用中文双引号包概念
- 少形容词
- 技术专名（CLIP / VQ-VAE / Chameleon 这种产品名）保留英文，其他用中文
- 每个事实带可点击 markdown 链接
- 不刻意造钩子
- 章节编号 01-06，按 [design.md](../../design.md) 排版规范

## 配图

3 张静态 HTML，浏览器打开 → 截图 → 上传公众号素材库 → 替换 draft.md 里的占位符

| # | 文件 | 嵌入位置 | 内容 |
|---|---|---|---|
| 1 | [diagram-1-evolution.html](assets/diagram-1-evolution.html) | 02 章末 | 四代多模态架构横向对比 |
| 2 | [diagram-2-token-space.html](assets/diagram-2-token-space.html) | 04 章中 | 跨模态共享数学空间散点图 |
| 3 | [diagram-3-architecture-compare.html](assets/diagram-3-architecture-compare.html) | 05 章中 | MiniCPM-o 拼装 vs Chameleon 真融合 |

## 素材来源（写 draft 时参考）

完整链接库见 [experiments/research-brief.md](experiments/research-brief.md)。draft.md 里把链接 inline 在事实后面。

## 复盘（发布后填）

- 阅读量：
- 读者反馈中反复出现的关键词：
- 哪段写得最好（被截图传播的段落）：
- 下次能更好的：
