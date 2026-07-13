#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'src');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

// Spawn Tailwind Compiler in watch mode
console.log("⏳ Starting Tailwind CSS watch compiler...");
const inputCss = `"${path.join(__dirname, 'src', 'input.css')}"`;
const outputCss = `"${path.join(__dirname, 'src', 'output.css')}"`;
const tailwind = spawn('npx', ['@tailwindcss/cli', '-i', inputCss, '-o', outputCss, '--watch'], {
  shell: true,
  stdio: 'inherit'
});

const server = http.createServer((req, res) => {
  const decodedUrl = decodeURIComponent(req.url);
  let filePath = path.join(PUBLIC_DIR, decodedUrl === '/' ? 'index.html' : decodedUrl);
  
  const ext = path.extname(filePath);
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      res.end(content, 'utf-8');
    }
  });
});

let currentPort = PORT;

function startServer(port) {
  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`🚀 Web Server is running at: ${url}`);
    console.log("Press Ctrl+C to stop the server and the compiler.");
    
    // Auto-open browser
    const startCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${startCmd} ${url}`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️ Port ${currentPort} is in use. Trying port ${currentPort + 1}...`);
    currentPort++;
    startServer(currentPort);
  } else {
    console.error(err);
  }
});

startServer(currentPort);

// Ensure Tailwind child process is cleaned up when server exits
process.on('SIGINT', () => {
  tailwind.kill();
  process.exit();
});
process.on('SIGTERM', () => {
  tailwind.kill();
  process.exit();
});
