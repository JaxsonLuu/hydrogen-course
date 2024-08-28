import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export function ImageWithText({data}) {
  const {
    image,
    title,
    content,
    link,
    textAlign,
    imagePosition,
  } = data;
  return (
    <div className={`flex items-center bg-black text-white ${imagePosition === 'left' ? '' : 'flex-row-reverse'}`}>
      <div className='w-1/2'>
        <Image
          alt={image?.altText ?? 'banner image'}
          data={image}
          width={image.width}
          height={image.height}
        />
      </div>
      <div className='text-center w-1/2'>
        <h3 className='text-5xl font-bold'>{title}</h3>
        <p className='my-4'>
          {content}
        </p>
        <Link to={link?.url} className="border border-2 px-10 py-3 inline-block font-medium">
          {link?.title}
        </Link>
      </div>
    </div>
  )
}