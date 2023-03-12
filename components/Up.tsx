import { Component, ReactNode } from "react"
import styled from "styled-components"

import Image from "next/image"
import iconl from "../public/iconLogo_250.jpg"

const Container = styled.div`
  width         : 9em     ;
  height        : 9em     ;

  border-syle   : solid   ;
  border-radius : 100%    ;
  
  display       : flex    ;
  margin-top    : 4em     ;

  justify-content : center ;
  align-items  : center;


  overflow      : hidden;

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

export class Bar_pdd extends Component<any>{
  render(): ReactNode {
    return(
      <></>
    )
  }
}