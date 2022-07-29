// Render out nav bar, footer and route the content

import React from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'

import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Realtor</title>
            </Head>
            <Box maxWidth="1280px" m="auto">
                <header>
                    <Navbar />
                </header>
                <main>{children}</main>
            </Box>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Layout
