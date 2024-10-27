import swagger from "@elysiajs/swagger";
import { SuiClient } from "@mysten/sui/client";
import { getWallet } from "./utils";
import path from "path";

export const localUrl = process.env.SUI_NODE || "http://localhost:9000";
export const localFaucet = process.env.SUI_FAUCET || "http://localhost:9123";
export const port = process.env.PORT || 3000;
export const keypair = getWallet();
export const suiClient = new SuiClient({ url: localUrl });

export const moveDir = path.join(process.cwd(), "move");

export const swaggerSpec = swagger({
  version: "0.0.1",
  documentation: {
    info: {
      title: "Sui Service",
      version: "0.0.1",
    },
  },
});
