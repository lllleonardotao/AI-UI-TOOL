# Zeabur 部署指南

## 为什么迁移到Zeabur？

1. ✅ **国内可访问**（香港节点，低延迟）
2. ✅ **无超时限制**（Node.js应用模式）
3. ✅ **部署简单**（和Vercel一样简单）
4. ✅ **免费额度充足**（$5/月）

## 部署步骤

### 1. 注册Zeabur账号

1. 访问 https://zeabur.com
2. 使用GitHub账号登录
3. 授权Zeabur访问你的GitHub仓库

### 2. 创建新项目

1. 点击「Create Project」
2. 选择「From GitHub」
3. 选择你的仓库：`lllleonardotao/AI-UI-TOOL`
4. 选择分支：`cursor`（或你的主分支）

### 3. 配置环境变量

在Zeabur项目设置中添加以下环境变量：

```
OPENROUTER_API_KEY=你的OpenRouter API密钥
SUPABASE_URL=你的Supabase URL（如果使用）
SUPABASE_ANON_KEY=你的Supabase匿名密钥（如果使用）
```

**重要**：确保这些变量和Vercel上的一致。

### 4. 部署配置

Zeabur会自动检测到`zbpack.json`配置文件，使用以下配置：

- **应用类型**：Node.js应用
- **启动命令**：`node server.js`
- **端口**：3000
- **Node版本**：18

### 5. 部署

1. 点击「Deploy」
2. 等待部署完成（约1-2分钟）
3. Zeabur会提供一个免费域名：`your-app.zeabur.app`

### 6. 测试

1. 访问 `https://your-app.zeabur.app`
2. 测试代码生成功能
3. 检查是否还有超时问题

## 部署模式对比

### Vercel（当前）
- 部署模式：Serverless Functions + Edge Functions
- 超时限制：30秒（Edge Functions）
- 国内访问：❌ 被墙
- 问题：超时率高

### Zeabur（推荐）
- 部署模式：Node.js长期运行应用
- 超时限制：无限制（或几分钟）
- 国内访问：✅ 香港节点，稳定
- 优势：解决超时和访问问题

## 关键差异

### Vercel上的API调用
```
前端 → /api/openrouter → Edge Function（30秒超时）→ OpenRouter API
```

### Zeabur上的API调用
```
前端 → /api/openrouter → Node.js Server（无超时限制）→ OpenRouter API
```

## 常见问题

### Q: 需要修改代码吗？
A: **不需要**！`server.js`已经完美支持。

### Q: 免费额度够用吗？
A: Zeabur免费提供$5/月额度，对于个人项目足够。超出后按使用量计费。

### Q: 可以保留Vercel吗？
A: 可以！两个平台可以同时部署，Zeabur用于国内访问，Vercel用于国外访问。

### Q: 如何绑定自定义域名？
A: 在Zeabur项目设置 → Domains → 添加自定义域名，然后按提示配置DNS。

## 域名配置

Zeabur提供：
1. **免费域名**：`your-app.zeabur.app`（开箱即用）
2. **自定义域名**：支持绑定自己的域名

## 成本估算

基于你的使用场景（个人项目，中等流量）：

- **免费额度**：$5/月
- **预计消耗**：$2-3/月（小流量）
- **结论**：免费额度足够

## 监控和日志

Zeabur提供：
- 实时日志查看
- 资源使用监控
- 错误追踪

访问：Zeabur Dashboard → 你的项目 → Logs

## 回滚方案

如果Zeabur有问题，可以随时切回Vercel：
1. Vercel部署仍然保留
2. 修改DNS指向Vercel域名
3. 或直接使用Vercel提供的域名

## 技术支持

- Zeabur文档：https://zeabur.com/docs
- Discord社区：https://discord.gg/zeabur
- 邮件支持：support@zeabur.com（中文支持）
