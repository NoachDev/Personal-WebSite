import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bg        : {primary : string, secundary : string, tertiary : string}
    fg        : string
    gapSize   : string[]
    sizes     : {[key in string] : string[]}
    devices   : {[key in string] : string}

  }
}