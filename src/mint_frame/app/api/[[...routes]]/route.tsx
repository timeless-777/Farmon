/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { neynar } from "frog/middlewares";
import { neynar as neynarHub } from "frog/hubs";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import abi from "../../utils/Farmon.json";


const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  hub: neynarHub({ apiKey: "NEYNAR_FROG_FM" }),
  verify: process.env.NODE_ENV === "development" ? "silent" : true,
  headers: {
    "Cache-Control": "max-age=0",
  },
});

app
  .use(
    neynar({
      apiKey: "NEYNAR_FROG_FM",
      features: ["interactor"],
    })
  )
  .frame("/", async (c) => {
    return c.res({
      action: "/minted",
      image: "/assets/image/mint.png",
      intents: [
        <Button.Transaction target={`/mint`}>
          Mint
        </Button.Transaction>,
      ],
    });
  });

app.transaction("/mint", async (c) => {
  return c.contract({
    abi: abi.abi,
    chainId: "eip155:84532",
    functionName: "safeMint",
    to: "0xe577AFDB57c7D02c089D75F50f0999930A6f8ce6",
  });
});

app.frame("/minted", async (c) => {
  return c.res({
    image: "/assets/image/check.gif",
  });
});


devtools(app, { appFid: 227285, serveStatic });

export const GET = handle(app);
export const POST = handle(app);
