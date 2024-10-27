import { TxBuilder } from "@axelar-network/axelar-cgp-sui";
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { toHex } from "@mysten/sui/utils";
import { Secp256k1Keypair } from "@mysten/sui/keypairs/secp256k1";
import { suiClient } from "./constants";

export function getWallet() {
  const decodedKey = decodeSuiPrivateKey(process.env.PRIVATE_KEY || "");
  const keypair = Secp256k1Keypair.fromSecretKey(decodedKey.secretKey);
  return keypair;
}

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

// async function fundWalletIfNeeded(recipient: string) {
//   const balanceResponse = await suiClient.getBalance({
//     owner: recipient,
//   });
//
//   const balance = balanceResponse.totalBalance;
//
//   if (BigInt(balance) > BigInt(10e9)) {
//     console.log("Wallet already has enough balance", balance);
//   }
//
//   await requestSuiFromFaucetV0({
//     host: localFaucet,
//     recipient,
//   });
// }
