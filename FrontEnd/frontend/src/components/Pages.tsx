import { useEffect, useState } from 'react'
import '../Styles/Pages.css'

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

type BodyBlock = TextBlock | GifBlock | ImageBlock | ImageCenterBlock

interface ContentHeaderBlock {
  blockType: 'content_header'
  body: BodyBlock[]
  images?: Media
}

interface ContentBodyBlock {
  blockType: 'content_body'
  body: BodyBlock[]
  images?: Media
}

interface ImageSectionBlock {
  blockType: 'image_section'
  position: 'top' | 'center' | 'bottom'
  body: { media: Media }[]
}

type LayoutBlock = HeroBlock | ContentHeaderBlock | ContentBodyBlock | ImageSectionBlock

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
      <div className="banner-Principal">
        {pages.layout.map((block, idx) => {
          if (block.blockType === 'hero') {
            return (
              <section key={idx} className="hero">
                <h1>{block.heading}</h1>
                <p>{block.subheading}</p>
              </section>
            )
          }

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

          if (block.blockType === 'content_body') {
            return <section key={idx} className="content-body"></section>
          }

          if (block.blockType === 'image_section') {
            return (
              <section key={idx} className={`image-section ${block.position}`}>
                {block.body.map((item, i) => (
                  <img
                    key={i}
                    src={item.media.url}
                    alt={item.media.alt || item.media.filename}
                    className={item.media.size || 'medium'}
                  />
                ))}
              </section>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
