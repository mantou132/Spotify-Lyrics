import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Lyric, LyricsResponse } from './type';

admin.initializeApp();
const db = admin.firestore();

const COLLECTION = 'lyrics';

const corsHandler = (req: functions.https.Request, res: functions.Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).send();
    return true;
  } else {
    return false;
  }
};

const isValidRequest = (params: Lyric) => {
  return params?.user && params.name && params.artists && params.platform;
};

export const getLyric = functions.https.onRequest(
  async (req, res: functions.Response<LyricsResponse<any>>) => {
    if (corsHandler(req, res)) return;
    const params: Lyric = req.body;
    if (!isValidRequest(params)) {
      res.status(400).send({ message: 'Params error' });
      return;
    }
    const lyricsRef = db.collection(COLLECTION);
    const query = lyricsRef
      .where('name', '==', params.name)
      .where('artists', '==', params.artists)
      .where('platform', '==', params.platform);
    let snapshot = await query.where('user', '==', params.user).get();
    let doc = snapshot.docs[0];
    let data = doc?.data() as Lyric | undefined;
    if (snapshot.empty || (!data?.lyric && !data?.neteaseID)) {
      snapshot = await query.get();
      doc = snapshot.docs[0];
      data = doc?.data() as Lyric | undefined;
    }
    res.send({ data, message: 'OK' });
  },
);

export const setLyric = functions.https.onRequest(
  async (req, res: functions.Response<LyricsResponse<any>>) => {
    if (corsHandler(req, res)) return;
    const params: Lyric = req.body;
    if (!isValidRequest(params)) {
      return;
    }
    const lyricsRef = db.collection(COLLECTION);
    const query = lyricsRef
      .where('name', '==', params.name)
      .where('artists', '==', params.artists)
      .where('platform', '==', params.platform)
      .where('user', '==', params.user);
    const snapshot = await query.get();
    if (snapshot.empty) {
      lyricsRef.add(params);
    } else {
      snapshot.docs[0].ref.update(params);
    }
    res.send({ message: 'OK' });
  },
);

export const addLyrics = functions.https.onRequest(
  async (req, res: functions.Response<LyricsResponse<any>>) => {
    if (corsHandler(req, res)) return;
    const params: Lyric[] = req.body;
    if (!params?.some || params.some((e) => !isValidRequest(e))) {
      res.status(400).send({ message: 'Params error' });
      return;
    }

    const batch = db.batch();
    const lyricsRef = db.collection(COLLECTION);
    params.forEach((e) => lyricsRef.add(e));
    await batch.commit();
    res.send({ message: 'OK' });
  },
);
