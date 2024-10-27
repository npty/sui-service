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
const testnetDir = path.join(baseDir, "testnet.json");
const infoDir = path.join(__dirname, "info");

type Env = "local" | "testnet";

export function sync(env: Env = "local") {
  if (!fs.existsSync(infoDir)) {
    fs.mkdirSync(infoDir);
  }

  if (env === "local") {
    const local = JSON.parse(fs.readFileSync(localDir, "utf-8"));

    // Modify the rpc and faucet urls
    local.chains.sui.rpc = process.env.SUI_NODE;
    local.chains.sui.faucetUrl = process.env.SUI_FAUCET;

    fs.writeFileSync(
      path.join(infoDir, "local.json"),
      JSON.stringify(local.chains.sui, null, 2),
    );
  } else {
    const testnet = JSON.parse(fs.readFileSync(testnetDir, "utf-8"));

    fs.writeFileSync(
      path.join(infoDir, "testnet.json"),
      JSON.stringify(testnet.sui, null, 2),
    );
  }
}

export function syncAll() {
  sync("local");
  console.log("Synced local ✅");
  sync("testnet");
  console.log("Synced testnet ✅");
}

syncAll();
