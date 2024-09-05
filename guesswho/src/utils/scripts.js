import { getSkins } from "./api";

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

export function getSkin(slug) {
  const champSkins = getSkins(slug);
  console.log(champSkins);
}

export function getRandomChamp(data) {
  let selectedChamp = data[Math.floor(Math.random() * data.length)];
  getSkin(selectedChamp.slug);
  return selectedChamp;
}

/// TROUVER COMMENT PASSER LA LISTE DE SKINS /////////

export function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}
