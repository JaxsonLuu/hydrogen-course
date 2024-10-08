import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {createAdminClient} from '~/lib/adminClient';
import {createSanityLoader} from 'hydrogen-sanity';

/**
 * The context implementation is separate from server.ts
 * so that type can be extracted for AppLoadContext
 * @param {Request} request
 * @param {Env} env
 * @param {ExecutionContext} executionContext
 */
export async function createAppLoadContext(request, env, executionContext) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
    i18n: {language: 'EN', country: 'US'},
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  const {admin} = createAdminClient({
    storeDomain: env.PUBLIC_STORE_DOMAIN,
    privateAdminToken: env.PRIVATE_ADMIN_TOKEN,
    adminApiVersion: '2024-07'
  });

  const sanity = createSanityLoader({
    // Required, to cache responses
    cache,

    // Required:
    client: {
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      apiVersion: env.SANITY_API_VERSION || '2023-03-30',
      useCdn: process.env.NODE_ENV === 'production',
    }
  });

  return {
    ...hydrogenContext,
    admin,
    sanity,
    // declare additional Remix loader context
  };
}
