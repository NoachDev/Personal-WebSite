import Image from "next/image"
import { Component, ReactNode } from "react"
import styled from "styled-components"

import info from "../public/info.svg"

const Container = styled.div`
  width               : 18em                    ;
  height              : 12em                    ;
  
  border              : 1px solid gray          ;
  border-radius       : 1.5em 0em 1.5em 0em     ;
  border-color        : #222222                 ;
  border-right-color  : #6400ff                 ;
  border-bottom-color : #d100d3                 ;

  display             : flex                    ;

  padding-right       : 0.5em                   ;
  margin-bottom       : 5em                     ;
  
  overflow            : hidden                  ;
  
`

class Card extends Component<any>{
  render(): ReactNode {
    return(
      <Container>
        <Image src={info} style={{width : "1.3em", height : "1.3em", position : "absolute", marginLeft:"0.5em", marginTop:"0.5em", fill:"white"}} alt=""/>
        <Image src={this.props.image} style={{width : "auto", height : "auto"}} alt=""/>
        
      </Container>
    )
  }
}

export default Card