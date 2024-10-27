import { decodeSuiPrivateKey } from "@mysten/sui/cryptography";
import { Secp256k1Keypair } from "@mysten/sui/keypairs/secp256k1";

export function getWallet() {
  const decodedKey = decodeSuiPrivateKey(process.env.PRIVATE_KEY || "");
  const keypair = Secp256k1Keypair.fromSecretKey(decodedKey.secretKey);
  return keypair;
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
