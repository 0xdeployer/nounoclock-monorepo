import "../env";
import { draw } from "../utils/drawNoun";
import fs from "fs";
import { IgApiClient } from "instagram-private-api";
import { StickerBuilder } from "instagram-private-api/dist/sticker-builder";
import { ContractNames, getContract } from "../utils/web3";
import {
  auctionCreatedPostToIg,
  auctionSettledCb,
  logIn,
} from "../utils/listeners";

const testEvent = {
  address: "0x830BD73E4184ceF73443C15111a1DF14e495C706",
  blockHash:
    "0xa727afdebfcf0eda7e25e8a18335fce345eea714d8a6ef400b69687f5a858107",
  blockNumber: 15150604,
  logIndex: 33,
  removed: false,
  transactionHash:
    "0xb0ae715eebba36a5af182bcab322e63e65ae15b2825507c33177a467ea7d3bf7",
  transactionIndex: 27,
  id: "log_4a4384aa",
  returnValues: {
    "0": "375",
    "1": "0x4e142fe48C71092E78Be1F1082fa8cE0cB15C354",
    "2": "106080000000000000000",
    nounId: "375",
    winner: "0x4e142fe48C71092E78Be1F1082fa8cE0cB15C354",
    amount: "106080000000000000000",
  },
  event: "AuctionSettled",
  signature:
    "0xc9f72b276a388619c6d185d146697036241880c36654b1a3ffdad07c24038d99",
  raw: {
    data: "0x0000000000000000000000004e142fe48c71092e78be1f1082fa8ce0cb15c354000000000000000000000000000000000000000000000005c027ddf6cd700000",
    topics: [
      "0xc9f72b276a388619c6d185d146697036241880c36654b1a3ffdad07c24038d99",
      "0x0000000000000000000000000000000000000000000000000000000000000177",
    ],
  },
};

async function run() {
  // const image = await draw(375, "New Noun sold for 69.69 ETH!");
  // fs.writeFileSync("noun.ignore.jpg", image);
  await auctionCreatedPostToIg({ returnValues: { nounId: "465" } });
  return;
  // const ig = new IgApiClient();
  // ig.state.generateDevice(process.env.IG_USERNAME as string);
  // await ig.account.login(
  //   process.env.IG_USERNAME as string,
  //   process.env.IG_PASSWORD as string
  // );
  // const caption = `This is a #nounish test. This is noun 375.`;
  // await ig.publish.photo({
  //   file: image,
  //   caption,
  // });
  // await ig.publish.story({
  //   file: image,
  // });
  // fs.writeFileSync("noun.ignore.jpg", image);
}

run()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
