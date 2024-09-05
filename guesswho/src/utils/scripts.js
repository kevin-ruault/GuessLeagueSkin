export function getDetails(data) {
  let detailedChamps = [];
  let champId = 0;
  const champlist = Object.keys(data);

  champlist.forEach((element) => {
    let tempobj = {
      id: champId,
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

export function getRandomChamp(data) {
  return data[Math.floor(Math.random() * data.length)];
}

export function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}
