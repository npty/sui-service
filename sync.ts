import fs from "fs";
import path from "path";

const baseDir = path.join(
  __dirname,
  "..",
  "axelar-contract-deployments",
  "axelar-chains-config",
  "info",
);
const localDir = path.join(baseDir, "local.json");
const devnetDir = path.join(baseDir, "devnet-amplifier.json");
const infoDir = path.join(__dirname, "info");

type Env = "local" | "devnet-amplifier";

export function sync(env: Env = "local") {
  if (!fs.existsSync(infoDir)) {
    fs.mkdirSync(infoDir);
  }

  const dir = env === "local" ? localDir : devnetDir;

  if (env === "local") {
    const local = JSON.parse(fs.readFileSync(dir, "utf-8"));

    // Modify the rpc and faucet urls
    local.chains.sui.rpc = process.env.SUI_NODE;
    local.chains.sui.faucetUrl = process.env.SUI_FAUCET;

    fs.writeFileSync(
      path.join(infoDir, `${env}.json`),
      JSON.stringify(local.chains.sui, null, 2),
    );
  } else {
    const data = JSON.parse(fs.readFileSync(dir, "utf-8"));

    fs.writeFileSync(
      path.join(infoDir, `${env}.json`),
      JSON.stringify(data.chains["sui-test2"], null, 2),
    );
  }
}

export function syncAll() {
  sync("local");
  console.log("Synced local ✅");
  sync("devnet-amplifier");
  console.log("Synced devnet-amplifier ✅");
}

if (process.env.SKIP_SYNC !== "true") {
  syncAll();
} else {
  console.log("Skipping sync...");
}
