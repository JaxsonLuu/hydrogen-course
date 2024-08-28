import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export function AboutUs({data}) {
  const {
    title,
    content,
    contentWidth,
    image,
    link
  } = data;

  return (
    <div className='relative'>
      <Image
        alt={image.altText ?? 'Banner'}
        data={image}
        sizes="(max-width: 32em) 100vw, 33vw"
        crop="center"
        loading={'lazy'}
      />
      <div className='
        absolute top-0 top-0 left-0 w-1/2 h-full p-20
        bg-black bg-opacity-60 flex items-center justify-end
        '
      >
        <div className='text-lg text-right' style={{maxWidth: contentWidth}}>
          {title && (
            <h3 className='text-6xl font-bold uppercase mb-6'>{title}</h3>
          )}
          {content && (
            <p className='mb-8'>{content}</p>
          )}
          {link && (
            <Link to={link?.url} className="border border-2 px-10 font-medium py-2 inline-block uppercase">
              {link?.title}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}