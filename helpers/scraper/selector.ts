import axios from "axios";
import { load } from "cheerio";

export default async function(link:string) {
  const res = await fetch(link);
  const data = await res.text();
  return load(data);
}