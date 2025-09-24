import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import './Styles/Header.css'
import './Styles/Footer.css'
import { Pages } from "./components/Pages"

function App() {
  return (
    <div>
      <Header />
      <main>
      <Pages  />
      </main>
      <Footer />
    </div>
  )
}

export default App
