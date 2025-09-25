import { useEffect, useState } from 'react'
import '../Styles/Pages.css'

interface bodyBLock{
  id: string,
  Text: string
}

interface HeroBlock {
  blockType: 'hero'
  heading: string
  subheading: string
}

interface Media {
  id: string
  url: string
  filename: string
  mimeType: string
}

interface ContentBlock {
  blockType: 'content'
  body: bodyBLock[]
  images?: Media
  gifs?: Media
}


type LayoutBlock = HeroBlock | ContentBlock

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
        switch (block.blockType) {
          case 'hero':
            return (
              <section key={idx} className="hero">
                <h1>{block.heading}</h1>
                <p>{block.subheading}</p>
              </section>
            )
          case 'content':
            return (
              <section
  key={idx}
  className="content"
  style={{
    backgroundImage: block.images ? `url(${block.images.url})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  }}>

              <div className='Texto'>
              {block.body?.map((item) => (
                <p key={item.id}>{item.Text}</p>
                ))}
              </div>
              {block.gifs && (
                <img src={block.gifs.url} alt={block.gifs.url} />
              )}
              </section>
            )
          default:
            return null
        }})}
    </div>
  </div>
)
}