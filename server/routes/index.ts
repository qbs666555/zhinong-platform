import { Router, Request, Response } from 'express';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

const router = Router();

// Disease & Pest Identification API with Streaming
router.post('/api/identify', async (req: Request, res: Response) => {
  const { image } = req.body;

  if (!image) {
    res.status(400).json({ error: '请上传图片' });
    return;
  }

  // Set headers for SSE streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    // Convert headers to Record<string, string>
    const headersObj: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        headersObj[key] = Array.isArray(value) ? value.join(', ') : value;
      }
    }
    const customHeaders = HeaderUtils.extractForwardHeaders(headersObj);
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    // Prompt for plant disease & pest identification
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

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      {
        role: 'user' as const,
        content: [
          { type: 'text' as const, text: '请分析这张植物图片，识别是否存在病虫害问题。' },
          {
            type: 'image_url' as const,
            image_url: {
              url: image as string,
              detail: 'high' as const,
            },
          },
        ],
      },
    ];

    // Use streaming
    const stream = client.stream(messages, {
      model: 'doubao-seed-2-0-pro-260215',
      temperature: 0.7,
    });

    // Stream response to client using SSE format
    for await (const chunk of stream) {
      if (chunk.content && !res.writableEnded) {
        const data = 'data: ' + chunk.content.toString() + '\n\n';
        res.write(data);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('LLM API Error:', error);
    if (!res.writableEnded) {
      res.status(500).json({ error: '识别服务暂时不可用，请稍后重试' });
    }
  }
});

// Health check
router.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default router;
