import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div id="paper">
      <Header></Header>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
      ></Footer>
    </div>
  )
}

export default MyApp
