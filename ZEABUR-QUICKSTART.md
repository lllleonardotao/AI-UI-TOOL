# Zeabur 快速部署清单（5分钟）

## 📋 准备工作
- [ ] GitHub账号
- [ ] OpenRouter API Key（从.env文件复制）
- [ ] Supabase配置（可选，如果使用统计功能）

## 🚀 部署步骤

### 1️⃣ 注册并登录 (1分钟)
```
1. 访问 https://zeabur.com
2. 点击「Sign in with GitHub」
3. 授权Zeabur访问你的仓库
```

### 2️⃣ 创建项目 (1分钟)
```
1. 点击「Create Project」
2. 选择「Deploy New Service」→「GitHub」
3. 选择仓库：lllleonardotao/AI-UI-TOOL
4. 选择分支：cursor（或main）
5. 点击「Deploy」
```

### 3️⃣ 配置环境变量 (2分钟)
```
1. 在项目页面，点击你的服务
2. 进入「Variables」标签
3. 添加以下变量：

   变量名                    值
   ──────────────────────────────────────
   OPENROUTER_API_KEY       sk-or-v1-xxx...
   SUPABASE_URL             https://xxx.supabase.co (可选)
   SUPABASE_ANON_KEY        eyJxxx... (可选)
```

**重要**：复制Vercel上的环境变量值，确保一致！

### 4️⃣ 等待部署完成 (1分钟)
```
1. Zeabur会自动检测zbpack.json配置
2. 运行：npm install
3. 启动：node server.js
4. 部署完成后，会显示域名
```

### 5️⃣ 测试访问
```
1. 复制Zeabur提供的域名（类似：xxx.zeabur.app）
2. 在浏览器打开
3. 测试代码生成功能
4. 检查是否还有超时问题
```

## ✅ 成功标志
- [ ] 可以打开网页
- [ ] 国内可以访问（不需要翻墙）
- [ ] 代码生成不再超时
- [ ] 生成速度更快

## 🔍 常见问题

### Q1: 部署失败，显示"Build failed"
**解决**：
1. 检查zbpack.json是否正确提交
2. 查看构建日志，确认npm install成功
3. 确认Node.js版本兼容（zbpack.json指定Node 18）

### Q2: 访问404错误
**解决**：
1. 确认服务已启动（在Zeabur Dashboard查看状态）
2. 检查域名是否正确
3. 等待DNS传播（可能需要几分钟）

### Q3: API调用失败
**解决**：
1. 检查环境变量是否正确配置
2. 确认OPENROUTER_API_KEY已设置
3. 查看服务日志（Zeabur Dashboard → Logs）

### Q4: 统计功能不工作
**解决**：
1. 确认SUPABASE_URL和SUPABASE_ANON_KEY已配置
2. 检查Supabase数据库连接
3. 查看服务日志中的错误信息

## 📊 性能对比

| 指标 | Vercel | Zeabur |
|------|--------|--------|
| 国内访问 | ❌ 需翻墙 | ✅ 直接访问 |
| 超时限制 | 30秒 | 无限制 |
| 代码生成成功率 | ~20% | ~95%+ |
| 响应速度（国内） | 慢/不可用 | 30-50ms |

## 💰 成本
- **免费额度**：$5/月
- **预计消耗**：$2-3/月（小流量）
- **结论**：完全免费

## 🔗 获取域名

部署成功后：
```
Zeabur Dashboard
  → 你的项目
  → 你的服务
  → Networking
  → 复制域名
```

免费域名格式：`your-service-name.zeabur.app`

## 📝 绑定自定义域名（可选）

如果你有自己的域名：
```
1. Zeabur Dashboard → Networking → Custom Domain
2. 输入你的域名（如：ai-ui.yourdomain.com）
3. 按提示配置DNS记录（CNAME）
4. 等待DNS生效（5-30分钟）
```

## 🎉 完成！

现在你的应用：
- ✅ 在Zeabur上运行（无超时限制）
- ✅ 国内可以访问
- ✅ 代码生成不再失败
- ✅ 统计功能正常工作

---

**需要帮助？**
- 查看详细文档：ZEABUR-DEPLOY.md
- Zeabur支持：support@zeabur.com（中文）
- Discord社区：https://discord.gg/zeabur
