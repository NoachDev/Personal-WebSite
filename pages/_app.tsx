import { createGlobalStyle, ThemeProvider} from 'styled-components'
import React, {createContext} from 'react'
import Head from 'next/head'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Poiret One;
    src: url('/fonts/PoiretOne.ttf');
    font-style: normal;
  }

`
export const ctxTheme = createContext(null)

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [themeProfile, setTheme] =  React.useState("")

  return (
    <ctxTheme.Provider value = {[themeProfile, setTheme]}>
      <ThemeProvider theme={{}}>
        <Head>
          <title>Noach Developer</title>
        </Head>

        <GlobalStyle/>
        <Component {...pageProps} />
      </ThemeProvider>
    </ctxTheme.Provider>
  )
}