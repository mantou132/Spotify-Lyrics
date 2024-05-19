declare module 'chinese-conv' {
  export const sify: (s: string) => string;
  export const tify: (s: string) => string;
}

// web api
interface FontMetadata {
  family: string;
  fullName: string;
  postscriptName: string;
}

interface Window {
  queryLocalFonts: () => Promise<FontMetadata[]>;
}
