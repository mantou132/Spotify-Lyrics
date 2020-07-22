interface Artist {
  name: string;
  alias: string[];
}

interface ArtistsResult {
  artists: Artist[];
}

const config = JSON.parse(Deno.readTextFileSync('./src/page/config.json'));

// https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e6%89%8b%e6%a6%9c
async function fetchChineseSingerWithoutAlias(offset: number) {
  const { artists }: ArtistsResult = await fetch(
    `${config.API_HOST}/artist/list?type=1&area=7&offset=${offset}`,
  ).then(res => res.json());
  return artists.filter(artist => !artist.alias.length);
}

interface SpotifyArtists {
  items: { name: string }[];
}
interface SpotifySearchResult {
  artists: SpotifyArtists;
}
// https://developer.spotify.com/console/get-search-item/?q=tania%20bowra&type=artist&market=&limit=&offset=
async function fetchEnglishNameBySpotify(name: string) {
  const { artists }: SpotifySearchResult = await fetch(
    `https://api.spotify.com/v1/search?${new URLSearchParams({ q: name, type: 'artist' })}`,
    {
      headers: {
        Authorization:
          'Bearer BQBNAOB_c4Whhg_P34Obk5eIvbAFE-pQkpedA1PLBW0tyydk-D_jzvfua0NczbUqZMVcMnPI-qjEuB_qVXW2w2I3QUPrPtfNNLQl0D2b_ude7EBtKJI1BacaO0CoQDdKjRQeXVh2-fevXLPwtpVpo3MlyrcOtA4',
      },
    },
  ).then(res => res.json());
  const enName = artists?.items[0]?.name?.toLowerCase() || '';
  const charCodeTotal = (s: string) => {
    let code = 0;
    for (let i = 0; i < s.length; i++) {
      code += s.charCodeAt(i);
    }
    return code;
  };
  if (charCodeTotal(enName) > enName.length * 128) return '';
  return enName === name ? '' : enName;
}

async function main() {
  const enZhMap: Record<string, string> = {};
  for (let i = 0; i < 10; i++) {
    await fetchChineseSingerWithoutAlias(i * 100).then(async list => {
      await Promise.all(
        list.map(async artist => {
          const enName = await fetchEnglishNameBySpotify(artist.name.toLowerCase());
          if (enName) {
            if (enZhMap[enName] && enZhMap[enName] !== artist.name) {
              console.warn({ [enName]: [enZhMap[enName], artist.name] });
            }
            enZhMap[enName] = artist.name;
          }
        }),
      );
    });
  }
  console.log(JSON.stringify(enZhMap, null, 2));
}

main();
