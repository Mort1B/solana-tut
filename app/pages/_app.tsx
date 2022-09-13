import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.json"

import { useEffect } from "react"
import SolWalletProvider from "../components/solWalletProvider"

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

  return (
    <SolWalletProvider>
        <Component {...pageProps} />
    </SolWalletProvider>)
}

export default MyApp
