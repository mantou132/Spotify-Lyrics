import config from './config.json';

// fallback
class Config {
  API_HOST = config.API_HOST;
  LYRICS_CONTAINER_SELECTOR = config.LYRICS_CONTAINER_SELECTOR;
  ALBUM_COVER_SELECTOR = config.ALBUM_COVER_SELECTOR;
  TRACK_INFO_SELECTOR = config.TRACK_INFO_SELECTOR;
  TRACK_NAME_SELECTOR = config.TRACK_NAME_SELECTOR;
  TRACK_ARTIST_SELECTOR = config.TRACK_ARTIST_SELECTOR;
  BTN_WRAPPER_SELECTOR = config.BTN_WRAPPER_SELECTOR;
}

async function getConfig() {
  if (process.env.NODE_ENV === 'production') {
    try {
      return (await fetch(
        'https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/src/common/config.json',
      ).then(res => res.json())) as Config;
    } catch {
      return new Config();
    }
  } else {
    return new Config();
  }
}

export default getConfig();
