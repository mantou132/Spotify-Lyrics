interface Artist {
  name: string;
  alias: string[];
}

interface ArtistsResult {
  artists: Artist[];
}

interface TopArtistsResult {
  list: {
    artists: Artist[];
  };
}

type Area = 'c' | 'j' | 'k';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const config = JSON.parse(Deno.readTextFileSync('./src/page/config.json'));

async function fetchChineseSingerWithoutAlias(offset: number, toplist: boolean, area: Area) {
  const map = {
    c: { type: 1, area: 7 },
    j: { type: 4, area: 8 },
    k: { type: 3, area: 16 },
  };
  let artists: Artist[];
  if (toplist) {
    // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e6%89%8b%e6%a6%9c
    // type: 1 华语 4 日本 3 韩国
    const url = `${config.API_HOST}/toplist/artist?type=${map[area].type}`;
    const result: TopArtistsResult = await fetch(url).then(res => res.json());
    artists = result.list.artists;
  } else {
    // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e6%89%8b%e5%88%86%e7%b1%bb%e5%88%97%e8%a1%a8
    // area: 7 华语 8 日本 16 韩国
    const url = `${config.API_HOST}/artist/list?type=1&offset=${offset}&area=${map[area].area}`;
    const result: ArtistsResult = await fetch(url).then(res => res.json());
    artists = result.artists;
  }
  return artists.filter(artist => !artist.alias.length);
}

interface SpotifyArtists {
  items: { name: string }[];
}
interface SpotifySearchResult {
  error: any;
  artists: SpotifyArtists;
}
// https://developer.spotify.com/console/get-search-item/?q=tania%20bowra&type=artist&market=&limit=&offset=
async function fetchEnglishNameBySpotify(name: string) {
  const url = `https://api.spotify.com/v1/search?${new URLSearchParams({ q: name, type: 'artist' })}`;
  const authorization =
    'Bearer BQDjsnrlWs_WyvBKf4gQLQyht2MEigW-HtuBXihaC3FBUKdQduC8wTEjf7PbNJiyGWjZp8q12FH41YXNCT9EJn1ejnFFJPl9944oxxxijAbdgLOQdBRFqNGR3ymtrQQXxUUD37_3mpNkJO0-_mX1iWkzlxtmhAM';
  const { artists, error }: SpotifySearchResult = await fetch(url, {
    headers: {
      authorization,
    },
  }).then(res => res.json());
  if (error) throw new Error(JSON.stringify(error));
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

async function main({ area, test }: { area: Area; test: boolean }) {
  const enZhMap: Record<string, string> = {};
  const process = async (list: Artist[]) => {
    console.log('Top artists:', list.map(e => e.name).join());
    return await Promise.all(
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
  };

  await process(await fetchChineseSingerWithoutAlias(0, true, area));

  for (let i = 0; i < (test ? 1 : 10); i++) {
    let error = false;
    const list = await fetchChineseSingerWithoutAlias(i * 100, false, area);
    console.log(`Page ${i + 1} artist list:`, list.map(e => e.name).join());
    try {
      await process(list);
    } catch {
      error = true;
      console.log('Next loop start:', i);
    }
    if (error) break;
  }
  console.log(JSON.stringify(enZhMap, null, 2));
}

// Due to many network requests, manually modify the parameters to execute
main({ area: 'c', test: true });
