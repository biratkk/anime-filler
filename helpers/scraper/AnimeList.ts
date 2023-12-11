import webSelector from "./selector";

const animeMap: Record<string, Anime> = {};
const linkToShows = "https://www.animefillerlist.com/shows";
const linkToShow = (showLink: string) => `https://www.animefillerlist.com${showLink}`;

export const initAllAnime = async (): Promise<void> => {
    if (Object.values(animeMap).length !== 0) return;
    const $ = await webSelector(linkToShows);
  $("#ShowList > div").map((i, el) => {
    $(el)
      .children()
      .map((i, el1) => {
        $(el1)
          .children()
          .map((i2, el2) => {
            const animeName =  $(el2).children("a").text().toLowerCase();
            const animeLink =  $(el2).children("a").attr("href") || "Link not found";
            const anime:Anime = {
              name:animeName,
              link: linkToShow(animeLink),
            }
            animeMap[animeName] = anime;
          });
      });
  });
};

export const retrieveAnimeFillersFor = async (anime:string) => {
    const selectedAnime = animeMap[anime];
    if(typeof selectedAnime === "undefined"){
        throw new Error("The anime you're looking for doesn't exit");
    }
    const animeLink = selectedAnime.link;
    const $ = await webSelector(animeLink);
    let unformattedStringListOfFillers =  $('div.filler > span.Episodes').text().split(",");
    let set = new Set<number>();
    unformattedStringListOfFillers.forEach((val:string) => {
        if(val.includes("-")){
            const [num1, num2] = val.split("-").map(Number);
            for(let i = num1; i <= num2 ; i++){
                set.add(i);
            }
        }
        else{
            set.add(parseInt(val));
        }
    });
    return set;
}

export const getAllAnimes = () => {
  return Object.values(animeMap);
}