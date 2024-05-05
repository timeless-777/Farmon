/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { neynar } from "frog/hubs";
import { neynar as neynarHub } from "frog/hubs";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { getFarmonData } from "../../lib/getFarmon";

type FarmonState = {
  burger: number;
  water: number;
  clean: number;
  otherBurger: number;
  otherWater: number;
  otherClean: number;
};

const app = new Frog<{ State: FarmonState }>({
  assetsPath: "/",
  basePath: "/api",
  hub: neynarHub({ apiKey: "NEYNAR_FROG_FM" }),
  verify: process.env.NODE_ENV === "development" ? "silent" : true,
  headers: {
    "Cache-Control": "max-age=0",
  },
  initialState: {
    burger: 0,
    water: 0,
    clean: 0,
  },
});

app.frame("/", async (c) => {
  const { deriveState } = c;
  const farmonData = await getFarmonData(1);
  const state = deriveState((previousState: any) => {
    console.log(
      `farmonData: ${JSON.stringify(
        farmonData[0]
      )}, previousState: ${JSON.stringify(previousState)}`
    );
    if (farmonData[0].burgur && farmonData[0].burgur !== previousState.burger)
      previousState.burger = farmonData[0].burgur;
    if (farmonData[0].water && farmonData[0].water !== previousState.water) {
      previousState.water = farmonData[0].water;
    }
    if (farmonData[0].clean && farmonData[0].clean !== previousState.clean)
      previousState.clean = farmonData[0].clean;
  });
  return c.res({
    action: "/",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/farmon?burger=${state.burger}&water=${state.water}&clean=${state.clean}`,
    intents: [<Button>Owned Farmon Display</Button>],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
