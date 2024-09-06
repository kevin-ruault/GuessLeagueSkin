import { fetchApi, getSkins } from "./api";

export function getDetails(data) {
  let detailedChamps = [];
  let champId = 0;
  const champlist = Object.keys(data);

  champlist.forEach((element) => {
    let tempobj = {
      id: champId,
      slug: element,
      name: data[element].name,
      image: `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${element}.png`,
      splashart: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${element}_0.jpg`,
    };

    detailedChamps.push(tempobj);
    champId = champId + 1;
  });

  champId = 0;
  return detailedChamps;
}

export function getSkin(slug, name) {
  //console.log(getSkins(slug));
  //let selectedChamp = champSkins[Math.floor(Math.random() * champSkins.length)];
  //console.log(champSkins);
  //creer l'url du skin et le retourner
}

export function getRandomChamp(data) {
  let selectedChamp = data[Math.floor(Math.random() * data.length)];

  fetchApi(
    `https://ddragon.leagueoflegends.com/cdn/14.17.1/data/fr_FR/champion/${selectedChamp.slug}.json`
  )
    .then((json) => {
      let skins = json.data[selectedChamp.name].skins;
      console.log(skins);
      let newSplashart = skins[Math.floor(Math.random() * skins.length)];
      console.log(newSplashart);
      let str = newSplashart.id.substr(4);
      console.log(str);
      if (str[0] === "0") str = str.substr(1);
      selectedChamp.splashart = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedChamp.slug}_${str}.jpg`;
      return selectedChamp;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}
