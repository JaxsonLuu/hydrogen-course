import {Link} from '@remix-run/react';

export function VideoBackground({data}) {
    const {
      url,
      title,
      height,
      link,
    } = data;
    return (
      <div className='relative h-96' style={{height: height}}>
        <video 
          autoPlay={true} 
          muted loop 
          playsInline
          className='absolute top-0 left-0 w-full h-full overflow-hidden object-cover'
        >
          <source src={url} type="video/mp4"></source>
        </video>
        <div className='absolute top-1/2 w-full text-center -translate-y-1/2'>
          {title && <h1 className='text-6xl font-bold mb-6'>{title}</h1>}
          {link && (
            <Link to={link.url} className="border border-2 border-white px-12 py-3 text-lg font-bold inline-block">
              {link.title}
            </Link>
          )}
        </div>
      </div>
    )
  }