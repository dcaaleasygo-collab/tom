import { useEffect, useState } from 'react'
import '../Styles/Pages.css'



interface Pages {
  logo: { url: string }
  Title: string
  Slug: string
}

export function Pages() {
  const [pages, setHeader] = useState<Pages | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/globals/pages')
      .then(res => res.json())
      .then(data => setHeader(data))
      .catch(err => console.error(err))
  }, [])

  if (!pages) return null 

  return(
    <body className='body-container'>
        <div className='banner-Principal'>
            
            
               </div>
    <div >
  <h1>HOla</h1>
  </div>
    </body>
  )
}