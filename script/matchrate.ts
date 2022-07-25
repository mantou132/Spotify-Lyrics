import { Query, matchingLyrics, fetchLyric, parseLyrics } from '../src/page/lyrics';

interface MatchDetail {
  query: Query;
  noMatch: boolean;
  noLyrics: boolean;
}

interface PlayListData {
  name: string;
  detail: MatchDetail[];
  noMatch: number;
  noLyrics: number;
  success: number;
}

interface StorageData {
  [pathname: string]: PlayListData;
}

// TOP 50
const playlists = [
  {
    link: '/playlist/37i9dQZEVXbMDoHDwVN2tF',
    name: 'Global Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbMMy2roB9myp',
    name: 'Argentina Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJPcfkRz0wJ0',
    name: 'Australia Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKNHh6NIXu36',
    name: 'Austria Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJNSeeHswcKB',
    name: 'Belgium Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJqfMFK4d691',
    name: 'Bolivia Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbMXbN3EUUhlg',
    name: 'Brazil Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbNfM2w2mq1B8',
    name: 'Bulgaria Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKj23U1GF4IR',
    name: 'Canada Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbL0GavIqMTeb',
    name: 'Chile Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbOa2lmxNORXQ',
    name: 'Colombia Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbMZAjGMynsQX',
    name: 'Costa Rica Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbIP3c3fqVrJY',
    name: 'Czech Republic Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbL3J0k32lWnN',
    name: 'Denmark Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKAbrMR8uuf7',
    name: 'Dominican Republic Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJlM6nvL1nD1',
    name: 'Ecuador Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbLxoIml4MYkT',
    name: 'El Salvador Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbLesry2Qw2xS',
    name: 'Estonia Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbMxcczTSoGwZ',
    name: 'Finland Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbIPWwFssbupI',
    name: 'France Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJiZcmkrIHGU',
    name: 'Germany Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJqdarpmTJDL',
    name: 'Greece Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbLy5tBFyQvd4',
    name: 'Guatemala Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJp9wcIM9Eo5',
    name: 'Honduras Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbLwpL8TjsxOG',
    name: 'Hong Kong Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbNHwMxAkvmF8',
    name: 'Hungary Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKMzVsSGQ49S',
    name: 'Iceland Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbLZ52XmnySJg',
    name: 'India Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbObFQZ3JLcXt',
    name: 'Indonesia Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKM896FDX8L1',
    name: 'Ireland Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJ6IpvItkve3',
    name: 'Israel Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbIQnj7RRhdSX',
    name: 'Italy Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKXQ4mDTEBXq',
    name: 'Japan Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJWuzDrTxbKS',
    name: 'Latvia Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbMx56Rdq5lwc',
    name: 'Lithuania Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKGcyg6TFGx6',
    name: 'Luxembourg Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJlfUljuZExa',
    name: 'Malaysia Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbO3qyFxbkOE1',
    name: 'Mexico Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKCF6dqVpDkS',
    name: 'Netherlands Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbM8SIrkERIYl',
    name: 'New Zealand Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbISk8kxnzfCq',
    name: 'Nicaragua Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJvfa0Yxg7E7',
    name: 'Norway Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKypXHVwk1f0',
    name: 'Panama Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbNOUPGj7tW6T',
    name: 'Paraguay Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJfdy5b0KP7W',
    name: 'Peru Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbNBz9cRCSFkY',
    name: 'Philippines Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbN6itCcaL3Tt',
    name: 'Poland Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKyJS56d1pgi',
    name: 'Portugal Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbNZbJ6TZelCq',
    name: 'Romania Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbL8l7ra5vVdB',
    name: 'Russia Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbK4gjvS1FjPY',
    name: 'Singapore Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKIVTPX9a2Sb',
    name: 'Slovakia Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbMH2jvi6jvjk',
    name: 'South Africa Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbNFJfN1Vw8d9',
    name: 'Spain Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbLoATJ81JYXz',
    name: 'Sweden Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbJiyhoAPEfMK',
    name: 'Switzerland Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbMnZEatlMSiu',
    name: 'Taiwan Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbMnz8KIWsvf9',
    name: 'Thailand Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbIVYVBNw9D5K',
    name: 'Turkey Top 50',
  },
  {
    link: '/playlist/37i9dQZEVXbKkidEfWYRuD',
    name: 'Ukraine Top 50',
  },
];

const index = playlists.findIndex((playlist) => playlist.link === location.pathname);
const key = 'spotify.lyrics.test';

const listPromise = new Promise<Query[]>((res, rej) => {
  const fn = () => {
    const querys = [...document.querySelectorAll('.tracklist li')].map((item) => {
      return {
        name: item.querySelector('.tracklist-name')?.textContent || '',
        artists: item.querySelector('.TrackListRow__artists')?.textContent || '',
      };
    });
    if (!querys.length) {
      setTimeout(fn, 100);
    } else {
      res(querys);
    }
  };
  setTimeout(rej, 5000);
  fn();
});

window.addEventListener('load', async () => {
  console.clear();
  if (index === -1) {
    location.href = playlists[0].link;
  } else {
    console.log(`${index + 1}/${playlists.length} playlists matching`);
    const data: StorageData = JSON.parse(localStorage.getItem(key) || '{}');

    if (!data[location.pathname]) {
      data[location.pathname] = {
        name: playlists[index].name,
        success: 0,
        noLyrics: 0,
        noMatch: 0,
        detail: [],
      };

      const querys = await listPromise;

      // test
      querys.length = 1;

      await Promise.all(
        querys.map(async (query, i) => {
          console.log(`${i + 1}/${querys.length} matching: `, query);
          const { id } = await matchingLyrics(query);
          if (id === 0) {
            data[location.pathname].noMatch++;
            data[location.pathname].detail.push({ query, noMatch: true, noLyrics: false });
          } else {
            const lyrics = await parseLyrics(await fetchLyric(id));
            if (lyrics?.length) {
              data[location.pathname].success++;
              data[location.pathname].detail.push({ query, noMatch: false, noLyrics: false });
            } else {
              data[location.pathname].noLyrics++;
              data[location.pathname].detail.push({ query, noMatch: false, noLyrics: true });
            }
          }
        }),
      );
    }

    console.log(data);
    if (index < playlists.length - 1) {
      localStorage.setItem(key, JSON.stringify(data));
      // test
      // location.href = playlists[index + 1].link;
    }
  }
});
