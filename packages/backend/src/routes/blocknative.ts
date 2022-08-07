import { Request, Response } from "express";
import { client } from "../redis";
import { sockets } from "../sockets";
import { log } from "../utils";
import { getBidMetadata } from "../utils/web3";
import { REDIS_CURRENT_AUCTION_KEY } from "./current-auction";

const exampleBodies = [
  {
    status: "pending",
    system: "ethereum",
    network: "main",
    monitorId: "nethermind_1_a1_prod",
    monitorVersion: "0.116.0",
    serverVersion: "0.143.0",
    timeStamp: "2022-08-07T21:14:51.311Z",
    pendingTimeStamp: "2022-08-07T21:14:51.311Z",
    pendingBlockNumber: 15297557,
    hash: "0x4116a4fe564abd2a34ce9ee1cd6289db903d04bc7c48b8299ec7e3829f1a0c1c",
    from: "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B",
    to: "0x830BD73E4184ceF73443C15111a1DF14e495C706",
    value: "93450000000000000000",
    gas: 81811,
    nonce: 5045,
    blockHash: null,
    blockNumber: null,
    v: "0x0",
    r: "0xa050374956be803dd0505b073d98d1bbe19777ef3ee2660755fe76fe00024138",
    s: "0x251751fe707b1cfe69dd04cf6b36cbf4e9d131cbcaa47111520504ad2ff47d8c",
    input:
      "0x659dd2b40000000000000000000000000000000000000000000000000000000000000191",
    type: 2,
    maxFeePerGas: "11686027572",
    maxFeePerGasGwei: 11.7,
    maxPriorityFeePerGas: "1500000000",
    maxPriorityFeePerGasGwei: 1.5,
    transactionIndex: null,
    asset: "ETH",
    estimatedBlocksUntilConfirmed: 1,
    watchedAddress: "0x830bd73e4184cef73443c15111a1df14e495c706",
    direction: "incoming",
    counterparty: "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B",
    apiKey: "74c6ccdd-f616-49d5-8cfe-f40dde355061",
    contractCall: {
      methodName: "createBid",
      params: { nounId: "401" },
      contractAddress: "0x830BD73E4184ceF73443C15111a1DF14e495C706",
      contractType: "customAbi",
    },
    dispatchTimestamp: "2022-08-07T21:14:51.520Z",
  },
  {
    status: "pending-simulation",
    system: "ethereum",
    network: "main",
    monitorId: "Geth_1_F_PROD",
    monitorVersion: "0.116.0",
    serverVersion: "0.143.0",
    timeStamp: "2022-08-07T21:14:51.410Z",
    pendingTimeStamp: "2022-08-07T21:14:51.311Z",
    pendingBlockNumber: 15297557,
    hash: "0x4116a4fe564abd2a34ce9ee1cd6289db903d04bc7c48b8299ec7e3829f1a0c1c",
    from: "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B",
    to: "0x830BD73E4184ceF73443C15111a1DF14e495C706",
    value: "93450000000000000000",
    gas: 81811,
    nonce: 5045,
    blockHash: null,
    blockNumber: null,
    v: "0x0",
    r: "0xa050374956be803dd0505b073d98d1bbe19777ef3ee2660755fe76fe00024138",
    s: "0x251751fe707b1cfe69dd04cf6b36cbf4e9d131cbcaa47111520504ad2ff47d8c",
    input:
      "0x659dd2b40000000000000000000000000000000000000000000000000000000000000191",
    type: 2,
    maxFeePerGas: "11686027572",
    maxFeePerGasGwei: 11.7,
    maxPriorityFeePerGas: "1500000000",
    maxPriorityFeePerGasGwei: 1.5,
    transactionIndex: null,
    gasUsed: 25512,
    asset: "ETH",
    watchedAddress: "0x830bd73e4184cef73443c15111a1df14e495c706",
    direction: "incoming",
    counterparty: "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B",
    apiKey: "74c6ccdd-f616-49d5-8cfe-f40dde355061",
    internalTransactions: [
      {
        type: "DELEGATECALL",
        from: "0x830BD73E4184ceF73443C15111a1DF14e495C706",
        to: "0xF15a943787014461d94da08aD4040f79Cd7c124e",
        input:
          "0x659dd2b40000000000000000000000000000000000000000000000000000000000000191",
        error: "execution reverted",
        gas: 52553,
        gasUsed: 18250,
        value: "0",
      },
    ],
    netBalanceChanges: [],
    simDetails: {
      blockNumber: 15297557,
      performanceProfile: { breakdown: [Array], e2eMs: 44 },
    },
    contractCall: {
      methodName: "createBid",
      params: { nounId: "401" },
      contractAddress: "0x830BD73E4184ceF73443C15111a1DF14e495C706",
      contractType: "customAbi",
    },
    dispatchTimestamp: "2022-08-07T21:14:51.585Z",
  },
  {
    status: "confirmed",
    system: "ethereum",
    network: "main",
    monitorId: "Geth_1_B_PROD",
    monitorVersion: "0.116.0",
    serverVersion: "0.143.0",
    timeStamp: "2022-08-07T21:15:05.876Z",
    timePending: "14565",
    blocksPending: 1,
    pendingTimeStamp: "2022-08-07T21:14:51.311Z",
    pendingBlockNumber: 15297557,
    hash: "0x4116a4fe564abd2a34ce9ee1cd6289db903d04bc7c48b8299ec7e3829f1a0c1c",
    from: "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B",
    to: "0x830BD73E4184ceF73443C15111a1DF14e495C706",
    value: "93450000000000000000",
    gas: 81811,
    nonce: 5045,
    blockHash:
      "0x3e815d932481555891d517c657cb97d5462fe59e10685e3ce79f7dc9fd5343de",
    blockNumber: 15297558,
    v: "0x0",
    r: "0xa050374956be803dd0505b073d98d1bbe19777ef3ee2660755fe76fe00024138",
    s: "0x251751fe707b1cfe69dd04cf6b36cbf4e9d131cbcaa47111520504ad2ff47d8c",
    input:
      "0x659dd2b40000000000000000000000000000000000000000000000000000000000000191",
    gasUsed: 66184,
    type: 2,
    maxFeePerGas: "11686027572",
    maxFeePerGasGwei: 11.7,
    maxPriorityFeePerGas: "1500000000",
    maxPriorityFeePerGasGwei: 1.5,
    baseFeePerGas: "8677022635",
    baseFeePerGasGwei: 8.68,
    transactionIndex: 252,
    asset: "ETH",
    blockTimeStamp: "2022-08-07T21:14:31.000Z",
    watchedAddress: "0x830bd73e4184cef73443c15111a1df14e495c706",
    direction: "incoming",
    counterparty: "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B",
    apiKey: "74c6ccdd-f616-49d5-8cfe-f40dde355061",
    contractCall: {
      methodName: "createBid",
      params: { nounId: "401" },
      contractAddress: "0x830BD73E4184ceF73443C15111a1DF14e495C706",
      contractType: "customAbi",
    },
    dispatchTimestamp: "2022-08-07T21:15:06.018Z",
  },
];

export async function blockNativeWebhook(req: Request, res: Response) {
  try {
    if (
      req.body?.status === "pending" &&
      req.body?.contractCall?.methodName === "createBid"
    ) {
      const fullBid = await getBidMetadata({
        returnValues: {
          nounId: req.body.contractCall.params.nounId,
          sender: req.body.from,
          value: req.body.value,
          extended: false,
        },
      });
      client.del(REDIS_CURRENT_AUCTION_KEY);
      const io = await sockets();
      io.emit("bid", {
        ...fullBid,
        pending: true,
      });
    }
  } catch (e) {
    log(e);
  }
  res.json({ success: true });
}
