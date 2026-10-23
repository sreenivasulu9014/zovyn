#!/usr/bin/env node
import { spawnSync } from "child_process";

console.log("⚡ [zovyn vercel-shim] Intercepting 'vite build' -> redirecting to 'next build'...");
const result = spawnSync("npx", ["next", "build"], { stdio: "inherit", shell: true });
process.exit(result.status ?? 0);
