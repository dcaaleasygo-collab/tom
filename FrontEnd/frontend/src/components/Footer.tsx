// src/components/Footer.tsx
import { useEffect, useState } from 'react'
import '../Styles/Footer.css'

interface FooterSocial {
  icon: string
  url: string
}

interface FooterGlobal {
  logo: { url: string }
  address: string
  phone: string
  privacyPolicy: { label: string; url: string }
  socials: FooterSocial[]
}

export function Footer() {
  const [footer, setFooter] = useState<FooterGlobal | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/globals/footer')
      .then(res => res.json())
      .then(data => setFooter(data))
      .catch(err => console.error(err))
  }, [])

  if (!footer) return null

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* Marca y logo */}
        <div className="footer-brand">
          <a href="https://toponmind.com/inicio/">
            <img
              src={footer.logo.url}
              alt="Top On Mind Logo"
            />
          </a>
          <p>© {new Date().getFullYear()} Top On Mind. Todos los derechos reservados.</p>
        </div>

        {/* Info principal */}
        <div className="footer-links">
          <a
            href="https://www.google.com/maps/place/Edificio+Etisa/@14.6006564,-90.5188321,19z/data=!3m1!4b1!4m5!3m4!1s0x8589a3a7e56081cb:0x373f138524ec140e!8m2!3d14.6006551!4d-90.5182849?shorturl=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {footer.address}
          </a>
          <a href={`tel:${footer.phone}`}>{footer.phone}</a>
          <a href={footer.privacyPolicy.url}>{footer.privacyPolicy.label}</a>
        </div>

        {/* Redes sociales */}
        <div className="footer-social">
          {footer.socials.map((item, idx) => (
            <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer">
              <i className={`icon-${item.icon}`}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
