import Image from "next/image";

import { Component, ReactNode } from "react";

import styled from "styled-components";

import close from "../public/close.svg"
import star_one  from "../public/chats/star-one.svg"

export const SideBars = styled.div`
  width               : 21%                   ;
  height              : 100%                  ;

  margin-left         : auto                  ;

  background          : #2E2E2E               ;

  display             : flex                  ;
  flex-direction      : column                ;
  flex-shrink         : 0                     ;

  @media (max-width : 576px){
    
    visibility        : hidden                ;
    display           : none                  ;
    
    position          : absolute              ;
    z-index           : 12                    ;

    width             : 100%                  ;
  }
  
  .closebar{
    width             : 13px                  ;
    height            : 13px                  ;

    position          : absolute              ;
    z-index           : 10                    ;

    right             : 2%                    ;
    top               : 1%                    ;

    @media (min-width : 576px){
      visibility      : hidden                ;
      display         : none                  ;
    }

  }

  &.show{
    visibility        : visible               ;
    display           : flex                  ;
    flex-direction    : column                ;

  }

  &.right{
    right             : 0%                    ;
    width             : 16%                   ;

    @media (max-width : 576px){
      width           : 100%                  ;
    }

  }

`
const Viwer = styled.div`

  display : grid;
  width : 100%;
  height : 100%;

  #imageViwer{
    width             : 21%                   ;
    height            : 35%                   ;

    display           : flex                  ;

    background        : #222222               ;

    position          : absolute              ;

    @media (max-width : 576px){
      width           : 100%                  ;
    }

  }

  #textViwer{
    width             : 100%                  ;
    height            : 68%                   ;

    background        : white                 ;
    
    display           : flex                  ;
    flex-direction    : column                ;
    gap               : 1em                   ;

    margin-top        : auto                  ;

    border-radius     : 1em 1em 0em 0em       ;
    
    overflow          : hidden                ;

    z-index           : 1                     ;

    font-family       : Confortaa             ;
    font-size         : 15px                  ;

  }
`

export class ViwerBar extends Component<any, {imageViwer : any, textViwer : {name : string, content : any}, visibility : string, viwerChanged : boolean}>{
  constructor(props){
    super(props)

    this.state = {
      imageViwer : undefined,
      textViwer : {name : "", content : ""},
      visibility : "",
      viwerChanged : false,
    };

    this.showMySelf = this.showMySelf.bind(this);
    this.hasNone = this.hasNone.bind(this);
  }

  hasNone(){
    if (this.state.viwerChanged){
      this.setState({
        imageViwer : undefined,
        textViwer : {name : "", content : ""},
        visibility : "",
        viwerChanged : false,
      })
    }

  }

  hasImage(image){
    this.setState(prevState => ({...prevState, viwerChanged : true, imageViwer : image[0], textViwer : {name : image[1].name.split(".")[0], content : ""}}))

  }

  hasDocument(file){

    const reader = new FileReader();

    reader.onload = (e) => {
      
      const rawData = e.target.result;
      this.setState(prevState => ({...prevState, viwerChanged : true, imageViwer : undefined, textViwer : {name : file.name.split(".")[0], content : rawData}}))

      console.log(rawData);
    }

    reader.readAsText(file);
  }

  setFile(file){
    if (Array.isArray(file)){
      return this.hasImage(file)
    }
    
    return this.hasDocument(file)
    
  }

  showMySelf(){

    if (this.state.visibility != "show"){
      return this.setState(prevState => ({...prevState, visibility : "show"}))
    }
    
    this.setState(prevState => ({...prevState, visibility : ""}))

  }

  render(): ReactNode {
    const NothingHer = () => <div style={{height : this.state.imageViwer != undefined ? "80%" : "95%", width:"100%", display : "flex", flexDirection : "column", gap: "1em", alignItems : "center", justifyContent : "center", position : "relative", color : "white", fontFamily: "Junge", fontSize : "12px"}}>
      <Image src={star_one} alt="SVG Repo" style={{height : "28%", width : "100%", objectFit:"contain"}}/>
      <label>Nothing Are Her</label>
    </div>

    return (
      <SideBars id = "viewer" className={this.state.visibility}>

        <Image src={close} className="closebar" alt="" onClick={this.showMySelf}/>

        <Viwer>
          { this.state.imageViwer != undefined ? 
            <div id="imageViwer">
              <Image width={800} height={800} src={this.state.imageViwer} style={{height : "93%", width:"100%"}} alt="image"/> 

            </div>
          : 
            <div id={this.state.textViwer.name != "" ? "imageViwer" : ""}>
              <NothingHer/>
            </div>
          }

          {this.state.textViwer.name != "" ? <div id="textViwer">

            <label style={{alignSelf : "center", fontFamily : "Poiret One", fontSize : "19px", marginTop : "8px"}}>
              {this.state.textViwer.name}
            </label>

            <label style={{margin : "1em", overflowY : "scroll", alignSelf: "top"}}>
              {this.state.textViwer.content}
            </label>
            
          </div> : null}

        </Viwer>

      </SideBars>
    )
  }
}