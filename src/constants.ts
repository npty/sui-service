import swagger from "@elysiajs/swagger";
import { SuiClient } from "@mysten/sui/client";
import path from "path";

export const rpcUrl = process.env.SUI_NODE || "http://localhost:9000";
export const faucetUrl = process.env.SUI_FAUCET || "http://localhost:9123";
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
