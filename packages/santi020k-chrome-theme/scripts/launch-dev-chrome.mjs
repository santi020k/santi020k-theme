#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dir, '..');
const repoRoot = resolve(packageRoot, '../..');
const variants = new Set(['dark', 'light']);
const variantArg = process.argv.find(arg => arg.startsWith('--variant='));
const variant = variantArg?.split('=')[1] ?? 'dark';

if (!variants.has(variant)) {
  console.error(`Unknown Chrome theme variant: ${variant}`);

  console.error(`Expected one of: ${[...variants].join(', ')}`);

  process.exit(1);
}

const extensionDir = join(packageRoot, '.dev', variant);
const profileDir = join(repoRoot, '.vscode', `chrome-${variant}-profile`);
const devtoolsPortFile = join(profileDir, 'DevToolsActivePort');

const chromeCandidates = [
  process.env.CHROME_BIN,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
].filter(Boolean);

const chromeBin = chromeCandidates.find(candidate => existsSync(candidate));

if (!chromeBin) {
  console.error('Could not find a Chrome-compatible browser. Set CHROME_BIN to the executable path.');

  process.exit(1);
}

const prepareResult = spawnSync(
  process.execPath,
  [join(__dir, 'prepare-dev-extension.mjs'), `--variant=${variant}`],
  { stdio: 'inherit' }
);

if (prepareResult.status !== 0) {
  process.exit(prepareResult.status ?? 1);
}

mkdirSync(profileDir, { recursive: true });

rmSync(devtoolsPortFile, { force: true });

const chrome = spawn(
  chromeBin,
  [
    `--user-data-dir=${profileDir}`,
    '--remote-debugging-port=0',
    '--enable-unsafe-extension-debugging',
    '--no-first-run',
    '--no-default-browser-check',
    'chrome://newtab'
  ],
  { detached: true, stdio: 'inherit' }
);

let chromeExited = false;
let extensionLoaded = false;
let shutdownTimer;

chrome.on('exit', (code, signal) => {
  chromeExited = true;

  if (shutdownTimer) {
    clearTimeout(shutdownTimer);
  }

  if (extensionLoaded) {
    process.exit(signal ? 0 : code ?? 0);
  }
});

const killChromeGroup = signal => {
  if (process.platform === 'win32') {
    return;
  }

  try {
    process.kill(-chrome.pid, signal);
  } catch {
    // The process may already be gone by the time VS Code stops the runner.
  }
};

const stopChrome = signal => {
  chrome.kill(signal);

  killChromeGroup(signal);

  shutdownTimer = setTimeout(() => {
    chrome.kill('SIGKILL');

    killChromeGroup('SIGKILL');
  }, 5000);

  shutdownTimer.unref();
};

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    if (!chromeExited) {
      stopChrome('SIGTERM');

      return;
    }

    process.exit(0);
  });
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const waitForBrowserWebSocketUrl = async portFile => {
  const deadline = Date.now() + 15000;

  while (Date.now() < deadline) {
    if (chromeExited) {
      throw new Error('Chrome exited before DevTools became available. Close any existing runner Chrome window for this variant and try again.');
    }

    if (existsSync(portFile)) {
      const [port, path] = readFileSync(portFile, 'utf8').trim().split('\n');

      if (port && path) {
        return `ws://127.0.0.1:${port}${path}`;
      }
    }

    await wait(100);
  }

  throw new Error('Timed out waiting for Chrome DevTools. Close any existing runner Chrome window and try again.');
};

const sendBrowserCommand = async (websocketUrl, method, params) => {
  const websocket = new WebSocket(websocketUrl);

  await new Promise((resolve, reject) => {
    websocket.addEventListener('open', resolve, { once: true });

    websocket.addEventListener('error', reject, { once: true });
  });

  try {
    return await new Promise((resolve, reject) => {
      const id = 1;

      websocket.addEventListener(
        'message',
        event => {
          resolve(JSON.parse(event.data));
        },
        { once: true }
      );

      websocket.addEventListener('error', reject, { once: true });

      websocket.send(JSON.stringify({ id, method, params }));
    });
  } finally {
    websocket.close();
  }
};

try {
  const websocketUrl = await waitForBrowserWebSocketUrl(devtoolsPortFile);

  const result = await sendBrowserCommand(websocketUrl, 'Extensions.loadUnpacked', {
    path: extensionDir
  });

  if (result.error) {
    throw new Error(`${result.error.message}${result.error.data ? `: ${result.error.data}` : ''}`);
  }

  console.log(`Loaded Santi020k Chrome ${variant} theme (${result.result.id}).`);

  extensionLoaded = true;
} catch (error) {
  console.error(`Failed to load the Chrome ${variant} theme: ${error.message}`);

  if (!chromeExited) {
    stopChrome('SIGTERM');
  }

  process.exit(1);
}

setInterval(() => {}, 2147483647);
