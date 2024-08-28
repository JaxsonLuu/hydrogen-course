import {defer} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import groq from 'groq';
import {MODULES} from '~/data/sanity/modules';
import {
  VideoBackground,
  ImageWithText,
  BannerGrid,
  SelectedProducts,
  ParallaxBanner,
  AboutUs
} from '~/components/sanity';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  // const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {

  const sanityQuery = groq`*[_type == 'home'][0] {
    modules[] {
      ${MODULES}
    }
  }`;

  const [sanityData] = await Promise.all([
    context.sanity.client.fetch(sanityQuery),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    sanityData: sanityData,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
// function loadDeferredData({context}) {
//   const recommendedProducts = context.storefront
//     .query(RECOMMENDED_PRODUCTS_QUERY)
//     .catch((error) => {
//       // Log query errors, but don't throw them so the page can still render
//       console.error(error);
//       return null;
//     });

//   return {
//     recommendedProducts,
//   };
// }

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  // console.log(data.sanityData);
  return (
    <div className="home">
      <ModuleSection modules={data?.sanityData?.modules} />
    </div>
  );
}

function ModuleSection({modules}) {
  return(
    <>
      {modules.map((item) => {
        return <ModuleContent key={item._key} module={item} />
      })}
    </>
  )
}

function ModuleContent({module}) {
  switch (module._type) {
    case 'imageWithText':
      return <ImageWithText data={module} />;
    case 'videoBackground':
      return <VideoBackground data={module} />;
    case 'bannerGrid':
      return <BannerGrid data={module} />;
    case 'selectedProducts':
      return <SelectedProducts data={module} />;
    case 'parallaxBanner':
      return <ParallaxBanner data={module} />;
    case 'aboutUs':
      return <AboutUs data={module} />;
    default:
      return null;
  }
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
