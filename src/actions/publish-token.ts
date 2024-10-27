import { copyMovePackage, TxBuilder } from "@axelar-network/axelar-cgp-sui";
import { toHex } from "@mysten/sui/dist/cjs/utils";
import { keypair, moveDir, suiClient } from "../constants";

export async function publishInterchainTx(
  sender: string,
  name: string,
  symbol: string,
  decimals: number,
) {
  // const walletAddress = keypair.toSuiAddress();

  // await fundWalletIfNeeded(walletAddress);

  const interchainTokenOptions = {
    name,
    symbol,
    decimals,
  };

  copyMovePackage("interchain_token", null, moveDir);

  const txBuilder = new TxBuilder(suiClient);

  const cap = await txBuilder.publishInterchainToken(
    moveDir,
    interchainTokenOptions,
  );

  txBuilder.tx.transferObjects([cap], keypair.toSuiAddress());

  txBuilder.tx.setSender(sender);

  const txBytes = await txBuilder.tx.build({
    client: suiClient,
  });

  return toHex(txBytes);
}
