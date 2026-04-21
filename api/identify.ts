import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return new Response(JSON.stringify({ error: '请上传图片' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const customHeaders = HeaderUtils.extractForwardHeaders(
      Object.fromEntries(request.headers.entries())
    );
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    const systemPrompt = `你是一位专业的植物病虫害诊断专家。请仔细分析用户上传的植物图片，识别可能存在的病虫害问题。

请按以下格式提供分析结果：
1. **病虫害名称**：如果识别到病虫害，给出具体名称
2. **受害程度**：轻微/中等/严重
3. **识别依据**：图片中观察到的主要特征
4. **防治建议**：包括农业防治、物理防治、生物防治、化学防治等方法
5. **推荐药品关键词**：列出2-3个主要的防治药品通用名称或有效成分关键词（用于电商搜索），格式：[药品关键词1] [药品关键词2] [药品关键词3]
6. **预防措施**：如何预防类似问题再次发生

如果没有发现明显病虫害，请说明图片中植物的生长状态，并给出养护建议。

请用中文回答，语言专业但易懂。`;

    type Role = 'system' | 'user' | 'assistant';
    
    const messages: Array<{ role: Role; content: string | Array<{ type: string; text?: string; image_url?: { url: string; detail: string } }> }> = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: [
          { type: 'text', text: '请分析这张植物图片，识别是否存在病虫害问题。' },
          {
            type: 'image_url',
            image_url: { url: image, detail: 'high' }
          }
        ]
      }
    ];

    const stream = client.stream(messages, {
      model: 'doubao-seed-2-0-pro-260215',
      temperature: 0.7
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.content) {
              controller.enqueue(encoder.encode(`data: ${chunk.content.toString()}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (error) {
    console.error('LLM API Error:', error);
    return new Response(JSON.stringify({ error: '识别服务暂时不可用' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({
    status: 'ok',
    platform: 'Vercel Serverless',
    timestamp: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
