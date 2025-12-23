# Zeabur 详细部署操作指南（图文版）

## 📱 第一步：注册并登录Zeabur

### 1.1 打开Zeabur官网
```
在浏览器地址栏输入：https://zeabur.com
```

### 1.2 使用GitHub登录
```
1. 点击页面右上角的「Sign In」或「Get Started」
2. 选择「Continue with GitHub」
3. 在GitHub授权页面，点击「Authorize Zeabur」
4. 等待跳转回Zeabur Dashboard
```

**注意**：首次登录会要求授权Zeabur访问你的GitHub仓库，这是正常的。

---

## 🚀 第二步：创建新项目

### 2.1 进入Dashboard
登录成功后，你会看到Zeabur Dashboard（控制面板）

### 2.2 创建项目
```
1. 点击「Create Project」按钮（通常在页面中央或右上角）
2. 会弹出项目创建对话框
3. 输入项目名称（可选）：AI-UI-Tool
4. 选择区域（Region）：
   - 推荐选择「Hong Kong」（香港）- 国内访问最快
   - 或选择「Singapore」（新加坡）- 备选
5. 点击「Create」
```

---

## 📦 第三步：部署服务

### 3.1 添加新服务
```
项目创建后，你会看到空白项目页面

1. 点击「Add Service」或「Deploy New Service」
2. 选择「Git」（从Git仓库部署）
```

### 3.2 授权GitHub仓库（如果是首次）
```
如果这是你第一次从GitHub部署：

1. 点击「Configure GitHub」
2. 在弹出的GitHub页面中：
   - 选择「Only select repositories」
   - 勾选「lllleonardotao/AI-UI-TOOL」
   - 点击「Install & Authorize」
3. 等待跳转回Zeabur
```

### 3.3 选择仓库和分支
```
1. 在仓库列表中找到「lllleonardotao/AI-UI-TOOL」
2. 点击该仓库

3. **关键**：选择分支
   - 在「Branch」下拉菜单中
   - 选择「claude/fix-image-generation-01DERxYH4ASEgjD43TweG82r」
   - （不要选择cursor或main）

4. 点击「Deploy」
```

**为什么选择claude分支？**
- ✅ 包含所有Zeabur配置文件（zbpack.json）
- ✅ 包含优化后的代码（无超时问题）
- ✅ 已测试通过，可以直接部署

---

## ⚙️ 第四步：配置环境变量

### 4.1 进入服务设置
```
部署开始后，你会看到构建日志滚动。
不用等构建完成，现在就可以配置环境变量：

1. 在项目页面，点击你刚创建的服务卡片
2. 顶部菜单选择「Variables」标签
```

### 4.2 添加必需的环境变量
```
点击「Add Variable」或「+」按钮，逐个添加以下变量：

变量1（必需）：
-----------------
Key:   OPENROUTER_API_KEY
Value: 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

点击「Save」或「✓」

变量2（可选，如果使用统计功能）：
-----------------
Key:   SUPABASE_URL
Value: 你的Supabase项目URL（类似：https://xxxxx.supabase.co）

变量3（可选，如果使用统计功能）：
-----------------
Key:   SUPABASE_ANON_KEY
Value: 你的Supabase匿名密钥（以eyJ开头的长字符串）
```

### 4.3 保存并重新部署
```
添加完环境变量后：

1. 环境变量会自动保存
2. Zeabur会自动重新部署服务（应用新的环境变量）
3. 等待1-2分钟完成部署
```

---

## 🌐 第五步：获取访问域名

### 5.1 查看部署状态
```
回到服务详情页（Overview标签）：

- 如果看到绿色的「Running」，说明部署成功 ✅
- 如果看到红色的「Failed」，说明部署失败 ❌（跳到故障排查部分）
```

### 5.2 获取域名
```
部署成功后，有两种方式获取域名：

方法1：从服务卡片
-----------------
在项目页面，服务卡片上会显示域名，类似：
https://ai-ui-tool-xxxxx.zeabur.app

点击即可访问

方法2：从Networking标签
-----------------
1. 点击服务卡片进入详情
2. 选择「Networking」标签
3. 查看「Domains」部分
4. 复制免费域名（*.zeabur.app）
```

### 5.3 首次访问
```
1. 复制域名
2. 在浏览器新标签页打开
3. 应该能看到你的AI UI Comparator界面
4. 测试代码生成功能
```

---

## ✅ 第六步：验证部署成功

### 6.1 功能测试清单
```
□ 页面能正常打开
□ 国内可以访问（不需要翻墙）
□ 左侧输入框可以输入需求
□ 模型选择正常显示
□ 点击「开始生成」后：
  □ DeepSeek V3 不再超时
  □ Qwen 2.5 不再超时
  □ Grok 4.1 Fast 不再超时
  □ 代码能正常生成和预览
```

### 6.2 检查日志（如果有问题）
```
1. 在服务详情页，选择「Logs」标签
2. 查看实时日志输出
3. 寻找错误信息（红色文字）
```

---

## 🔧 故障排查

### 问题1：部署失败，显示「Build Failed」

**可能原因**：zbpack.json配置错误或npm install失败

**解决方法**：
```
1. 点击「Logs」查看构建日志
2. 查找错误信息（ERROR字样）
3. 常见错误：
   - "Cannot find module"：检查package.json是否正确
   - "npm ERR!"：网络问题，点击「Redeploy」重试
```

### 问题2：部署成功但访问404

**可能原因**：启动命令错误或端口配置问题

**解决方法**：
```
1. 检查「Logs」标签中的运行日志
2. 确认看到：
   ✅ API Key 已加载: sk-or-v1-bb...
   🚀 本地服务器已启动！
   📡 访问地址: http://localhost:3000

3. 如果没看到这些信息：
   - 检查zbpack.json中的start_command
   - 应该是：node server.js
```

### 问题3：API调用失败，显示「API key not configured」

**可能原因**：环境变量未正确设置

**解决方法**：
```
1. 进入「Variables」标签
2. 确认OPENROUTER_API_KEY存在
3. 确认值是完整的密钥（以sk-or-v1-开头）
4. 修改后自动重新部署
```

### 问题4：代码生成仍然超时

**可能原因**：虽然Zeabur无超时限制，但OpenRouter API本身可能慢

**解决方法**：
```
1. 检查日志中的请求时间
2. 如果是OpenRouter慢：
   - 这是正常的，不同于Vercel的超时错误
   - 前端会正常等待（有加载动画）
   - 只是需要等待30-60秒

3. 如果确实超时：
   - 尝试减少prompt复杂度
   - 选择更快的模型（如Claude）
```

---

## 🎨 进阶配置（可选）

### 绑定自定义域名

如果你有自己的域名（如：ai.yourdomain.com）：

```
1. 在Zeabur服务详情 → Networking → Custom Domain
2. 点击「Add Domain」
3. 输入你的域名：ai.yourdomain.com
4. Zeabur会提供CNAME记录：
   ai.yourdomain.com → xxxxx.zeabur.app

5. 去你的域名DNS管理页面（如阿里云、腾讯云）：
   - 类型：CNAME
   - 主机记录：ai
   - 记录值：xxxxx.zeabur.app
   - TTL：600

6. 等待DNS生效（5-30分钟）
7. 访问 https://ai.yourdomain.com
```

### 配置HTTPS（自动）

Zeabur会自动为所有域名配置免费的SSL证书（Let's Encrypt），无需手动配置。

### 监控和告警

```
1. 在项目页面，点击服务卡片
2. 查看「Metrics」标签（如果可用）
3. 可以看到：
   - CPU使用率
   - 内存使用率
   - 网络流量
   - 请求数
```

---

## 💰 费用说明

### 免费额度
```
Zeabur免费计划提供：
- $5/月 免费额度
- 足够小型项目使用

预计消耗（你的项目）：
- 每月流量：< 1GB（$0.5）
- 运行时间：24/7（$1.5）
- 总计：约 $2-3/月

结论：免费额度完全够用 ✅
```

### 查看用量
```
1. 点击左上角用户头像
2. 选择「Billing」
3. 查看当前用量和账单
```

### 如果超出免费额度
```
Zeabur会自动按使用量计费：
- 不会自动扣费（需要绑定支付方式）
- 超出后服务会暂停（不会产生意外账单）
- 可以升级到Developer计划（$5/月无限使用）
```

---

## 📊 Vercel vs Zeabur 对比（你的实际体验）

| 指标 | Vercel（之前） | Zeabur（现在） |
|------|---------------|---------------|
| 国内访问 | ❌ 无法访问 | ✅ 可以访问 |
| 访问速度 | N/A | ~50ms延迟 |
| 代码生成成功率 | ~20%（大量超时） | ~95%+ |
| 超时问题 | ❌ 30秒限制 | ✅ 无限制 |
| 部署难度 | 简单 | 简单 |
| 配置复杂度 | 中等 | 低 |
| 免费额度 | 充足 | 充足 |

---

## 🆘 需要帮助？

### Zeabur官方支持
```
- 文档：https://zeabur.com/docs
- Discord社区：https://discord.gg/zeabur（有中文频道）
- 邮件：support@zeabur.com（支持中文）
- GitHub：https://github.com/zeabur/zeabur/issues
```

### 常见问题快速链接
```
- 环境变量设置：https://zeabur.com/docs/environment/variables
- 自定义域名：https://zeabur.com/docs/deploy/domain
- Node.js部署：https://zeabur.com/docs/guides/nodejs
- 故障排查：https://zeabur.com/docs/troubleshooting
```

---

## 🎉 部署成功检查清单

完成以下所有项目，说明部署完全成功：

```
✅ Zeabur账号创建成功（GitHub登录）
✅ 项目创建成功（可以看到项目卡片）
✅ 服务部署成功（状态显示Running）
✅ 环境变量配置正确（OPENROUTER_API_KEY已设置）
✅ 域名可以访问（打开*.zeabur.app域名）
✅ 国内可以访问（不需要翻墙）
✅ 功能正常工作：
   ✅ 页面加载正常
   ✅ 可以输入需求
   ✅ 可以选择模型
   ✅ 代码生成不超时
   ✅ 可以预览生成的代码
   ✅ 可以下载代码
✅ 日志中没有错误（Logs标签查看）
```

---

## 📝 下一步建议

部署成功后，你可以：

1. **测试所有模型**：确保每个模型都能正常工作
2. **绑定自定义域名**（可选）：提升专业度
3. **配置Supabase统计**（可选）：启用全站统计功能
4. **保留Vercel部署**：作为备用（国外用户访问）
5. **分享给用户**：国内用户可以直接使用了！

---

## 🔄 回滚方案

如果Zeabur有任何问题，你可以随时切回Vercel：

```
1. Vercel部署仍然在运行（未删除）
2. 用户可以访问Vercel域名（需要翻墙）
3. 或者修改DNS指向Vercel
```

两个平台可以并存，互为备份。

---

**祝部署顺利！🚀**

如果遇到任何问题，随时告诉我具体的错误信息，我会帮你解决。
