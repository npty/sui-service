import { Static, t } from "elysia";

export const ChainEnvSchema = t.Object({
  env: t.String({
    enum: ["testnet"],
  }),
});

export type ChainEnv = Static<typeof ChainEnvSchema>;
