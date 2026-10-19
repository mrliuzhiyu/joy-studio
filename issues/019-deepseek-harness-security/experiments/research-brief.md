# 事实底座

## 素材

用户提供视频转写：C:/Users/Joy/Downloads/DeepSeek Harness 开源 11 天爆 5 个漏洞：AI 读网页电脑被控，有人 API 额度已被盗刷.md

## 已读一手源

- https://www.deepseek.com/harness/ ：产品能力与插件化。
- https://github.com/zzszmyf/dsh-security-pocs ：0.1.0-rc.5 三个独立问题加一个组合利用链；研究者自述及程序，不冒充本次实际复现。
- https://github.com/zzszmyf/dsh-security-pocs/blob/main/WRITEUP.md ：加载器 !!js、read-only 读取、exec 参数泄露上下文、subprocess 直调；网页端有审批，不写所有组合零审批。
- https://github.com/ChaoMixian/dsh2shell ：暴露 Web 实例管理接口、Host 判断、模拟模型服务；需要后台可达，不提供利用命令。
- https://matrix.tencent.com/zh/2026/08/20/deepseek-harness-agent-injection-risk ：14,560 次受控真实运行、模拟敏感工具；全成功 5.6%/5.3%；隐藏 Unicode 0/25.5%；skills 14.3%/16%；输出 35.7%、动作 2.5%。
- https://arxiv.org/html/2608.16393v1 ：论文核对；结果不代表真实主机攻破率。
- https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.zh.md ：官方实验性定位。

## 已修正视频中的过度声称

- 四个独立漏洞改为三项问题加利用链，不虚构所有漏洞必需串联。
- 不写任意网页必然成功、不写所有默认界面零审批。
- 只读读取受操作系统权限约束，不写自动管理员权限。
- 不把 Unicode 单组 0% 写成所有普通文本 0%。
- 输出 Canary 不等同真实秘密泄露；模拟工具不等同真实破坏。
- 追加日志不等同主机失陷后不可删除。
- 不把异常扣费当作已证明盗刷。
- 原稿对 QVD 评分和原始公告存在不一致，本稿不写未经核实分数。

## 素材真实性

截图通过真实 Chrome 浏览对应原始 URL 获取，未重绘源站、未编辑源站文本。screenshots.json 记录 URL、标题与抓取时间。
