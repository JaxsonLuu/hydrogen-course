import {json} from '@shopify/remix-oxygen';
import {PRODUCT_CARD_FRAGMENT} from '~/data/shopify';

export async function loader({request, context}) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const id = searchParams.get('id') ?? '';
  const pageBy = 4;

  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      id,
      pageBy
    }
  })

  return json({collection});
}

const COLLECTION_QUERY = `#graphql
query CollectionDetails($id: ID! $pageBy: Int!){
  collection(id: $id) {
    title
    products(first: $pageBy) {
      nodes {
        ...ProductCard
      }
    }
  }
}
${PRODUCT_CARD_FRAGMENT}
`
