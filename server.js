// Dependencies
// =============================================================
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express';
import cors from 'cors';
import router from './utils/controller.js';
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Sets up the Express App
// =============================================================
async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use((req, res, next) => {
    vite.middlewares.handle(req, res, next)
  })

  const PORT = process.env.PORT || 3000;

  // Sets up the Express app to handle data parsing
  app.use(cors());
  app.use(express.json());
  app.use(router);

  // Static directory to be served
  app.use('*', async (req, re, next) => {
    const url = req.originalUrl

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      )
      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('/src/main.jsx')
      const appHtml = await render(url)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  // LISTENER
  app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
  });
}

createServer();