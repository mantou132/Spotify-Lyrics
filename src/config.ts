import config from './config.json';

// fallback
class Config {
  API_HOST = config.API_HOST;
  TRACK_INFO_SELECTOR = config.TRACK_INFO_SELECTOR;
  TRACK_NAME_SELECTOR = config.TRACK_NAME_SELECTOR;
  TRACK_ARTIST_SELECTOR = config.TRACK_ARTIST_SELECTOR;
}

async function getConfig() {
  try {
    return (await fetch('https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/src/config.json').then(res =>
      res.json(),
    )) as Config;
  } catch {
    return new Config();
  }
}

export default getConfig();
