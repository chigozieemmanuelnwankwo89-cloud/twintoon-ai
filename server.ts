import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Initialize Gemini client if API key is provided
let geminiClient: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
  try {
    geminiClient = new GoogleGenAI({ apiKey });
    console.log('[TwinToon AI] Gemini SDK initialized successfully.');
  } catch (err) {
    console.warn('[TwinToon AI] Failed to initialize Gemini client:', err);
  }
} else {
  console.log('[TwinToon AI] No valid GEMINI_API_KEY found; studio generative engine will handle synthesis.');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint for cloud hosting
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).send('OK');
  });

  // Source code ZIP download endpoint
  app.get('/api/download-zip', (_req: Request, res: Response) => {
    const zipPath = path.resolve(__dirname, 'twintoon-ai-source.zip');
    if (fs.existsSync(zipPath)) {
      res.setHeader('Content-Disposition', 'attachment; filename="twintoon-ai-source.zip"');
      res.setHeader('Content-Type', 'application/zip');
      return res.sendFile(zipPath);
    }
    return res.status(404).json({ error: 'Source archive not found' });
  });

  // Status check endpoint
  app.get('/api/status', (_req: Request, res: Response) => {
    res.json({
      status: 'online',
      app: 'TwinToon AI',
      tagline: 'Imagine It. Create It. Make It Go Viral.',
      hasGeminiKey: Boolean(geminiClient),
      timestamp: new Date().toISOString(),
    });
  });

  // AI Generation proxy endpoint
  app.post('/api/generate', async (req: Request, res: Response) => {
    const { tool, prompt, systemInstruction } = req.body;

    if (!tool || !prompt) {
      return res.status(400).json({ error: 'Missing required parameters: tool and prompt' });
    }

    // If Gemini client is active, attempt to generate via Gemini 3.8 Flash with a strict timeout
    if (geminiClient) {
      try {
        const fullPrompt = `${systemInstruction ? systemInstruction + '\n\n' : ''}${prompt}`;
        
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API call timed out after 7000ms')), 7000)
        );

        const generatePromise = geminiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: fullPrompt,
          config: {
            temperature: 0.8,
            responseMimeType: 'application/json',
          },
        });

        const response = await Promise.race([generatePromise, timeoutPromise]);
        const rawText = response.text?.trim() || '';
        try {
          const parsed = JSON.parse(rawText);
          return res.json({
            success: true,
            source: 'gemini',
            data: parsed,
          });
        } catch {
          // If response isn't strict JSON, return as wrapped text
          return res.json({
            success: true,
            source: 'gemini',
            data: { resultText: rawText },
          });
        }
      } catch (err: unknown) {
        console.warn('[TwinToon AI] Gemini API call error:', err);
        // Return notice so frontend falls back to built-in generator
        return res.json({
          success: false,
          fallbackRequired: true,
          error: (err as Error)?.message || 'Gemini generation failed, falling back to local studio engine',
        });
      }
    }

    // No API key configured
    return res.json({
      success: false,
      fallbackRequired: true,
      message: 'GEMINI_API_KEY not configured. Using TwinToon Studio Engine fallback.',
    });
  });

  // Mount Vite or static server
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 TwinToon AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
