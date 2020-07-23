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

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const config = JSON.parse(Deno.readTextFileSync('./src/page/config.json'));

async function fetchChineseSingerWithoutAlias(offset: number, toplist = false) {
  let artists: Artist[];
  if (toplist) {
    // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e6%89%8b%e6%a6%9c
    // type: 1 华语 4 日本
    const result: TopArtistsResult = await fetch(`${config.API_HOST}/toplist/artist?type=${1}`).then(res => res.json());
    artists = result.list.artists;
  } else {
    // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%ad%8c%e6%89%8b%e5%88%86%e7%b1%bb%e5%88%97%e8%a1%a8
    // area: 7 华语 8 日本
    const result: ArtistsResult = await fetch(
      `${config.API_HOST}/artist/list?type=1&area=${7}&offset=${offset}`,
    ).then(res => res.json());
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
  const { artists, error }: SpotifySearchResult = await fetch(
    `https://api.spotify.com/v1/search?${new URLSearchParams({ q: name, type: 'artist' })}`,
    {
      headers: {
        Authorization:
          'Bearer BQCI0DUAgop81GGwQziST4wnDPtjUIosVTItNyopkLWhF2h2i36wWLZU8-ySM92gAuDdLX5oeGymz1up_wgc_0oJn2oG7ez-ZjP9Fgkg3L7Ov7mcRN_kzdMkZeti7uxetsPgzy7BBopbGKjFymBzQxEkx2Zn_Hc',
      },
    },
  ).then(res => res.json());
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

async function main(full = true) {
  const enZhMap: Record<string, string> = {};
  const process = async (list: Artist[]) =>
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

  await process(await fetchChineseSingerWithoutAlias(0, true));

  if (full) {
    for (let i = 0; i < 10; i++) {
      let error = false;
      const list = await fetchChineseSingerWithoutAlias(i * 100);
      console.log(list.map(e => e.name).join());
      try {
        await process(list);
      } catch {
        error = true;
        console.log('Next loop start:', i);
      }
      if (error) break;
    }
  }
  console.log(JSON.stringify(enZhMap, null, 2));
}

main(false);
