const apiToken = process.env.SUPABASE_API_KEY;

export const getFarmonData = async (tokenId: number) => {
  try {
    const response = await fetch(
      `https://unfahayrzmiptrcehemb.supabase.co/rest/v1/token?token_id=eq.${tokenId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: apiToken || '',
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );
    const data = await response.json();
    console.log(`tokenInfo: ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    console.error(`Error updating token_id ${tokenId}:`, error);
    return null; // エラーが発生した場合はnullを返すか、エラー処理をここで行う
  }
};


export const updateFarmonData = async (
  isAdd: boolean,
  tokenId: number,
  kind: string,
  tokenAmount: number
) => {
  console.log(`tokenId: ${tokenId}, kind: ${kind}, tokenAmount: ${tokenAmount}`)
  const data: any = await getFarmonData(tokenId);
  const currentData = data[0]
  console.log(`currentData: ${JSON.stringify(currentData)}`);
  let payload
  if (isAdd) {
    payload = {
      token_id: tokenId,
      burgur:
        kind === "BURGER"
          ? currentData.burgur + tokenAmount
          : currentData.burgur,
      water:
        kind === "WATER" ? currentData.water + tokenAmount : currentData.water,
      clean:
        kind === "CLEAN" ? currentData.clean + tokenAmount : currentData.clean,
    };
  } else {
    payload = {
      token_id: tokenId,
      burgur:
        kind === "BURGER"
          ? currentData.burgur - tokenAmount
          : currentData.burgur,
      water:
        kind === "WATER" ? currentData.water - tokenAmount : currentData.water,
      clean:
        kind === "CLEAN" ? currentData.clean - tokenAmount : currentData.clean,
    };
  }
  console.log(`payload: ${JSON.stringify(payload)}`);
  try {
    await fetch(
      `https://unfahayrzmiptrcehemb.supabase.co/rest/v1/token?token_id=eq.${payload.token_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: apiToken || "",
          Authorization: `Bearer ${apiToken}`,
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify(payload),
      }
    );
  } catch (error) {
    console.error(`Error updating token_id ${tokenId}:`, error);
    return null;
  }
};
