/**
 * Vercel Edge Function - OpenRouter API 代理
 * 使用Edge Runtime获得更长的免费超时时间（30秒 vs Serverless的10秒）
 *
 * 优势：
 * - 免费计划：30秒超时（vs Serverless的10秒）
 * - 全球边缘节点，低延迟
 * - 冷启动快
 */

// 配置为Edge Runtime
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // 处理 OPTIONS 请求（CORS 预检）
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // 从环境变量获取 API Key
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error('OPENROUTER_API_KEY environment variable is not set');
    return new Response(
      JSON.stringify({
        error: 'Server configuration error',
        message: 'API key not configured on server. Please contact administrator.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    // 固定转发到 chat/completions 端点
    const targetUrl = 'https://openrouter.ai/api/v1/chat/completions';

    // 获取请求body
    const body = await req.json();

    // 准备请求头
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': req.headers.get('referer') || req.headers.get('origin') || '',
      'X-Title': 'AI UI Design Comparator'
    };

    // 转发请求到 OpenRouter API
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    // 获取响应数据
    const data = await response.json();

    // 返回响应（设置CORS头）
    return new Response(
      JSON.stringify(data),
      {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(
      JSON.stringify({
        error: 'Proxy request failed',
        message: error.message
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
