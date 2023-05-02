import Image from "next/image"
import React, { Component, ReactNode } from "react"
import styled from "styled-components"

import info from "../public/info.svg"
import buy from "../public/buy.svg"
import close from "../public/close.svg"

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

  #info{
    width             : 1.3em                   ;
    height            : 1.3em                   ;
    position          : absolute                ;
    margin-left       : 0.5em                   ;
    margin-top        : 0.5em                   ;
  }

  #drawing{
    width             : auto                    ;
    height            : auto                    ;
  }
  
`
const Glass = styled.div.attrs((props : {view : string}) => props)`
  background-image    : radial-gradient(
    farthest-corner at 100% 0%,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(0, 0, 0, 0.7)
  );

  backdrop-filter     : blur(3px)         ;

  width               : 70em              ;
  height              : 35em              ;
  
  position            : fixed             ;
  display             : flex              ;
  flex-direction      : row               ;

  visibility          : ${props => props.view}   ;

  top                 : 13%               ;
  left                : 0                 ; 
  right               : 0                 ;

  margin-left         : auto              ; 
  margin-right        : auto              ;

  border-radius       : 0.5em             ;

  overflow            : hidden            ;
  color               : rgb(210, 210, 210); 

  z-index             : 10                ;

  #name{
    margin-top        : 1.5em               ;
    align-self        : center            ;
    font-family       : Poiret One        ;
    font-size         : 30px              ;
  }

  #data{
    width             : 70%               ;
    align-self        : center            ;
    text-align        : center            ;
    line-height       : 2em               ;
    font-family       : Junge             ;

  }

  #image{
    width             : 60%               ;
    background        : black             ;
    height            : auto              ;
    border-radius     : 0em 1em 1em 0em   ;
    object-fit        : contain           ;

  }

  #right{
    width             : 40%               ;
    height            : auto              ;
    display           : flex              ;
    flex-direction    : column            ;

  }

  #down{
    display           : flex              ;
    flex-direction    : row               ;
    position          : absolute          ;
    right             : 3%                ;
    bottom            : 10%               ;
    gap               : 0.5em             ;
  }

  #iconBuy{
    width             : 2.3em             ;
    height            : 2.3em             ;
  }

  #textBuy{
    align-self        : center            ;
    justify-self      : center            ;
    text-align        : center            ;
    margin-top        : 0.6em             ;
    text-decoration   : underline         ;
    font-family       : Confortaa         ;
  }

  #close{
    position          : absolute          ;
    right             : 2%                ;
    top               : 2.5%              ;
    width             : 1em               ;
  }

`
export class Card extends Component<{openData : any, image : string}>{
  render(): ReactNode {
    console.log("my image", this.props.image)
    return(
      <Container onClick={x => this.props.openData(this.props.image)}>
        <Image src={info} id="info" alt=""/>
        <Image src={this.props.image} width={500} height={500} id="drawing" alt="" />
        
      </Container>
    )
  }
}

export class DataCard extends Component<any, {visibility: string}>{
  constructor(props){
    super(props)

    this.state= {
      visibility : "hidden"
    }
  }

  render(): ReactNode {
    return(
      <Glass view={this.state.visibility}>
        {this.props.image ? <Image src={this.props.image} width = {500} height = {500} alt={""} id="image"/> : <div id="image"/> }

        <div id="right">
          <p id={"name"}>
            Name of Drawing
          </p>

          <p id="data">
            This is a simple test for verify if 'dataCard' are working corretly, yours sizes are cheked:
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
          </p>

          <div id="down" onClick={this.props.toPage}>
            <Image src={buy} alt="" id="iconBuy"/>

            <p id="textBuy">
              Buy a similar
            </p>

          </div>

          <Image src={close} alt="" id="close" onClick={x => {
            this.setState(({visibility : "hidden"}))
          }}/>

        </div>

      </Glass>
    )
  }
} 