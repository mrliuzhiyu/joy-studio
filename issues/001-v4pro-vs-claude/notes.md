# 001 · DeepSeek V4-Pro vs Claude · 写作笔记

**发布**：2026-04-24 · 微信公众号 · 「刘志宇 Joy」
**标题**：刚发布的 DeepSeek V4-Pro，已经长出了自己的审美

---

## 一句话钩子

V4-Pro 跑分追上 Claude Opus 4.6，但拿到手里做题，两边的**审美取向**完全不同——一个冷色硅谷风，一个暖色咖啡店风。

---

## 选题动机

- DeepSeek V4 发布当日，无发布会、一条公众号消息上线——典型 DS 风格，值得记一笔
- 1M 上下文 + V4-Pro/Flash 双版本 + ¥24/¥2 定价（约 Claude Opus 的 1/20-1/50）——三个事实都够分量
- 跑分（SWE-bench 80.6% vs 80.8%）和真实使用差距是个老问题，做一手实测有信息增量

## 提纲（5 章）

1. **V4-Pro 是个什么模型** —— 硬参数、思考模式、跑分定位
2. **三道题** —— 算法（mergesort）/ 数学（Lorenz 吸引子）/ 审美（番茄钟） · 同样 prompt 同样浏览器
3. **结果** —— Claude vs V4-Pro 各自风格，体量差 3 倍
4. **审美差异** —— 冷色硅谷风 vs 暖色咖啡店风
5. **定价 + max_tokens 踩坑** —— 实战提示

## 实验设置

- 三道题源 prompt：见 `experiments/req-1-mergesort.json` / `req-2-lorenz.json` / `req-3-pomodoro.json`
- 各家 API 原始回包：`experiments/raw-1.json` / `raw-2.json` / `raw-3.json`
- 思考过程（reasoning）：`experiments/reasoning-*.txt`
- 最终产物：`experiments/{claude,deepseek}-{1-mergesort,2-lorenz,3-pomodoro}.html`
- 排版复刻实验：`experiments/exp-v4pro-layout*.html`（V4-Pro 自己排版能力测试）

## 配图素材

- 封面生成器：`assets/cover-gen.html`
- 截图工具：`assets/screenshot-helper.html`
- DS Logo SVG / dataurl：`assets/deepseek-*.{svg,txt}`

---

## 复盘 · 下次可改进

- _发布后回填：阅读量、转发、评论亮点、自己看完最满意/最遗憾的部分_
- _如果有读者反馈打到痛处，记下来_
