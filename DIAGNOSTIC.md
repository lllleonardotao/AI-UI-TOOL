# 🔍 错误诊断指南："key is not defined"

## 问题症状

所有模型都报错：**"代码生成失败: key is not defined"**

---

## 🔴 根本原因

这个错误通常来自 **OpenRouter API**，意味着服务器端的 API Key 配置有问题。

---

## ✅ 解决步骤

### **第一步：检查 Zeabur 环境变量**

1. 登录 **Zeabur 控制台**
2. 进入你的项目 → **AI-UI-TOOL**
3. 点击 **"Variables"**（环境变量）选项卡
4. **检查是否存在**以下环境变量：
   ```
   OPENROUTER_API_KEY
   ```

---

### **第二步：检查变量值格式**

确保你的 API Key：

✅ **正确格式**：
```
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

❌ **错误格式**：
```
OPENROUTER_API_KEY="sk-or-v1-xxx..."   ❌ 不要加引号
OPENROUTER_API_KEY= sk-or-v1-xxx...    ❌ 等号后不要有空格
OPENROUTER_API_KEY=your_api_key        ❌ 不要用占位符
```

---

### **第三步：检查 Zeabur 日志**

1. 在 Zeabur 项目页面，点击 **"Logs"**（日志）
2. 查找以下日志：

✅ **正常情况**：
```
✅ API Key 已加载: sk-or-v1-**********...****
Server listening on port 3000
```

❌ **异常情况**：
```
❌ API Key 未找到
```

如果看到"API Key 未找到"，说明环境变量没有正确加载。

---

### **第四步：重新配置环境变量**

如果环境变量丢失或格式错误：

1. **删除旧的环境变量**（如果存在）
2. **重新添加**：
   - Key: `OPENROUTER_API_KEY`
   - Value: `sk-or-v1-你的实际密钥`（不要加引号）
3. **保存**
4. **重启服务**：
   - 方式1：Zeabur 会自动重启
   - 方式2：手动点击 **"Redeploy"**

---

### **第五步：获取新的 API Key（如果需要）**

如果你的 API Key 过期或无效：

1. 访问 https://openrouter.ai/
2. 登录后点击头像 → **"Keys"**
3. 点击 **"Create Key"**
4. 复制新的 API Key
5. 更新 Zeabur 环境变量

---

## 🔧 常见问题排查

### Q1：我已经配置了环境变量，为什么还是报错？

**可能原因**：
- 变量名拼写错误（必须是 `OPENROUTER_API_KEY`，区分大小写）
- API Key 值包含多余的空格或引号
- Zeabur 没有正确读取环境变量

**解决方案**：
1. 删除环境变量
2. 重新添加（确保没有空格和引号）
3. 等待服务自动重启
4. 刷新页面测试

---

### Q2：之前能用的模型现在也不行了？

**可能原因**：
- Zeabur 重新部署后环境变量丢失
- 最近修改了代码导致部署失败
- API Key 在 OpenRouter 端被撤销或过期

**解决方案**：
1. 检查 Zeabur 日志（Logs 选项卡）
2. 查看部署状态（Deployments 选项卡）
3. 重新配置环境变量
4. 验证 API Key 是否有效（在 OpenRouter 网站测试）

---

### Q3：如何验证 API Key 是否有效？

**步骤**：
1. 访问 https://openrouter.ai/
2. 登录后点击头像 → **"Keys"**
3. 查看你的 API Key 状态：
   - ✅ **Active**：有效
   - ❌ **Revoked**：已撤销，需要创建新的
4. 点击 **"Test"** 按钮测试 API Key

---

## 📸 正确的配置示例

### Zeabur Variables 页面应该显示：

```
┌─────────────────────────────────────────────────┐
│ Environment Variables                           │
├─────────────────────────────────────────────────┤
│ OPENROUTER_API_KEY                              │
│ sk-or-v1-1234567890abcdefghijklmnopqrstuvwxyz... │
│                                                 │
│ [Edit] [Delete]                                 │
└─────────────────────────────────────────────────┘
```

**注意**：
- ✅ 变量名：`OPENROUTER_API_KEY`
- ✅ 值：直接粘贴 API Key，不要加引号
- ✅ 值的开头：`sk-or-v1-`

---

## 🆘 如果问题仍然存在

1. **导出 Zeabur 日志**：
   - 进入 Logs 选项卡
   - 复制最近的日志（最近 50 行）
   - 发给我诊断

2. **检查部署状态**：
   - 进入 Deployments 选项卡
   - 查看最近的部署是否成功
   - 如果失败，查看错误信息

3. **临时测试方案**：
   - 在 Zeabur 控制台中，尝试**手动触发重新部署**
   - 等待 2-3 分钟
   - 刷新应用页面测试

---

## 📝 快速检查清单

- [ ] Zeabur Variables 中存在 `OPENROUTER_API_KEY`
- [ ] API Key 格式正确（以 `sk-or-v1-` 开头）
- [ ] API Key 值没有引号或多余空格
- [ ] Zeabur 日志显示 "✅ API Key 已加载"
- [ ] 服务正常运行（端口 3000 或 Zeabur 分配的端口）
- [ ] 浏览器已清除缓存并刷新页面

---

**完成以上检查后，应该就能正常使用了！** 🎉
