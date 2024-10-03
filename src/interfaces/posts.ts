export interface Posts {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  title: Title;
  content: Content;
  excerpt: Excerpt;
  categories: Categories;
  featuredMedia: FeaturedMedia;
}

export interface Title {
  id: number;
  rendered: string;
}

export interface Content {
  id: number;
  rendered: string;
  protected: number;
}

export interface Excerpt {
  id: number;
  rendered: string;
  protected: number;
}

export interface Categories {
  id: number;
  name: string;
  slug: string;
}

export interface FeaturedMedia {
  id: number;
  title: string;
  caption: string;
  description?: string;
  width: number;
  height: number;
  fileSize: number;
  sourceUrl: string;
}
