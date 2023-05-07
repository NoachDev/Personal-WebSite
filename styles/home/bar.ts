import styled from "styled-components"

export const BaseBar = styled.div`
  background    : white      ;

  width         : 30em       ;
  height        : 1.3em      ;

  margin-top    : 2em        ;
  align-items   : center     ;

  display       : flex       ;
  flex-direction: row        ;

  border        : 0px solid  ;
  border-color  : gray       ;

  border-radius : 10em       ;

  @media (max-width: ${props => props.theme.devices.mobile}) {
    width : 80%;
  }

`
export const ScrollingBar = styled.div.attrs((props: {elm: any}) => props)`
  background    : #95BEFE    ;

  width         : calc(10em - 2px)      ;
  height        : calc(1.3em - 2px)      ;

  border-left   : 1px solid  ;
  border-right  : 1px solid  ;
  border-color  : white      ;

  position      : absolute   ;

  border-radius : 10em       ;

  z-index       : 0          ;

  display       : flex       ;

  &.slide{

    transition  : 0.5s       ;
    margin-left : ${props => String(props.elm * 10)+"em"}  ;

    @media (max-width: ${props => props.theme.devices.mobile}) {
      margin-left : calc(80% / 3 * ${props => props.elm} ) ;
    }
  }

  @media (max-width: ${props => props.theme.devices.mobile}) {
    width : calc(80% / 3 - 2px);
  }

`
export const ElementBar = styled.label`
  width         : calc(100%/3)       ;
  height        : 100%      ;

  text-align    : center     ;
  text-justify  : center     ;

  z-index       : 1          ;

  font-family   : Poiret One;
`