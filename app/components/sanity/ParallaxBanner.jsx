import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export function ParallaxBanner({data}) {
  const {
    title,
    content,
    height,
    image,
    link,
  } = data;

  return (
    <div
      className='relative overflow-hidden bg-cover bg-fixed bg-center bg-no-repeat'
      style={{
        backgroundImage: `${image ? `url(${image.url})` : 'none'}`,
        height: `${height ? height : 'auto'}`
      }}
    >
      <div className='absolute bg-black bg-opacity-30 top-0 left-0 w-full h-full flex justify-center items-center'>
        <div className='text-center text-2xl font-medium'>
          {title && (
            <h3 className='text-6xl font-bold mb-4'>{title}</h3>
          )}
          
          {content && (
            <p className='text-xl mb-5'>{content}</p>
          )}
          
          {link && (
            <p>
              <Link to={link?.url} className="border border-2 px-10 py-3 font-medium inline-block">
                {link.title}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}