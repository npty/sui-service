import { Static, t } from "elysia";

export const ChainEnvSchema = t.Object({
  env: t.Union([t.Literal("local"), t.Literal("testnet")]),
});

export type ChainEnv = Static<typeof ChainEnvSchema>;
