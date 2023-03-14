import { Component, ReactNode, useEffect, useState } from "react"
import styled from "styled-components"

import Image from "next/image"
import iconl from "../public/iconLogo_250.jpg"

const Container = styled.div`
  width           : 10em  ;
  height          : 10em  ;

  border-style    : solid    ;
  border-radius   : 100%     ;
  border-color    : #C54242  ;

  
  display         : flex     ;

  justify-content : center   ;
  align-items     : center   ;

  overflow        : hidden   ;

`
const BaseBar = styled.div`
  background    : white      ;

  width         : 30em       ;
  height        : 1.6em      ;

  margin-top    : 2.5em      ;
  align-items   : center     ;

  display       : flex       ;
  flex-direction: row        ;

  border        : 0px solid  ;
  border-color  : gray       ;

  border-radius : 10em       ;

`
const ScrollingBar = styled.div.attrs((props: {elm: string}) => props)`
  background    : #95BEFE    ;

  width         : 9.8em      ;
  height        : 1.4em      ;

  border        : 1px solid  ;
  border-color  : white      ;

  position      : absolute   ;

  border-radius : 10em       ;

  z-index       : 0          ;

  &.slide{

    transition  : 0.5s       ;
    margin-left : ${props => props.elm}  ;
    
  }
`
const ElementBar = styled.p`
  width         : 10em       ;
  height        : 1.4em      ;

  margin-top    : 1em        ;

  text-align    : center     ;
  text-justify  : center     ;

  z-index       : 1          ;

  font-family   : Poiret One;
`

export class Logo extends Component<any>{
  render(): ReactNode {
    return(
      <Container>
          <Image src={iconl} alt="" style={{width : "11.25em", height:"11.25em"}}></Image>
      </Container>
    )
  }
}

export class BarPdd extends Component<any>{
  render(): ReactNode {
    return(
      <BaseBar>
        <ScrollingBar elm={String(this.props.locage*10)+"em"} className="slide" />
        <ElementBar onClick={x => this.props.setLocage(0)}>programs</ElementBar>
        <ElementBar onClick={x => this.props.setLocage(1)}>drawings</ElementBar>
        <ElementBar onClick={x => this.props.setLocage(2)}>ux/ui</ElementBar>
      </BaseBar>
    )
  }
}