# AI UI Design Comparator

一个用于对比多个 AI 模型生成 UI 设计效果的 Web 应用。

## 功能特性

- 🎨 支持多个 AI 模型同时生成 UI 设计
- 📱 支持手机端和 PC 端平台选择
- 💰 实时成本估算
- 🔧 支持自定义模型添加
- 🎯 快速模板（登录页、仪表盘、个人中心）

## 支持的模型

- **Gemini Image** - 免费
- **Gemini 2.5 Flash Image** - 免费
- **Gemini 3 Pro Image** - 免费
- **Flux Pro** - $0.05
- **GPT-5 Image** - $0.04
- **Claude 3.5** - $0.01

## 使用方法

1. 打开 `AI_UI_Comparator/index.html` 文件
2. 在设置中配置 OpenRouter API Key
3. 输入 UI 设计需求
4. 选择目标平台（手机端/PC端）
5. 选择要使用的 AI 模型
6. 点击"开始生成"

## 平台支持

所有模型（包括自定义模型）都会自动包含平台信息：
- **手机端**: mobile app (iOS/Android)
- **PC端**: desktop web application

## 技术栈

- 纯 HTML/CSS/JavaScript
- Tailwind CSS (CDN)
- OpenRouter API

## 许可证

MIT

