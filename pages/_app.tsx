import { createGlobalStyle, ThemeProvider, DefaultTheme} from 'styled-components'
import React, {createContext, useState} from 'react'
import Head from 'next/head'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const GlobalStyle = createGlobalStyle`
  body{
    margin : 0em;
    background : ${props => props.theme.bg.primary};
  }

  @font-face {
    font-family: Poiret One;
    src: url('/fonts/PoiretOne.ttf');
    font-style: normal;
  }
  @font-face {
    font-family: Confortaa;
    src: url('/fonts/Comfortaa-Light.ttf');
    font-style: light;
  }

  @font-face {
    font-family: Junge;
    src: url('/fonts/Junge.ttf');
    font-style: normal;
  }

`
export const ctxTheme = createContext(null)

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [themeProfile, setTheme] =  React.useState("default")
  const [supabase] = useState(() => createBrowserSupabaseClient())
  
  const theme : {[key in string] : DefaultTheme} = {
    default : {
      bg : {
        primary : "#222222",
        secundary : "#2E2E2E",
        tertiary : "#95BEFE",
        
      },
      
      fg : "white",
      gapSize : [""],
      sizes : {default : ["15em", "12em"]},
      devices : {mobile : "512px"} 
    }
  }
  
  
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <ctxTheme.Provider value = {[themeProfile, setTheme]}>
        <ThemeProvider theme={theme[themeProfile]}>
          <Head>
            <title>Noach Developer</title>
          </Head>

          <GlobalStyle/>
          <Component {...pageProps} />
        </ThemeProvider>
      </ctxTheme.Provider>
    </SessionContextProvider>
  )
}