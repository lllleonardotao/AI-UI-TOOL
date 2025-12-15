/**
 * Vercel Serverless Function - OpenRouter API 代理
 * 这个函数作为安全代理，隐藏 API Key，只允许前端调用
 */
export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 从环境变量获取 API Key（在 Vercel 项目设置中配置）
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.error('OPENROUTER_API_KEY environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error: API key not configured' });
  }

  try {
    // 转发请求到 OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': req.headers.referer || req.headers.origin || '',
        'X-Title': 'AI UI Design Comparator'
      },
      body: JSON.stringify(req.body)
    });

    // 获取响应数据
    const data = await response.json();

    // 返回响应（保持原始状态码）
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Proxy request failed',
      message: error.message 
    });
  }
}

