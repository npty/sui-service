import { Elysia } from "elysia";
import fs from "fs";
import path from "path";
import { swaggerSpec, port } from "./constants";
import {
  publishInterchainTx,
  PublishTokenSchema,
  PublishTokenParams,
} from "./actions/publish-token";

const app = new Elysia()
  .use(swaggerSpec)
  .get("/", () => "Sui Service is running")
  .get("/chain/:env", ({ params, error }) => {
    try {
      return getChainInfo(params.env);
    } catch (e: any) {
      return error(400, e.message);
    }
  })
  .post("/deploy-token", ({ body }) => postPublishToken(body), {
    body: PublishTokenSchema,
  })
  .listen(port);

async function postPublishToken(body: PublishTokenParams) {
  const txBytes = await publishInterchainTx(body);

  return {
    data: {
      txBytes,
    },
  };
}

async function getChainInfo(env: string) {
  if (!["local", "testnet"].includes(env)) {
    throw new Error(
      "Invalid environment. Only local and testnet are supported",
    );
  }

  const chainConfigPath = path.join(__dirname, "..", "info", `${env}.json`);
  const info = JSON.parse(fs.readFileSync(chainConfigPath, "utf-8"));

  return {
    data: info,
  };
}

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
