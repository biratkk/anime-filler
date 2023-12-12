import {
  getAllAnimes,
  initAllAnime,
  retrieveAnimeFillersFor,
} from "../../../helpers/scraper/AnimeList";
import { NextApiRequest, NextApiResponse } from "next";

// export const runtime = "edge"; // 'nodejs' is the default

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initAllAnime();
  const animes = getAllAnimes();
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const animeName = url.searchParams.get("name");
  if(animeName){
    try{
      res.status(200).json(Array.from(await retrieveAnimeFillersFor(animeName)))
    }
    catch(e){
      res.status(500).json(e);
    }
  }
  else{
    res.status(200).json(animes);
  }
}
