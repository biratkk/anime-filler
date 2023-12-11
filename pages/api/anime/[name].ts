import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { initAllAnime, retrieveAnimeFillersFor } from "../../../helpers/scraper/AnimeList";

export const runtime = 'nodejs'; // 'nodejs' is the default

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name } = req.query;
    if(!name || Array.isArray(name)){
        throw Error("Please enter a name of anime");
    }
    await initAllAnime();
    const animeFillers = Array.from((await retrieveAnimeFillersFor(name)));
    res.status(200).json(animeFillers);
  }