import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Node } from "@contentful/rich-text-types";

import type { Content, Asset } from "./types";

function RichTextAsset({
  id,
  assets,
}: {
  readonly id: string;
  readonly assets: Asset[] | undefined;
}) {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.description} />;
  }

  return null;
}

export function Markdown({ content }: { readonly content: Content | string }) {
  // If content is a string, return it as plain text or null
  if (typeof content === "string") {
    return <div>{content}</div>;
  }

  // If content is undefined or doesn't have json property, return null
  if (!content?.json) {
    return null;
  }

  return documentToReactComponents(content.json, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => (
        <RichTextAsset
          id={(node.data as { target: { sys: { id: string } } }).target.sys.id}
          assets={content.links.assets.block}
        />
      ),
    },
  });
}
