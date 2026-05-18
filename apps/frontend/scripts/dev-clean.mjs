import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";

const distDir = process.env.NEXT_DIST_DIR || ".next-dev";
process.env.NEXT_DIST_DIR = distDir;

const nextDir = resolve(process.cwd(), distDir);
const serverDir = resolve(nextDir, "server");
const serverChunksDir = resolve(serverDir, "chunks");
const runtimePath = resolve(serverDir, "webpack-runtime.js");

function healServerRuntimeIfNeeded() {
  if (!existsSync(runtimePath) || !existsSync(serverChunksDir)) return;

  let runtimeText = "";
  try {
    runtimeText = readFileSync(runtimePath, "utf8");
  } catch {
    return;
  }

  // Force runtime chunk loader to prefer ./chunks/<id>.js in dev server mode.
  const patchedRuntimeText = runtimeText.replace(
    /require\("\.\/"\s*\+\s*__webpack_require__\.u\(chunkId\)\)/g,
    'require("./chunks/" + __webpack_require__.u(chunkId))'
  );
  if (patchedRuntimeText !== runtimeText) {
    runtimeText = patchedRuntimeText;
    writeFileSync(runtimePath, runtimeText, "utf8");
  }

  // Next dev can sporadically look up numeric chunks from .next/server root.
  // If that happens, mirror lightweight shims from server/chunks to server.
  if (!runtimeText.includes('require("./" + __webpack_require__.u')) return;

  const chunkFiles = readdirSync(serverChunksDir).filter((name) => /\.js$/i.test(name));
  for (const chunkFile of chunkFiles) {
    const shimPath = join(serverDir, chunkFile);
    if (existsSync(shimPath)) continue;

    const shimSource = `module.exports = require("./chunks/${chunkFile}");\n`;
    writeFileSync(shimPath, shimSource, "utf8");
  }
}

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
  console.log(`Removed stale ${distDir} cache.`);
}

const nextBin = resolve(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextBin, "dev", "-p", "3000"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDir
  }
});

healServerRuntimeIfNeeded();

const healTimer = setInterval(() => {
  try {
    healServerRuntimeIfNeeded();
  } catch {
    // no-op: watcher should not crash dev server
  }
}, 200);

child.on("exit", (code, signal) => {
  clearInterval(healTimer);
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
