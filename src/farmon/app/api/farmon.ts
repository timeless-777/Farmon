import { getFarmonData } from "../lib/getFarmon";

export default async function gatFarmonHandler(req: any, res: any) {
  const farmonData = await getFarmonData(1);
  res.status(200).json(farmonData);
}
