import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export function BannerGrid({data}) {
  const {
    itemsPerRow,
    bannerItems,
  } = data;
  return (
    <div
      className='grid items-center'
      style={{gridTemplateColumns: `repeat(${itemsPerRow}, minmax(0, 1fr))`}}
    >
      {bannerItems.map((item) => (
        <Link 
          key={item._key} to={item.link.url}
          className="relative no-underline overflow-hidden group"
        >
          <Image
            alt={item.image.altText ?? 'Banner'}
            data={item.image}
            sizes="(max-width: 32em) 100vw, 33vw"
            crop="center"
            loading={'lazy'}
            className="transition-all duration-500 group-hover:scale-110"
          />
          <span className='absolute bg-black bg-opacity-20 top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center text-2xl font-bold'>
            {item.link.title}
          </span>
        </Link>
      ))}
    </div>
  )
}