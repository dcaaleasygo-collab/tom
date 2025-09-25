// src/components/Footer.tsx
import { useEffect, useState } from 'react'
import '../Styles/Footer.css'

interface FooterSection {
  content: string
  url: string
  logo?: { url: string }
}

interface FooterGlobal {
  logo: { url: string }
  address?: string
  phone?: string
  footerSections: FooterSection[]
  privacyPolicy?: { label: string; url: string }
  socials: FooterSection[]
}


export function Footer() {
  const [footer, setFooter] = useState<FooterGlobal | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/globals/footer')
      .then(res => res.json())
      .then(data => {
        console.log('Footer data:', data)
        setFooter(data)
      })
      .catch(err => console.error(err))
  }, [])

  if (!footer) return null

  return (
    <footer className="footer-container">
      <div className="footer-brand">
        <img src={footer.logo.url}/>
        <div className="footer-inner">
        </div>
      </div>

      <div className="footer-social">
       {footer.socials.map((item, idx) => (
          <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer">
            {item.logo && (
              <img src={item.logo.url} alt={item.content} />
            )}
          </a>
        ))} 
      </div>

      <div className="footer-separator"></div>
      <nav>
        <ul className="footer-nav">
          {footer.footerSections?.map((item, idx) => (
            <li key={idx}>
              <a href={item.url}>
                {item.logo && (
                  <img src={item.logo.url} alt={item.content} />
                )}
                {item.content}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
} 