import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/globals.css'
import { Auth0Provider } from '@auth0/auth0-react'

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="dev-8u207j1w6z8wr0xc.us.auth0.com"
      clientId="gTQkAgx5RFTgiGo5g1HKfbRrCwcJWhgH"
      authorizationParams={{
        redirect_uri: 'https://academic-cms.vercel.app/',
      }}
    >
      <Header></Header>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
      ></Footer>
      {/* </div> */}
    </Auth0Provider>
  )
}

export default MyApp
