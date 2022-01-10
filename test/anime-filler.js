const AnimeFiller = require("../src/anime-filler");
let animeFiller = new AnimeFiller();

async function main(){
    await animeFiller.initListOfAnimes();
    const source = await animeFiller.getAnimePictureSource('Bleach');
    console.log(source);
}

main();