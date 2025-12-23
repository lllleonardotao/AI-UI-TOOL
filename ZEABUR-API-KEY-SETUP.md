# Zeabur API Key 配置指南

## 🚨 问题诊断

如果你看到所有模型都报错 **"key is not defined"**，这说明服务器端的 OpenRouter API Key 还没有配置。

---

## ✅ 解决方案：在 Zeabur 配置环境变量

### 第一步：登录 Zeabur

1. 访问 https://zeabur.com
2. 使用你的账号登录

---

### 第二步：进入项目设置

1. 在 Dashboard 中找到你的项目：**AI-UI-TOOL**
2. 点击项目卡片进入项目详情页

---

### 第三步：配置环境变量

1. 在项目页面顶部，找到并点击 **"Variables"**（变量）选项卡

2. 点击 **"Add Variable"**（添加变量）按钮

3. 填写以下信息：
   ```
   Key: OPENROUTER_API_KEY
   Value: sk-or-v1-你的实际API密钥
   ```

4. 点击 **"Save"**（保存）

---

### 第四步：获取 OpenRouter API Key（如果还没有）

1. 访问 https://openrouter.ai/
2. 点击右上角 **"Sign In"** 登录（支持 Google/GitHub 登录）
3. 登录后，点击头像 → **"Keys"**
4. 点击 **"Create Key"**
5. 复制生成的 API Key（格式：`sk-or-v1-xxxxxx...`）
6. 回到 Zeabur，将这个 Key 填入环境变量

---

### 第五步：重启服务

配置完环境变量后，Zeabur 会自动重启你的服务。你也可以手动重启：

1. 在项目页面，找到 **"Deployments"**（部署）选项卡
2. 点击 **"Redeploy"**（重新部署）

---

### 第六步：验证配置

1. 等待 1-2 分钟让服务重启完成
2. 刷新你的应用页面（F5）
3. 选择一个模型，输入 prompt，点击 **"开始生成"**
4. 如果配置正确，应该能正常生成内容

---

## 📸 配置截图示例

在 Zeabur Variables 页面，你应该看到：

```
┌─────────────────────────────────────────────────┐
│ Environment Variables                           │
├─────────────────────────────────────────────────┤
│ OPENROUTER_API_KEY                              │
│ sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx │
│                                                 │
│ [Edit] [Delete]                                 │
└─────────────────────────────────────────────────┘
```

---

## 🔍 如何验证配置是否成功

### 方法1：查看服务器日志

1. 在 Zeabur 项目页面，点击 **"Logs"**（日志）
2. 查看是否有以下日志：
   ```
   ✅ API Key 已加载: sk-or-v1-**********...****
   ```

### 方法2：生成测试

1. 在你的应用中输入简单的 prompt：`一个登录页面`
2. 选择一个免费模型（如 Qwen QVQ 72B）
3. 点击生成
4. 如果成功生成，说明 API Key 配置正确

---

## ❌ 常见错误

### 错误1：key is not defined
**原因**：环境变量 `OPENROUTER_API_KEY` 未配置或配置错误
**解决**：按照上述步骤重新配置

### 错误2：401 Unauthorized
**原因**：API Key 无效或已过期
**解决**：在 OpenRouter 重新生成 API Key

### 错误3：429 Too Many Requests
**原因**：API 调用次数超限（免费额度用完）
**解决**：
- 等待限流重置（通常几分钟）
- 或在 OpenRouter 充值以获得更高额度

---

## 💡 提示

1. **免费额度**：OpenRouter 新用户通常有一定的免费额度，可以先测试
2. **成本控制**：建议优先使用免费模型（如 Gemini 2.0 Flash、Qwen 等）
3. **安全性**：不要将 API Key 提交到 Git 仓库或公开分享

---

## 🆘 仍然有问题？

如果按照以上步骤操作后仍然报错，请：

1. **检查 Zeabur 日志**：查看是否有其他错误信息
2. **验证 API Key**：在 OpenRouter 网站测试 API Key 是否有效
3. **清除缓存**：浏览器硬刷新（Ctrl+Shift+R 或 Cmd+Shift+R）
4. **联系支持**：访问 https://github.com/anthropics/claude-code/issues 提问

---

**配置完成后，你就可以正常使用所有模型了！** 🎉
