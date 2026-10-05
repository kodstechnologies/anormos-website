import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const sourceRoot = new URL("../src", import.meta.url);

async function listPointers(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return listPointers(path);
    return entry.name.endsWith(".asset.json") ? [path] : [];
  }));
  return nested.flat();
}

const pointers = await listPointers(sourceRoot.pathname);
let updated = 0;

for (const pointer of pointers) {
  if (extname(pointer) !== ".json") continue;
  const asset = JSON.parse(await readFile(pointer, "utf8"));
  if (typeof asset.url !== "string") continue;
  const marker = "/__l5e/assets-v1/";
  const markerIndex = asset.url.indexOf(marker);
  if (markerIndex < 0 || asset.url.startsWith(marker)) continue;
  // Amplify serves the mirrored originals from this same site. Keep generated
  // client and SSR bundles independent of the Lovable preview origin.
  asset.url = asset.url.slice(markerIndex);
  await writeFile(pointer, `${JSON.stringify(asset, null, 2)}\n`);
  updated += 1;
}

console.log(`Prepared ${updated} hosted media pointers for AWS Amplify.`);