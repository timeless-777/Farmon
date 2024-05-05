import neynarClient from "./utils/neynarClient";
import { NeynarFrameCreationRequest } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { updateFarmonData } from "./updateFarmon"

function parseInput(input: string): {
  keyword: string;
  value: number;
  username: string;
} {
  // 入力から'$'を取り除く
  const cleanedInput = input.trim().substring(1);

  // スペースで分割して各部分を取得
  const parts = cleanedInput.split(" ");

  // キーワード、数値、ユーザー名をオブジェクトとして返す
  return {
    keyword: parts[0],
    value: parseInt(parts[1], 10),
    username: parts[2],
  };
}

// 使用例
const result = parseInput("$BURGER 10 @cardene");
console.log(result);

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    try {
      const body = await req.text();
      const hookData = JSON.parse(body);
      console.log(`hookData: ${JSON.stringify(hookData)}`);

      const result = parseInput(hookData.data.text);

      await updateFarmonData(true, 0, result.keyword, result.value);
      await updateFarmonData(false, 1, result.keyword, result.value);

      return new Response("ok");
    } catch (e: any) {
      return new Response(e.message, { status: 500 });
    }
  },
});

console.log(`Listening on localhost:${server.port}`);
