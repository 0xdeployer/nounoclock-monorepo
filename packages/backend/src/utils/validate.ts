import { messageToSign } from "../routes/timestamp";
import { getHttpProvider } from "./web3";

export async function validate(params: {
  timestamp: number;
  address: string;
  sig: string;
}) {
  const web3 = getHttpProvider();
  const { timestamp, address, sig } = params;
  const now = Date.now();
  // sig valid only for 24 hours
  if (timestamp >= now) {
    return false;
  }

  if (now - timestamp > 1000 * 60 * 60 * 24) {
    return false;
  }
  const msg = messageToSign(timestamp);
  const recoveredAddress = web3.utils.toChecksumAddress(
    web3.eth.accounts.recover(msg as string, sig)
  );
  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    return false;
  }
  return true;
}
