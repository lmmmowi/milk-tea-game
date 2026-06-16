import COS from "cos-nodejs-sdk-v5";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const distDir = path.join(projectRoot, "dist");
const localEnvPath = path.join(projectRoot, ".env.deploy.local");

function loadLocalEnv() {
  if (!existsSync(localEnvPath)) return;

  const lines = readFileSync(localEnvPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}. Set it in your shell or .env.deploy.local.`);
  }
  return value;
}

async function listFiles(dir) {
  const entries = await readdir(dir);
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const info = await stat(fullPath);

    if (info.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else if (info.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".m4a": "audio/mp4",
    ".map": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".txt": "text/plain; charset=utf-8",
    ".webp": "image/webp",
  };

  return types[ext] ?? "application/octet-stream";
}

function cacheControl(key) {
  if (key === "index.html") return "no-cache, no-store, must-revalidate";
  if (key.startsWith("assets/") || key.startsWith("audio/")) return "public, max-age=31536000, immutable";
  return "public, max-age=300";
}

function putObject(cos, params) {
  return new Promise((resolve, reject) => {
    cos.putObject(params, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(data);
    });
  });
}

function normalizePrefix(prefix) {
  const trimmed = prefix.trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `${trimmed}/` : "";
}

loadLocalEnv();

const bucket = requireEnv("COS_BUCKET");
const region = requireEnv("COS_REGION");
const secretId = requireEnv("COS_SECRET_ID");
const secretKey = requireEnv("COS_SECRET_KEY");
const prefix = normalizePrefix(process.env.COS_PREFIX ?? "");

if (!existsSync(distDir)) {
  throw new Error("Missing dist/. Run npm run build before deploying.");
}

const cos = new COS({
  SecretId: secretId,
  SecretKey: secretKey,
});

const files = await listFiles(distDir);

console.log(`Uploading ${files.length} files to cos://${bucket}/${prefix}`);

for (const filePath of files) {
  const relativePath = path.relative(distDir, filePath).split(path.sep).join("/");
  const key = `${prefix}${relativePath}`;

  await putObject(cos, {
    Bucket: bucket,
    Region: region,
    Key: key,
    Body: createReadStream(filePath),
    ContentType: contentType(filePath),
    CacheControl: cacheControl(relativePath),
  });

  console.log(`uploaded ${key}`);
}

console.log("COS deploy complete.");
