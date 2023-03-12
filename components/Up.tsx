import { Component, ReactNode, useEffect, useState } from "react"
import styled from "styled-components"

import Image from "next/image"
import iconl from "../public/iconLogo_250.jpg"

const Container = styled.div`
  width           : 9em      ;
  height          : 9em      ;

  border-syle     : solid    ;
  border-radius   : 100%     ;
  
  display         : flex     ;

  justify-content : center   ;
  align-items     : center   ;

  overflow        : hidden   ;

`

const BaseBar = styled.div`
  background    : gray       ;

  width         : 21em       ;
  height        : 1.4em      ;

  margin-top    : 2.5em      ;
  align-items   : center     ;

  display       : flex       ;
  flex-direction: row        ;

  border        : 0px solid  ;
  border-color  : gray       ;

  border-radius : 10em       ;

`
const ScrollingBar = styled.div.attrs((props: {elm: string}) => props)`
  background    : white      ;

  width         : 7em        ;
  height        : 1.3em      ;

  border        : 1px solid  ;
  border-color  : gray       ;

  position      : absolute   ;

  margin-left   : ${props => props.elm || "0em"}  ;

  border-radius : 10em       ;

  z-index       : 0          ;
`
const ElementBar = styled.p`
  width         : 7em        ;
  height        : 1.2em        ;

  margin-top    : auto       ;

  text-align    : center     ;
  text-justify  : center     ;

  z-index       : 1          ;

  font-family   : Poiret One;
`

export class Logo extends Component<any>{
  render(): ReactNode {
    return(
      <Container>
          <Image src={iconl} alt="" style={{width : "9em", height:"9em"}}></Image>
      </Container>
    )
  }
}

export class BarPdd extends Component<any>{
  render(): ReactNode {
    return(
      <BaseBar>
        <ScrollingBar elm={String(this.props.locage*7)+"em"} />
        <ElementBar onClick={x => this.props.setLocage(0)}>programs</ElementBar>
        <ElementBar onClick={x => this.props.setLocage(1)}>drawings</ElementBar>
        <ElementBar onClick={x => this.props.setLocage(2)}>desing</ElementBar>
      </BaseBar>
    )
  }
}