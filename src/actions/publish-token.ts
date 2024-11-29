import { Static, t } from "elysia";
import { copyMovePackage, TxBuilder } from "@axelar-network/axelar-cgp-sui";
import { fromMoveDir, moveDir, suiClient } from "../constants";
import { buildTxBytes, fundWalletIfNeeded } from "../utils";

export const PublishTokenSchema = t.Object({
  sender: t.String(),
  name: t.String(),
  symbol: t.String(),
  decimals: t.Number(),
});

export type PublishTokenParams = Static<typeof PublishTokenSchema>;

export async function publishInterchainTx(params: PublishTokenParams) {
  const { sender, name, symbol, decimals } = params;

  copyMovePackage("interchain_token", fromMoveDir, moveDir);

  const txBuilder = new TxBuilder(suiClient);

  const interchainTokenOptions = {
    name,
    symbol,
    decimals,
  };

  const cap = await txBuilder.publishInterchainToken(
    moveDir,
    interchainTokenOptions,
  );

  txBuilder.tx.transferObjects([cap], sender);

  return buildTxBytes(sender, txBuilder);
}
