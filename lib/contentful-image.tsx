"use client";

import Image from "next/image";
import type { ContentfulImageProps } from "./types";


const contentfulLoader = ({ src, width, quality }: ContentfulImageProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage(props: Readonly<ContentfulImageProps>) {
  return (
    <Image
      alt={typeof props.alt === "string" ? props.alt : ""}
      loader={contentfulLoader}
      {...props}
    />
  );
}
