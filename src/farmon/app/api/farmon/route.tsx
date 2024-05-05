// @ts-nocheck
import { ImageResponse } from "next/og";
import { Box } from "../../lib/ui";

export const runtime = "edge";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const fixedSearchParams = searchParams.toString().replace(/&amp%3B/g, "&");
  const params = new URLSearchParams(fixedSearchParams);
  const burger = params.get("burger");
  const water = params.get("water");
  const clean = params.get("clean");

  const mochiyPopOneFontData = await fetch(
    new URL("../../../public/assets/fonts/MochiyPopOne.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const farmonImg = await fetch(
    new URL("../../../public/assets/image/hamburger.png", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <Box
        grow
        alignHorizontal="center"
        background="background"
        paddingTop="16"
        justifyContent="flex-start"
        display="flex"
        alignItems="center"
        flexDirection="column"
        textAlign="center"
        height="100%"
      >
        <div
          style={{
            color: "white",
            fontSize: 50,
            fontFamily: '"Mochiy Pop One"',
            textAlign: "center",
          }}
        >
          Hamburger
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            textAlign: "center",
            width: "100%",
            marginTop: 50,
          }}
        >
          <img
            src={farmonImg}
            width="300"
            alt="img2"
            style={{
              alignSelf: "center",
            }}
          />
        </div>
        <Box
          grow
          alignHorizontal="center"
          background="background"
          justifyContent="flex-end"
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 200,
              width: "100%",
            }}
          >
            <p
              style={{
                color: "white",
                fontFamily: '"AriBlk"',
                fontSize: 30,
              }}
            >
              $BURGUR
            </p>
            <p
              style={{
                color: "white",
                fontFamily: '"AriBlk"',
                fontSize: 30,
              }}
            >
              $WATER
            </p>
            <p
              style={{
                color: "white",
                fontFamily: '"AriBlk"',
                fontSize: 30,
              }}
            >
              $CLEAN
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 280,
              width: "100%",
            }}
          >
            <p
              style={{
                color: "white",
                fontFamily: '"AriBlk"',
                fontSize: 20,
              }}
            >
              {burger}&emsp;/&emsp;9
            </p>
            <p
              style={{
                color: "white",
                fontFamily: '"AriBlk"',
                fontSize: 20,
              }}
            >
              {water}&emsp;/&emsp;9
            </p>
            <p
              style={{
                color: "white",
                fontFamily: '"AriBlk"',
                fontSize: 20,
              }}
            >
              {clean}&emsp;/&emsp;9
            </p>
          </div>
        </Box>
      </Box>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Mochiy Pop One",
          data: mochiyPopOneFontData,
          style: "normal",
        },
      ],
    }
  );
};
