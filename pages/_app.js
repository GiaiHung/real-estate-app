import { ChakraProvider } from '@chakra-ui/react'
import Router from 'next/router'
import NProgress from 'nprogress'
import '../styles/globals.css'

import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
    NProgress.configure({ showSpinner: false })

    Router.events.on('routeChangeStart', () => {
        NProgress.start()
    })

    Router.events.on('routeChangeComplete', () => {
        NProgress.done()
    })

    return (
        <>
            <ChakraProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </>
    )
}

export default MyApp
