export async function fetchApi(apiUrl) {
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

export function getSkins(name) {
  fetchApi(
    `https://ddragon.leagueoflegends.com/cdn/14.17.1/data/fr_FR/champion/${name}.json`
  )
    .then((json) => {
      console.log(json.data[name].skins);
    })
    .catch((error) => {
      console.log(error);
    });
}

//call api pour les info d'un perso
//https://ddragon.leagueoflegends.com/cdn/14.17.1/data/fr_FR/champion/Aatrox.json
//https://ddragon.leagueoflegends.com/cdn/14.17.1/data/fr_FR/champion.json
