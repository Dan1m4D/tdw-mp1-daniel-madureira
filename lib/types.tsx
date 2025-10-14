import React from "react";
import { Document } from "@contentful/rich-text-types";

/** Basic image shape used across the app */
export interface Image {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

/** Props for cover image component */
export interface CoverImageProps {
  title: string;
  url: string;
  slug?: string;
}

/** Author information */
export interface Author {
  name: string;
  picture?: Image;
  bio?: string;
}

/** Post shape used by pages/components */
export interface Post {
  title: string;
  slug: string;
  date?: string;
  excerpt?: string;
  content?: string;
  coverImage?: Image;
  author?: Author;
  tags?: string[];
}

/** Props for Contentful image component — object shape: interface is fine, but this is small so `type` is ok too */
export interface ContentfulImageProps {
  src: string;
  width?: number;
  quality?: number;
  [key: string]: string | number | boolean | undefined; // For other props that might be passed
}

/** MDX/Markdown components map — use `type` because it's a mapped/alias shape */
export type MDXComponents = Record<
  string,
  React.ComponentType<Record<string, unknown>>
>;

export interface Content {
  json: Document;
  links: {
    assets: AssetLink;
  };
}

export interface AssetLink {
  block: Asset[];
}

export interface Asset {
  sys: {
    id: string;
  };
  url: string;
  description: string;
}
