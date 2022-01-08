const cheerio = require('cheerio');
const axios = require('axios');

const linkToShows = "https://www.animefillerlist.com/shows"
const linkToAnime = (animeSubLink) => `https://www.animefillerlist.com/${animeSubLink}`

class AnimeFiller{
    constructor(){
        this.listOfAnimes = []
    }
    async #getSelectorFunctionFromURL(link){
        return await axios.get(link)
                    .then(response => {
                        if(response.status === 200){
                            const html = response.data;
                            return cheerio.load(html);
                        }
                    }, err => console.log(err))
    }
    /**
     * Initialises list of animes from MyAnimeFillers at the start
     */
    async initListOfAnimes(){
        // ' > ul > li:nth-child(7) > a'
        await this.#getSelectorFunctionFromURL(linkToShows)
        .then($ => {
            let listOfAnimes = [];
            $('#ShowList > div').map((i, el) => {
                $(el).children().map((i, el1) => {
                    $(el1).children().map((i2, el2) => {
                        listOfAnimes.push({
                            animeName:$(el2).children('a').text(),
                            animeLink:$(el2).children('a').attr('href')
                        })
                    })
                    return $(this);
                })
                return $(this)
                }
            );
            this.listOfAnimes = listOfAnimes;
        })
    }
    /**
     * 
     * @param {String} animeName exactly according to list of animes initialised 
     * @returns an array of all epiosde fillers
     */
    async getAnimeFillers(animeName){
        const getSubLinkOf = animeName => {
            let index;
            return [this.listOfAnimes
                    .filter((animeProps, ind) => {
                        if(animeProps.animeName === animeName){
                            index = ind;
                            return true;
                        }
                    })[0]
                    .animeLink, index];
        }
        const [subLink, index] = getSubLinkOf(animeName);
        if(!this.listOfAnimes[index].animeFillers){
            await this.#getSelectorFunctionFromURL(linkToAnime(subLink))
                .then($ => {
                    let unformatted = $('div.filler > span.Episodes').text().split(",");
                    let set = new Set();
                    unformatted.forEach((val) => {
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
                    this.listOfAnimes[index].animeFillers = Array.from(set).sort((a,b) => a - b);
                });
        }
        return this.listOfAnimes[index].animeFillers;
    }
    /**
     * 
     * @param {String} animeName exactly according to list of animes initialised 
     * @returns an array of all epiosde that are Manga Canon
     */
    async getAnimeMangaCanon(animeName){
        const getSubLinkOf = animeName => {
            let index;
            return [this.listOfAnimes
                    .filter((animeProps, ind) => {
                        if(animeProps.animeName === animeName){
                            index = ind;
                            return true;
                        }
                    })[0]
                    .animeLink, index];
        }
        const [subLink, index] = getSubLinkOf(animeName);
        if(!this.listOfAnimes[index].mangaCanon){
            await this.#getSelectorFunctionFromURL(linkToAnime(subLink))
                .then($ => {
                    let unformatted = $('div.manga_canon > span.Episodes').text().split(",");
                    let set = new Set();
                    unformatted.forEach((val) => {
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
                    this.listOfAnimes[index].mangaCanon = Array.from(set).sort((a,b) => a - b);
                });
        }
        return this.listOfAnimes[index].mangaCanon;
    }
    /**
     * 
     * @param {String} animeName exactly according to list of animes initialised 
     * @returns an array of all epiosdes that are mixed canon
     */
    async getAnimeMixedCanon(animeName){
        const getSubLinkOf = animeName => {
            let index;
            return [this.listOfAnimes
                    .filter((animeProps, ind) => {
                        if(animeProps.animeName === animeName){
                            index = ind;
                            return true;
                        }
                    })[0]
                    .animeLink, index];
        }
        const [subLink, index] = getSubLinkOf(animeName);
        if(!this.listOfAnimes[index].mixedCanon){
            await this.#getSelectorFunctionFromURL(linkToAnime(subLink))
                .then($ => {
                    let unformatted = $('div.mixed_canon/filler > span.Episodes').text().split(",");
                    let set = new Set();
                    unformatted.forEach((val) => {
                        if(val.includes("-")){
                            const [num1, num2] = val.split("-").map(Number);
                            for(let i = num1; i <= num2 ; i++){
                                set.add(i);
                            }
                        }
                        else{
                            set.add(parseInt(i));
                        }
                    });
                    this.listOfAnimes[index].mixedCanon = Array.from(set).sort((a,b) => a - b);
                });
        }
        return this.listOfAnimes[index].mixedCanon;
    }
    /**
     * 
     * @param {String} animeName exactly according to list of animes initialised 
     * @returns an array of all epiosde that are canon
     */
    async getAnimeCanon(animeName){
        const getSubLinkOf = animeName => {
            let index;
            return [this.listOfAnimes
                    .filter((animeProps, ind) => {
                        if(animeProps.animeName === animeName){
                            index = ind;
                            return true;
                        }
                    })[0]
                    .animeLink, index];
        }
        const [subLink, index] = getSubLinkOf(animeName);
        if(!this.listOfAnimes[index].animeCanon){
            await this.#getSelectorFunctionFromURL(linkToAnime(subLink))
                .then($ => {
                    let unformatted = $('div.anime_canon > span.Episodes').text().split(",");
                    let set = new Set();
                    unformatted.forEach((val) => {
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
                    this.listOfAnimes[index].animeCanon = Array.from(set).sort((a,b) => a - b);
                });
        }
        return this.listOfAnimes[index].animeCanon;
    }
}

module.exports = AnimeFiller