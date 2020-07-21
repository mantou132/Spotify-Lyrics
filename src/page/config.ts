import { isProd } from '../common/consts';

import config from './config.json';

async function getConfig() {
  if (isProd) {
    try {
      return (await fetch(
        'https://raw.githubusercontent.com/mantou132/Spotify-Lyrics/master/src/page/config.json',
      ).then(res => res.json())) as typeof config;
    } catch {
      return config;
    }
  } else {
    return config;
  }
}

export default getConfig();
