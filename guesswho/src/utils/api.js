export async function fetchChampions(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

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

//call api pour les info d'un perso
//https://ddragon.leagueoflegends.com/cdn/14.17.1/data/fr_FR/champion/Aatrox.json
