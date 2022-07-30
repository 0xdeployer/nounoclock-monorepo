import "./env";
import "./database";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import bodyParser from "body-parser";
import { sockets } from "./sockets";

const app = express();
app.use(bodyParser.json());

const middleware = (req: Request, res: Response, next: NextFunction) => {
  // if (allowedOrigins.includes(req.headers.origin)) {
  res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  next();
  // } else {
  //   return res.status(401).send();
  // }
};
app.use(middleware);

app.use(router);
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log("The application is listening on port ", port);
});

sockets(server);

let options = {
  clientConfig: {
    keepalive: true,
    keepaliveInterval: 60000,
  },
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 25,
    onTimeout: false,
  },
};

// const provider = new Web3.providers.WebsocketProvider(
//   process.env.ETH_URI as string,
//   options
// );

// const web3 = new Web3(provider);

// export function getHttpProvider() {
//   return new Web3(
//     new Web3.providers.HttpProvider(process.env.HTTP_URI as string)
//   );
// }

// provider.on("connect", async () => {
//   try {
//     await checkForMissedEvents();
//   } catch (e: any) {
//     console.log(e.message);
//   }
//   await addListeners();
// });

// provider.on("error", endCallback);
// provider.on("end", endCallback);
