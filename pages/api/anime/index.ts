import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  getAllAnimes,
  initAllAnime,
  retrieveAnimeFillersFor,
} from "../../../helpers/scraper/AnimeList";
import { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge"; // 'nodejs' is the default

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  await initAllAnime();
  const animes = getAllAnimes();
  return NextResponse.json(animes, {status: 200});
}
