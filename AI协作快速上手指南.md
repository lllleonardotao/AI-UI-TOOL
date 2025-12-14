# AI协作快速上手指南

> **目标：** 让新的AI能在5分钟内完全理解项目并继续工作  
> **用途：** Tao换电脑后，给新AI快速恢复上下文

---

## 🎯 一句话项目简介

**AI UI设计对比工具** - 一键对比4个AI模型的移动端UI设计生成效果，降低99%成本。

---

## 📋 立即需要知道的

### 1. 当前状态
```
✅ 工具开发完成（v1.0）
✅ OpenRouter API已配置
✅ 所有功能都实现了
❌ 唯一问题：图片虽然返回但无法显示
```

### 2. 文件结构
```
ai-ui-tool-v1.0-纯JS渲染版.html  ← 最新工具（必下）
PROJECT-STATE-最新.md            ← 项目状态（给你看）
2024-12-11开发日志.md            ← 今天进度（给你看）
本文件                           ← 快速上手（给你看）
```

### 3. Tao是谁
- 产品设计师
- 追求全栈能力
- 重视效率和成本
- 喜欢glassmorphism风格
- 需要立即能用的工具（2小时内）

---

## 🚀 5分钟快速理解

### 第1分钟：产品是什么

**功能：** 输入UI需求 → 同时调用4个AI模型 → 对比设计效果

**价值：**
- 传统：每次生成$0.04-$0.10，只能看1个
- 我们：每次$0.10，同时看4个（Gemini免费）
- 节省：99%成本 + 4倍效率

### 第2分钟：技术栈

**Phase 0（现在）：**
- 单HTML文件（无需安装）
- Tailwind CSS
- 纯JavaScript
- OpenRouter API
- localStorage

**Phase 1（计划）：**
- React前端
- Node.js后端
- Model Adapter系统

### 第3分钟：核心功能

```
✅ 已实现：
- OpenRouter统一API
- 4模型并发生成
- 自定义模型管理
- 失败结果保留+重试
- 成本实时估算
- 下载图片

❌ 待解决：
- 图片显示问题
```

### 第4分钟：当前问题

**现象：**
```
API调用成功 ✅
数据成功返回 ✅
格式正确解析 ✅
浏览器无法渲染 ❌
```

**Console显示：**
```json
{
  "type": "image_url",
  "image_url": "data:image/png;base64,iVBORw..." // 100KB+的base64
}
```

**可能原因：**
1. Base64太大
2. HTML转义问题
3. 浏览器限制
4. OpenRouter兼容性

### 第5分钟：你要做什么

**立即任务：**
1. 帮Tao测试v1.0（纯JS渲染版）
2. 看图片能否显示
3. 如果不行，提供方案

**可能的方案：**
- 方案A：继续调试
- 方案B：换OpenAI直连
- 方案C：先做文本版

---

## 💬 和Tao沟通的要点

### ✅ Tao喜欢
- 快速响应
- 直接给方案
- 提前告知选项
- 文字简洁
- 功能立即能用

### ❌ Tao不喜欢
- 长篇大论
- 只说不做
- 隐藏技术细节
- 事后才说有问题

### 📌 重要提醒
- Tao已经测试了一晚上
- 已经10点多了，他可能累了
- 给明确的选择：测试 vs 休息
- 尊重他的时间

---

## 🛠️ 技术细节速查

### OpenRouter配置
```javascript
API_URL: https://openrouter.ai/api/v1
Endpoint: /chat/completions (不是/images/generations)
Headers: 
  - Authorization: Bearer sk-or-v1-xxxxx
  - Content-Type: application/json
  - HTTP-Referer: window.location.href
  - X-Title: AI UI Design Comparator
Body:
  - model: "google/gemini-2.5-flash-image-preview"
  - modalities: ["image", "text"]  ← 必需！
  - messages: [{role: "user", content: prompt}]
```

### 模型配置
```javascript
Gemini Image: google/gemini-2.5-flash-image-preview ($0.00) ⭐
Flux Pro:     black-forest-labs/flux.2-pro ($0.05)
GPT-5 Image:  openai/gpt-5-image ($0.04)
Claude 3.5:   anthropic/claude-3.5-sonnet ($0.01, 描述生成)
```

### 返回格式
```javascript
// OpenRouter返回
data.choices[0].message.content = [
  {
    type: "image_url",
    image_url: "data:image/png;base64,iVBORw..." // ← 直接是字符串
    // 或
    image_url: { url: "data:image/png;base64,..." } // ← 对象
  }
]

// 或者
data.choices[0].message.images = [
  "data:image/png;base64,..." // 字符串数组
]
```

---

## 🐛 已知问题和解决方案

### ❌ 问题1：模型ID错误
```
错误：openai/dall-e-3 is not a valid model ID
解决：使用正确格式 google/gemini-2.5-flash-image-preview
```

### ❌ 问题2：API端点不对
```
错误：/images/generations 不支持
解决：改用 /chat/completions + modalities参数
```

### ❌ 问题3：数据格式解析
```
错误：images[0].substring is not a function
解决：支持对象和字符串两种格式
```

### ⚠️ 问题4：图片不显示（当前）
```
症状：base64返回但浏览器无法渲染
尝试：v1.0用纯JS DOM操作替代HTML字符串
待验证：是否解决
```

---

## 📝 决策记录速查

### D001：为什么用OpenRouter
- 一个API访问多个模型
- 降低集成复杂度
- 成本优势

### D002：为什么单HTML
- Tao需要2小时内能用
- 双击即可运行
- 无需安装依赖

### D003：为什么Gemini优先
- 完全免费
- 适合测试验证
- 降低开发成本

### D007：为什么要提前展示方案
- Tao反馈应该早点知道OpenRouter
- 未来PRD要增加技术选项对比

---

## 🎯 下一步行动指南

### 场景A：Tao说"测试v1.0"

**你的回应：**
```
1. 提醒：先F12打开Console
2. 指导：只勾选Gemini测试
3. 等待：看结果
4. 分析：根据Console判断
```

### 场景B：Tao说"还是不行"

**你的回应：**
```
给3个明确方案：
1. 方案A：换OpenAI直连（保证能用）
2. 方案B：Phase 0简化（先做文本）
3. 方案C：明天重新设计

让Tao选择，不要犹豫
```

### 场景C：Tao说"太晚了"

**你的回应：**
```
理解和支持：
"今天测试了10+次，辛苦了。
今天的成果都在，明天继续。
我会准备3个方案供你选择。"
```

---

## 💡 GPT建议的重要性

**GPT提出的Model Adapter概念很重要！**

```
核心思想：
- 每个模型需要自己的适配层
- 统一输入输出格式
- 支持多种返回类型（图片/HTML/文本）

何时实现：
- 不是现在（Phase 0）
- 是Phase 1的核心
- 现在：先保证基础功能能用
```

---

## 🎊 成功标准

### Phase 0完成标志
```
✅ 至少1个模型能显示图片
✅ 工具可以正常使用
✅ Tao能用它做真实工作
```

### 衡量成功的方法
```
不是：代码有多完美
不是：架构有多先进
而是：Tao今晚能不能用上
```

---

## 🔥 紧急救援方案

### 如果一切都不work

**Plan B：超级简化版**
```html
<!-- 5分钟版本 -->
<textarea>输入UI需求</textarea>
<button>生成</button>
<div>
  Model 1: [文字描述]
  Model 2: [文字描述]
  Model 3: [文字描述]
  Model 4: [文字描述]
</div>
```

**价值：**
- 至少能对比描述
- 验证工作流程
- Phase 1再加图片

---

## ✅ 检查清单

**开始前确认：**
- [ ] 读完PROJECT-STATE.md
- [ ] 读完开发日志
- [ ] 理解当前问题
- [ ] 知道Tao的偏好

**开始时告诉Tao：**
```
"我已经了解项目状态，
当前问题是图片显示，
v1.0已准备好测试，
需要你下载测试或选择其他方案。"
```

---

## 🎯 最重要的3句话

1. **Tao需要的是能用的工具，不是完美的代码**
2. **数据已经返回了，只差显示这一步**
3. **如果2小时还解决不了，换方案比继续调试更明智**

---

**准备好了吗？开始帮Tao吧！** 💪
