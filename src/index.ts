import { Elysia } from "elysia";
import { swaggerSpec, port } from "./constants";
import { publishInterchainTx } from "./actions/publish-token";

const app = new Elysia()
  .use(swaggerSpec)
  .get("/", () => "Sui Service is running")
  .post("/deploy-token", ({ body }) => postPublishInterchainTx(body))
  .listen(port);

async function postPublishInterchainTx(body: any) {
  const { sender, name, symbol, decimals } = body;
  const txBytes = await publishInterchainTx(sender, name, symbol, decimals);

  return {
    data: {
      txBytes,
    },
  };
}

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
