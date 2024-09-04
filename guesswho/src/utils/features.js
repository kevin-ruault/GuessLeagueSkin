export function getDetails(data) {
  let detailedChamps = [];
  const champlist = Object.keys(data);

  champlist.forEach((element) => {
    let tempobj = {
      name: data[element].name,
      image: `https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${element}.png`,
      splashart: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${element}_0.jpg`,
    };

    detailedChamps.push(tempobj);
  });

  return detailedChamps;
}

export function getRandomChamp(data) {
  const randomElement = data[Math.floor(Math.random() * data.length)];

  return randomElement;
}
