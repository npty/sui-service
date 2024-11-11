import { Static, t } from "elysia";

const chainEnvs =
  process.env.ENV === "testnet"
    ? ["testnet"]
    : process.env.ENV === "devnet-amplifier"
      ? ["devnet-amplifier"]
      : ["local"];

export const ChainEnvSchema = t.Object({
  env: t.String({
    enum: chainEnvs,
  }),
});

export type ChainEnv = Static<typeof ChainEnvSchema>;
