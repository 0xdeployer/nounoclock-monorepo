// Route that accepts a list of addresses and IDs

import { client } from "../redis";
import { Request, Response } from "express";
import { getHttpProvider } from "../utils/web3";
import { log } from "../utils";
import { utils } from "ethers";
import BigNumber from "bignumber.js";

// export async function lookupAddressWithENSFallbackUsingContract(
//   provider,
//   address
// ) {
//   try {
//     const res = await provider.call({
//       to: "0x5982ce3554b18a5cf02169049e81ec43bfb73961",
//       data: "0x55ea6c47000000000000000000000000" + address.substring(2), // resolve() method
//     });
//     // Parse result into a string.
//     const offset = BigNumber.from(utils.hexDataSlice(res, 0, 32)).toNumber();
//     const length = BigNumber.from(
//       utils.hexDataSlice(res, offset, offset + 32)
//     ).toNumber();
//     const data = utils.hexDataSlice(res, offset + 32, offset + 32 + length);
//     return utils.toUtf8String(data) || null;
//   } catch (e) {
//     return null;
//   }
// }
export const REDIS_NNS_KEY_PREFIX = "nns";

export async function getNnsNameFromAddress(address: string) {
  const web3 = getHttpProvider();
  const res = await web3.eth.call({
    to: "0x5982ce3554b18a5cf02169049e81ec43bfb73961",
    data: "0x55ea6c47000000000000000000000000" + address.substring(2),
  });
  const offset = new BigNumber(utils.hexDataSlice(res, 0, 32)).toNumber();
  const length = new BigNumber(
    utils.hexDataSlice(res, offset, offset + 32)
  ).toNumber();
  const data = utils.hexDataSlice(res, offset + 32, offset + 32 + length);
  const name = utils.toUtf8String(data) || "";
  return name;
}

export async function getNns(req: Request, res: Response) {
  try {
    const { addresses } = req.body as {
      addresses: string[];
    };
    const web3 = getHttpProvider();
    const output = await Promise.all(
      addresses.map((address) => {
        const fn = async () => {
          const path = `${REDIS_NNS_KEY_PREFIX}_${address.toLowerCase()}`;
          const cachedName = await client.get(path);
          if (cachedName) {
            return {
              name: cachedName,
              address: address.toLowerCase(),
            };
          }
          const name = await getNnsNameFromAddress(address);
          await client.set(path, name);

          return {
            name,
            address: address.toLowerCase(),
          };
        };
        return fn();
      })
    );
    return res.json(output);
  } catch (e: any) {
    log(e);
    return res.status(500).send({ error: "internal error" });
  }
}
