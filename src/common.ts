export enum MessageCallType {
  GET_SIMPLIFIED,
}

export interface ExtensionMessage {
  type: 'spotify-lyrics-message';
  call: MessageCallType;
  data: any;
  id: number;
}

export const ExtMessageType = 'spotify-lyrics-message';
export const ExtReplyPrefix = 'spotify-lyrics-reply-';
