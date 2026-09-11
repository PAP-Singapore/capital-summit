export interface Sponsor {
  name: string;
  logo: string;
  website?: string;
  height?: string;
  width?: string;
  id: string;
}

export interface ApiSponsor {
  customCss?: string;
  imageUrl: string;
  name: string;
  websiteUrl: string;
  id: string;
}

export type SponsorsResponse = Record<string, ApiSponsor[]>;

