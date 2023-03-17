import Image from "next/image";
import { Component, ReactNode } from "react";
import styled from "styled-components";

import login from "../public/acconts/login.png"
import or from "../public/acconts/or.png"
import close from "../public/close.svg"

const Providers = styled.form.attrs((props : {view : string}) => props)`
  width               : 30em              ;
  height              : auto              ;

  position            : fixed             ;
  background          : white             ;

  border-radius       : 5px               ;

  left                : 0                 ; 
  right               : 0                 ;

  margin-left         : auto              ; 
  margin-right        : auto              ;

  top                 : 7%                ;
  z-index             : 11                ;

  visibility          : ${props => props.view}   ;

  display             : flex              ;
  flex-direction      : column            ;

  gap                 : 1em               ;

  align-items         : center            ;

  #acconts{
    margin-top        : 2em               ;
    margin-bottom     : 2em               ;
    object-fit        : contain           ;
  }

  #subimit{
    width             : 70%               ;
    height            : 2.5em             ;
    margin-top        : 2em               ;
    margin-bottom     : 2.5em             ;
    border            : 0px solid         ;
    border-radius     : 2em               ;

  }

  #close{
    position          : absolute          ;
    right             : 2%                ;
    top               : 0.4%              ;
    width             : 0.7em             ;
  }

`

const ListProviders = styled.div`
  width             : 70%               ;
  display           : flex              ;
  flex-direction    : column            ;
  gap               : 1em               ;
`

const AnyProvider = styled.div`
  width             : 100%              ;
  height            : 1.7em             ;

  display           : inline-flex       ;
  border            : 1px solid black   ;
  border-radius     : 0.3em             ;

  overflow          : hidden            ;

  #name{
    width           : 82%               ;
    height          : 100%              ;

    text-align      : center            ;

    font-family     : junge             ;
    font-size       : 16px              ;
    
    background      : transparent       ;
    border          : 0px solid         ;

  }

  #icon{
    width           : 2em               ;
    background      : black             ;
    border-color    : black             ;
  }

  &:hover{
    background      : #5A956B           ;

    #name{
      color         : white             ;
    }
  }


`
class Login extends Component<any, {visibility : string}>{
  constructor(props){
    super(props)

    this.state = {
      visibility : "hidden",
    }

  }

  showSelf(){
    this.setState({visibility : "visible"})
  }
  
  handleSubimit(e, router){
    e.preventDefault()
    router.push("/proposal")
  }

  render(): ReactNode {
    return (
      <Providers onSubmit={(e) => this.handleSubimit(e, this.props.router)} view={this.state.visibility}>
        <Image src={login} alt="noach" id="acconts"/>

        <ListProviders>
          <AnyProvider>
            <div id="icon" />
            <button id="name"> by google </button>
          </AnyProvider>
          <AnyProvider>
            <div id="icon" />
            <button id="name"> by any other </button>
          </AnyProvider>
          <AnyProvider>
            <div id="icon" />
            <button id="name"> by any other </button>
          </AnyProvider>
          <AnyProvider>
            <div id="icon" />
            <button id="name"> by any other </button>
          </AnyProvider>
        </ListProviders>

        <Image src={or} alt="noach" id="acconts"/>

        <ListProviders>
          <input style={{height: "1.7em", borderRadius:"0.3em", border:"1px solid"}}/>
        </ListProviders>

        <button id="subimit" type="submit" >
          Continue
        </button>

        <Image src={close} alt="" id="close" onClick={x => {
            this.setState(({visibility : "hidden"}))
          }}/>

      </Providers>
    )
  }
}

export default Login