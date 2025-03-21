import { Static, t } from "elysia";
import { copyMovePackage, TxBuilder } from "@axelar-network/axelar-cgp-sui";
import { fromMoveDir, moveDir, suiClient } from "../constants";
import { buildTxBytes } from "../utils";

export const PublishTokenSchema = t.Object({
  sender: t.String(),
  name: t.String(),
  symbol: t.String(),
  decimals: t.Number(),
});

export type PublishTokenParams = Static<typeof PublishTokenSchema>;

export const PublishTokenWithChannelSchema = t.Object({
  sender: t.String(),
  name: t.String(),
  symbol: t.String(),
  decimals: t.Number(),
  gatewayAddress: t.String(),
});

export type PublishTokenWithChannelParams = Static<
  typeof PublishTokenWithChannelSchema
>;

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

export async function publishInterchainWithChannelTx(
  params: PublishTokenWithChannelParams,
) {
  const { sender, name, symbol, decimals } = params;

  copyMovePackage("interchain_token", fromMoveDir, moveDir);

  const txBuilder = new TxBuilder(suiClient);

  const interchainTokenOptions = {
    name,
    symbol,
    decimals,
  };

  const Cap = await txBuilder.publishInterchainToken(
    moveDir,
    interchainTokenOptions,
  );

  const gatewayAddress = params.gatewayAddress;

  const Channel = await txBuilder.moveCall({
    target: `${gatewayAddress}::channel::new`,
    arguments: [],
  });

  txBuilder.tx.transferObjects([Cap, Channel], sender);

  return buildTxBytes(sender, txBuilder);
}
