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

export function Markdown({ content }: { content: Content }) {
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
