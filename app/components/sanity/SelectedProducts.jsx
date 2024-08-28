import {useMemo, useEffect} from 'react';
import {Link, useFetcher} from '@remix-run/react';
import {Money, Image} from '@shopify/hydrogen';

export function SelectedProducts({data}) {
  const {newProducts, productsInCollection} = data;

  if(newProducts === true) {
    return <NewProducts selectedProducts={data} />
  }
  if(productsInCollection === true) {
    return <ProductsInCollections selectedProducts={data} />
  }
}

function NewProducts({selectedProducts}) {
    const apiRoute = `/api/products`;
    const {load, data} = useFetcher();

    useEffect(() => {
        load(apiRoute);
    }, [load, apiRoute]);

    if(!data) {
        return<>loading</>;
    }

    return(
        <SelectedProductsContent data={selectedProducts} products={data.products.nodes} />
    )
}

function ProductsInCollections({selectedProducts}) {
    const pageBy = selectedProducts.limitItems;
    const id = selectedProducts.collection.store.gid;

    const queryString = useMemo(
        () => Object.entries({pageBy, id})
            .map(([key, value]) => (value ? `${key}=${value}` : null))
            .join('&'),
        [pageBy, id],
    );

    const apiRoute = `/api/collection?${queryString}`;
    const {load, data} = useFetcher();

    useEffect(() => {
        load(apiRoute);
    }, [load, apiRoute, queryString]);

    if(!data) {
        return<>loading</>;
    }

    return(
        <SelectedProductsContent data={selectedProducts} products={data.collection.products.nodes} />
    )
}

function SelectedProductsContent({data, products}) {
    return(
        <div className='py-40 text-center max-w-screen-2xl mx-auto px-8'>
            <h3 className='text-5xl font-bold mb-4'>{data.title}</h3>
            <p className='text-lg uppercase tracking-wider'>{data.description}</p>
            <div className='grid grid-cols-4 gap-4 mt-8'>
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    )
}

function ProductCard({product}) {
    const firstVariant = product?.variants?.nodes[0];
    const isDiscountedPrice = (parseInt(firstVariant?.compareAtPrice?.amount) > parseInt(firstVariant?.price?.amount));
    return(
        <Link
            to={`/products/${product.handle}`}
            className="border border-transparent hover:border-gray-400 p-4 rounded-md transition-all duration-500"
        >
            <span className="aspect-square overflow-hidden">
                <Image
                    alt={product.title}
                    data={firstVariant.image}
                    sizes="(max-width: 32em) 60vw, 33vw"
                    crop="center"
                    loading="lazy"
                    className="!aspect-square object-contain"
                />
            </span>
            <p className="my-4 uppercase text-xl font-medium tracking-wide">{product.title}</p>
            <p>
                <span className="w-6 h-0.5 bg-white inline-block">&nbsp;</span>
            </p>
            <div className='flex items-center justify-center gap-4'>
                {isDiscountedPrice && (
                    <Money data={firstVariant.compareAtPrice} className="line-through opacity-60" />
                )}
                <Money data={firstVariant.price} />
            </div>
        </Link>
    )
}