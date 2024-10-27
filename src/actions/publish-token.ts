import { copyMovePackage, TxBuilder } from "@axelar-network/axelar-cgp-sui";
import { keypair, moveDir, suiClient } from "../constants";
import { buildTxBytes } from "../utils";

export async function publishInterchainTx(
  sender: string,
  name: string,
  symbol: string,
  decimals: number,
) {
  copyMovePackage("interchain_token", null, moveDir);

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

  txBuilder.tx.transferObjects([cap], keypair.toSuiAddress());

  return buildTxBytes(sender, txBuilder);
}
