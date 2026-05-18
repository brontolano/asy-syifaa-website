import { spawn } from "node:child_process";
import { resolve } from "node:path";

const nextBin = resolve(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const distDir = process.env.NEXT_DIST_DIR || ".next-prod";
const port = process.env.PORT || "3000";

const child = spawn(process.execPath, [nextBin, "start", "-p", port], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_DIST_DIR: distDir
  }
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
