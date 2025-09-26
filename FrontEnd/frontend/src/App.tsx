import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import './Styles/Header.css'
import './Styles/Footer.css'
import './Styles/Pages.css'
import './App.css'
import { Pages } from "./components/Pages"

function App() {
  return (
    <div className="app-container">
      <Header />
        <Pages /> 
      <Footer />
    </div>
  )
}
export default App
