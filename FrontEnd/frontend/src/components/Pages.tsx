import { useEffect, useState } from 'react'
import '../Styles/Pages.css'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CardBlock {
  blockType: 'card'
  value: string
  url: string
  file: Media
}

interface ServiciosBlock {
  blockType: 'Servicios'
  sliders: CardBlock[]
}

interface HeroBlock {
  blockType: 'hero'
  heading: string
  subheading: string
}

interface MediaSize {
  url: string
  width: number
  height: number
}

interface ButtonBlock {
  id: string
  blockType: 'buttonText'
  buttonText: string
}

interface Media {
  id: string
  url: string
  filename: string
  alt: string
  mimeType: string
  size?: 'small' | 'medium' | 'large' | 'custom250'
  sizes?: {
    small?: MediaSize
    medium?: MediaSize
    large?: MediaSize
    custom250?: MediaSize
  }
}

interface TextBlock {
  id: string
  blockType: 'text'
  value: string
}

interface GifBlock {
  id: string
  blockType: 'gif'
  file: Media
}

interface ImageBlock {
  id: string
  blockType: 'image'
  file: Media
}

interface ImageCenterBlock {
  id: string
  blockType: 'image_center'
  file: Media
  position?: 'left' | 'center' | 'right'
  order?: number
}

interface ModerTextBlock {
  id: string
  blockType: 'moderText'
  value: string
  position?: 'left' | 'center' | 'right'
}

interface RowBlock {
  id: string
  blockType: 'row'
  columns: (TextBlock | ImageBlock | ModerTextBlock)[]
}
interface BannerSecundarioBlock {
  blockType: 'banner_secundario'
  heading: string
  subheading: string
  images?: Media
}

type BodyBlock = TextBlock | GifBlock | ImageBlock | ImageCenterBlock | RowBlock | ButtonBlock | ModerTextBlock
  | BannerSecundarioBlock | ContentHeader2Block | ServiciosBlock

interface ContentHeaderBlock {
  blockType: 'content_header'
  body: BodyBlock[]
  images?: Media
  buttonText?: string
}

interface ContentHeader2Block {
  blockType: 'content_header_2'
  body: BodyBlock[]
  images?: Media
  buttonText?: string
}

interface ContentBodyBlock {
  blockType: 'content_Body'
  body: BodyBlock[]
  images?: Media
  Text: string
}

interface ImageSectionBlock {
  blockType: 'image_section'
  position: 'top' | 'center' | 'bottom'
  body: { media: Media }[]
}

type LayoutBlock = HeroBlock | ContentHeaderBlock | ContentBodyBlock | ImageSectionBlock | RowBlock | BannerSecundarioBlock | ContentHeader2Block | ServiciosBlock

interface Page {
  title: string
  slug: string
  layout: LayoutBlock[]
}

export function Pages() {
  const [pages, setPages] = useState<Page | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/pages')
      .then(res => res.json())
      .then(data => {
        if (data.docs && data.docs.length > 0) {
          setPages(data.docs[0])
        }
      })
      .catch(err => console.error(err))
  }, [])

  if (!pages) return null



  return (
    <div className="body-container">
      <div className='slider-container'>
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          className='Slider'
          slidesPerView={1}

          autoplay={{
            delay: 5000,
            disableOnInteraction: false,

          }}
          observer={true}
          observeParents={true}
          resizeObserver={true}
        >
          <SwiperSlide>
            <div className="banner-Principal">
              {pages.layout.map((block, idx) => {

                if (block.blockType === 'content_header') {
                  const bodyBlocks = block.body || []

                  const centeredImages = bodyBlocks
                    .filter(b => b.blockType === 'image_center')
                    .sort((a, b) => (a.order || 0) - (b.order || 0))

                  return (
                    <section
                      key={idx}
                      className="content"
                      style={{
                        backgroundImage: block.images
                          ? `linear-gradient(rgba(0,11,65,0.84), rgba(253,37,120,0.95)), url(${block.images.url})`
                          : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: '100vh',
                      }}
                    >
                      <div className="Texto">

                        {bodyBlocks.map(item => {


                          if (item.blockType === 'text') return <p key={item.id}>{item.value}</p>



                          if (item.blockType === 'gif' || item.blockType === 'image') {
                            const mimeType = item.file.mimeType || ''
                            const selectedSize = item.file.sizes?.custom250 ? 'custom250' : item.file.size || 'medium'
                            const imageUrl = mimeType.includes('gif')
                              ? item.file.url
                              : item.file.sizes?.[selectedSize]?.url || item.file.url
                            return <img key={item.id} src={imageUrl} alt={item.file.alt || item.file.filename} />
                          }

                          return null
                        })}

                        <div className='Subrayado'></div>

                        {bodyBlocks.map(item => {
                          if (item.blockType === 'buttonText') {
                            return (
                              <button key={item.id} type="button" className="boton">
                                {item.buttonText}
                              </button>
                            )
                          }
                          return null
                        })}
                      </div>

                      <div className='Decoracion'>

                        {bodyBlocks.map(item => {
                          if (item.blockType === 'moderText') {
                            let justify: 'flex-start' | 'center' | 'flex-end' = 'center'
                            if (item.position === 'left') justify = 'flex-start'
                            else if (item.position === 'right') justify = 'flex-end'

                            return (
                              <div
                                key={item.id}
                                style={{
                                  display: 'flex',
                                  justifyContent: justify,
                                  width: '100%',
                                  margin: '1rem 0'
                                }}
                              >
                                <p className="moder-text">{item.value}</p>
                              </div>
                            )
                          }
                          return null
                        })}

                        {centeredImages.map(img => {
                          const selectedSize = img.file.size || 'medium'
                          const imageUrl = img.file.sizes?.[selectedSize]?.url || img.file.url

                          let justify: 'flex-start' | 'center' | 'flex-end' = 'center'
                          if (img.position === 'left') justify = 'flex-start'
                          else if (img.position === 'right') justify = 'flex-end'

                          return (
                            <div
                              key={img.id}
                              style={{
                                display: 'flex',
                                justifyContent: justify,
                                margin: '1rem 0',
                                width: '100%',
                              }}
                            >
                              <img src={imageUrl} alt={img.file.alt || img.file.filename} />
                            </div>
                          )
                        })}
                      </div>
                    </section>
                  )
                }
                return null
              })}
            </div>
          </SwiperSlide>
          <SwiperSlide>

            <div className='banner-Secundario'>
              {pages.layout.map((block, idx) => {
                if (block.blockType === 'hero') {
                  return (
                    <section key={idx} className="hero">
                      <h1>{block.heading}</h1>
                      <p>{block.subheading}</p>
                    </section>
                  )
                }

                if (block.blockType === 'content_header_2') {
                  const bodyBlocks = block.body || []

                  const centeredImages = bodyBlocks
                    .filter(b => b.blockType === 'image_center')
                    .sort((a, b) => (a.order || 0) - (b.order || 0))

                  return (
                    <section
                      key={idx}
                      className="content"
                      style={{
                        backgroundImage: block.images
                          ? `linear-gradient(rgba(11, 37, 44, 0.77), rgba(0, 153, 255, 0.95)), url(${block.images.url})`
                          : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        minHeight: '100vh',
                      }}
                    >
                      <div className="Texto">

                        {bodyBlocks.map(item => {

                          if (item.blockType === 'text') return <p key={item.id}>{item.value}</p>

                          if (item.blockType === 'gif' || item.blockType === 'image') {
                            const mimeType = item.file.mimeType || ''
                            const selectedSize = item.file.sizes?.custom250 ? 'custom250' : item.file.size || 'medium'
                            const imageUrl = mimeType.includes('gif')
                              ? item.file.url
                              : item.file.sizes?.[selectedSize]?.url || item.file.url
                            return <img key={item.id} src={imageUrl} alt={item.file.alt || item.file.filename} />
                          }
                          if (item.blockType === 'row') {
                            return (
                              <div key={item.id} className="row">
                                {item.columns.map((col, cIdx) => {
                                  if (col.blockType === 'text') {
                                    return <p key={cIdx}>{col.value}</p>
                                  }
                                  if (col.blockType === 'image') {
                                    return <img key={cIdx} src={col.file.url} alt={col.file.alt} />
                                  }
                                  if (col.blockType === 'moderText') {
                                    return <p key={cIdx} className="moder-text">{col.value}</p>
                                  }
                                  return null
                                })}
                              </div>
                            )
                          }
                          return null
                        })}

                        <div className='Subrayado'></div>

                        {bodyBlocks.map(item => {
                          if (item.blockType === 'buttonText') {
                            return (
                              <button key={item.id} type="button" className="boton">
                                {item.buttonText}
                              </button>
                            )
                          }
                          return null
                        })}
                      </div>
                      <div className='Subrayado-2'></div>
                      {bodyBlocks.map(item => {
                        if (item.blockType === 'moderText') {
                          let justify: 'flex-start' | 'center' | 'flex-end' = 'center'
                          if (item.position === 'left') justify = 'flex-start'
                          else if (item.position === 'right') justify = 'flex-end'
                          return (
                            <div
                              key={item.id}
                              style={{
                                display: 'flex',
                                justifyContent: justify,
                                width: '100%',
                                margin: '1rem 0'
                              }}
                            >
                              <p className="moder-text">{item.value}</p>
                            </div>
                          )
                        }
                        return null
                      })}

                      {centeredImages.map(img => {
                        const selectedSize = img.file.size || 'medium'
                        const imageUrl = img.file.sizes?.[selectedSize]?.url || img.file.url

                        let justify: 'flex-start' | 'center' | 'flex-end' = 'center'
                        if (img.position === 'left') justify = 'flex-start'
                        else if (img.position === 'right') justify = 'flex-end'

                        return (
                          <div
                            key={img.id}
                            style={{
                              display: 'flex',
                              justifyContent: justify,
                              margin: '1rem 0',
                              width: '100%',
                            }}
                          >
                            <img src={imageUrl} alt={img.file.alt || img.file.filename} />
                          </div>
                        )
                      })}
                    </section>
                  )
                }
                return null
              })}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>



      <div className='parte-2'>

        {/* TÍTULOS / CONTENIDO BODY */}
        <div className='Titulo'>
          {pages.layout
            .filter(block => block.blockType === 'content_Body')
            .map((block, idx) => (
              <section key={idx} className='content'>
                {block.body?.map(item => {
                  if (item.blockType === 'text') return <p key={item.id}>{item.value}</p>
                  return null
                })}
              </section>
            ))}
        </div>

        {/* SERVICIOS CON SWIPER */}
        <div className='Servicios-Slider'>
          {pages.layout
            .filter((block): block is ServiciosBlock => block.blockType === 'Servicios' && block.sliders?.length > 0)
            .map((block, idx) => (
              <Swiper
                key={idx}
                slidesPerView={3}
                loop = {true}
                modules={[Navigation]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                navigation
              >
                {block.sliders.map((card, i) => (
                  <SwiperSlide key={i}>
                    <a className='url' href={card.url} target="_blank" rel="noopener noreferrer">
                      <div className="card">
                        <img src={card.file?.url} alt={card.file?.filename} />
                        <p>{card.value}</p>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            ))}
        </div>


      </div>




      <div className='formulario'>
        {pages.layout.map((block, idx) => {
          if (block.blockType === 'hero') {
            return (
              <section key={idx} className="hero">
                <h1>{block.heading}</h1>
                <p>{block.subheading}</p>
              </section>
            )
          }
          if (block.blockType === 'content_header_2') {
            return (
              <section
                key={idx}
                className="content"
                style={{
                  backgroundImage: block.images
                    ? `linear-gradient(rgba(0,11,65,0.84), rgba(253,37,120,0.95)), url(${block.images.url})`
                    : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '100vh',
                }}>
                <div className='formulario'>
                </div>
              </section>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}







