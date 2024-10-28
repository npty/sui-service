import { TxBuilder } from "@axelar-network/axelar-cgp-sui";
import { toHex } from "@mysten/sui/utils";
import { requestSuiFromFaucetV0 } from "@mysten/sui/faucet";
import { faucetUrl, suiClient } from "./constants";

export async function buildTxBytes(
  walletAddress: string,
  txBuilder: TxBuilder,
) {
  txBuilder.tx.setSender(walletAddress);

  const txBytes = await txBuilder.tx.build({
    client: suiClient,
  });

  return toHex(txBytes);
}

export async function fundWalletIfNeeded(recipient: string) {
  const balanceResponse = await suiClient.getBalance({
    owner: recipient,
  });

  const balance = balanceResponse.totalBalance;

  if (BigInt(balance) > BigInt(2e9)) {
    console.log("Wallet already has enough balance", balance);
    return;
  }

  await requestSuiFromFaucetV0({
    host: faucetUrl,
    recipient,
  });
}
