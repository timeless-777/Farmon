import axios from "axios";

const apiToken = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

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
