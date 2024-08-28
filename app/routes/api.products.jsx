import {json} from '@shopify/remix-oxygen';
import {PRODUCT_CARD_FRAGMENT} from '~/data/shopify';

export async function loader({request, context}) {
  const sortKey = 'CREATED_AT';
  const first = 4;
  const reverse = true;

  const {products} = await context.storefront.query(PRODUCTS_QUERY, {
    variables: {
      first,
      sortKey,
      reverse
    }
  })

  return json({products});
}

const PRODUCTS_QUERY = `#graphql
query AllProducts($first: Int!, $sortKey: ProductSortKeys $reverse: Boolean){
  products(first: $first, sortKey: $sortKey, reverse: $reverse) {
    nodes {
      ...ProductCard
    }
  }
}
${PRODUCT_CARD_FRAGMENT}
`
