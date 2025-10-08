import { useState } from 'react'
import '../Styles/Pages.css'
interface MediaFile {
  url: string
}

interface Bloque {
  date?: string
  Title?: string
  value?: string
  url?: string
  file?: MediaFile
}

interface Boton {
  texto: string
  url?: string
}

interface BloqueGrupo {
  cards: Bloque[]
}

export interface TendenciasBlock {
  blockType: string
  titulo?: string
  botones?: Boton[]
  bloques?: BloqueGrupo[] 
}

export interface PayloadPages {
  layout: TendenciasBlock[]
}

export default function Tendencias({ pages }: { pages: PayloadPages }) {
  const [bloqueActivo, setBloqueActivo] = useState(0)

  const tendencias = pages.layout.find(
    (block) => block.blockType === 'Tendencias'
  )

  if (!tendencias) return null


  const bloqueActual = tendencias.bloques?.[bloqueActivo]?.cards || []

  return (
    <>
      <div className="Tendencias">
        <div className="Titulo">
          <h4>{tendencias.titulo}</h4>
        </div>
      </div>

      <div className="Lista">
        {tendencias.botones?.map((boton, i) => (
          <button
            key={i}
            onClick={() => setBloqueActivo(i)}
            className={bloqueActivo === i ? 'activo' : ''}
          >
            {boton.texto}
          </button>
        ))}
      </div>

      <div className="tendencias-container">
        {bloqueActual.map((bloque, i) => (
          <div key={i} className="tendencia-card">
            <img src={bloque.file?.url} alt={bloque.value || 'imagen'} />
            <div className="tendencia-card-content">
              <h5>{bloque.date}</h5>
              <h2>{bloque.Title}</h2>
              <p>{bloque.value}</p>
              <a href={bloque.url} target="_blank" rel="noopener noreferrer">
                Ver más
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}



