import type { Post } from "./types";

const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    ... on Author {
      name
      picture {
        url
      }
    }
  }
  excerpt
  content {
    json
  }
`;

type FetchGraphQLResponse = {
  data?: {
    postCollection?: {
      items?: Post[];
    };
  };
};

async function fetchGraphQL(
  query: string,
  preview = false,
): Promise<FetchGraphQLResponse> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    } as RequestInit,
  ).then((response) => response.json());
}

function extractPost(fetchResponse: FetchGraphQLResponse): Post | undefined {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: FetchGraphQLResponse): Post[] {
  if (!fetchResponse?.data?.postCollection?.items) {
    console.error("Failed to fetch posts from Contentful:", fetchResponse);
    return [];
  }
  return fetchResponse.data.postCollection.items ?? [];
}

export async function getPreviewPostBySlug(
  slug: string | null,
): Promise<Post | undefined> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<Post[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
): Promise<{ post: Post | undefined; morePosts: Post[] }> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  // Log helpful debug info when the single-post query returns nothing
  const foundPost = extractPost(entry);
  if (!foundPost) {
    console.warn(
      `[contentful] No post found for slug="${slug}" preview=${preview} - GraphQL response:`,
      entry,
    );
  }
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    post: foundPost,
    morePosts: extractPostEntries(entries),
  };
}
