import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));

// API routes
app.post('/api/identify', async (req, res) => {
  const { image } = req.body;
  
  if (!image) {
    return res.status(400).json({ error: '请上传图片' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    // Import coze-coding-dev-sdk dynamically
    const { LLMClient, Config, HeaderUtils } = await import('coze-coding-dev-sdk');
    
    const customHeaders = HeaderUtils.extractForwardHeaders(
      Object.fromEntries(Object.entries(req.headers).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v || '']))
    );
    const config = new Config();
    const client = new LLMClient(config, customHeaders);

    const systemPrompt = `你是一位专业的植物病虫害诊断专家。请仔细分析用户上传的植物图片，识别可能存在的病虫害问题。

请按以下格式提供分析结果：
1. **病虫害名称**：如果识别到病虫害，给出具体名称
2. **受害程度**：轻微/中等/严重
3. **识别依据**：图片中观察到的主要特征
4. **防治建议**：包括农业防治、物理防治、生物防治、化学防治等方法
5. **推荐药品关键词**：列出2-3个主要的防治药品通用名称或有效成分关键词
6. **预防措施**：如何预防类似问题再次发生

请用中文回答，语言专业但易懂。`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      {
        role: 'user' as const,
        content: [
          { type: 'text' as const, text: '请分析这张植物图片，识别是否存在病虫害问题。' },
          { type: 'image_url' as const, image_url: { url: image, detail: 'high' as const } }
        ]
      }
    ];

    const stream = client.stream(messages, {
      model: 'doubao-seed-2-0-pro-260215',
      temperature: 0.7
    });

    for await (const chunk of stream) {
      if (chunk.content && !res.writableEnded) {
        res.write(`data: ${chunk.content.toString()}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('LLM API Error:', error);
    if (!res.writableEnded) {
      res.status(500).json({ error: '识别服务暂时不可用' });
    }
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', platform: 'Railway', timestamp: new Date().toISOString() });
});

// Serve static files from dist
app.use(express.static(join(__dirname, '../dist')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
