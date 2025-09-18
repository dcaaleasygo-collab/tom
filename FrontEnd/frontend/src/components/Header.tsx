// src/components/Header.tsx
import { useEffect, useState } from 'react'
import '../Styles/Header.css'

interface MenuItem {
  label: string
  url: string
}

interface HeaderGlobal {
  logo: { url: string }
  menu: MenuItem[]
}

export function Header() {
  const [header, setHeader] = useState<HeaderGlobal | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/globals/header')
      .then(res => res.json())
      .then(data => setHeader(data))
      .catch(err => console.error(err))
  }, [])

  if (!header) return null 

  return (
    <header className="header-container">
      <div className="header-inner">
       <div className="header-logo">
  <a href="https://toponmind.com/inicio/">
    <img src={header.logo.url} alt="Log" />
  </a>
</div>


        <nav>
          <ul className="nav-menu">
            {header.menu.map((item, idx) => (
              <li key={idx}>
                <a href={item.url}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
