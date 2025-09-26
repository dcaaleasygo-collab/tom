import { useEffect, useState } from 'react'
import '../Styles/Pages.css'

interface HeroBlock {
  blockType: 'hero'
  heading: string
  subheading: string
}


interface Media {
  id: string
  url: string
  filename: string
  alt: string
  mimeType: string
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

type BodyBlock = TextBlock | GifBlock | ImageBlock


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

type LayoutBlock = HeroBlock | ContentHeaderBlock | ContentBodyBlock

interface Page {
  title: string
  slug: string
  layout: LayoutBlock[]
}

export function Pages() {
  const [pages, setHeader] = useState<Page | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/pages')
      .then(res => res.json())
      .then(data => {
        if (data.docs && data.docs.length > 0) {
          setHeader(data.docs[0])
        }
      })
      .catch(err => console.error(err))
  }, [])

  if (!pages) return null
  return (
    <div className='body-container'>
      <div className='banner-Principal'>

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
            return (
              <section
                key={idx}
                className="content"
                style={{
                  backgroundImage: block.images
                    ? `linear-gradient(
                rgba(0, 11, 65, 0.84),   
                rgba(253, 37, 120, 0.95)  
              ), url(${block.images.url})`
                    : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '100vh',
                }}
              >
                <div className="Texto">
                  {block.body?.map((item) => {
                    if (item.blockType === 'text') {
                      return <p key={item.id}>{item.value}</p>
                    }
                    if (item.blockType === 'gif') {
                      return (
                        <img
                          key={item.id}
                          src={item.file.url}
                          alt={item.file.alt || item.file.filename}
                        />
                      )
                    }
                    return null
                  })}
                </div>
              </section>
            )
          }
          if (block.blockType === 'content_body') {
            return (
              <section key={idx} className="content-body">
                {
              }
              </section>
            )
          }
          return null
        })}

      </div>
    </div>
  )
}
