import swagger from "@elysiajs/swagger";
import { SuiClient } from "@mysten/sui/client";
import path from "path";

export const rpcUrl =
  process.env.SUI_NODE || "https://fullnode.testnet.sui.io/";
export const faucetUrl =
  process.env.SUI_FAUCET || "https://faucet.testnet.sui.io/";
export const suiClient = new SuiClient({ url: rpcUrl });

export const moveDir = path.join(process.cwd(), "move");
export const fromMoveDir = path.join(
  process.cwd(),
  "node_modules",
  "@axelar-network",
  "axelar-cgp-sui",
  "move",
);

export const swaggerSpec = swagger({
  version: "0.0.1",
  documentation: {
    info: {
      title: "Sui Service",
      version: "0.0.1",
    },
  },
});
