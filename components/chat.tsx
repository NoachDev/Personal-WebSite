import Image from "next/image";
import { Component, ReactNode } from "react";
import styled from "styled-components";

import user from "../public/user.svg"
import document_show from "../public/chats/document-show.svg"

import camera from "../public/chats/camera.svg"
import document_add from "../public/chats/document-add.svg"
import money from "../public/chats/money-recive.svg"
import bitcoin from "../public/chats/bitcoin.svg"

const ContactContainer = styled.div.attrs((props : {finished : boolean}) => props)`
  display : inline-flex;
  padding-left : 0.6em;
  margin-top : 0.6em;
  align-items : center;
  gap : 1em;

  #user{
    width : 2em;
    height : 2em;
    background : white;
    border-radius : 100%;
  }

  #info{
    display : grid;
    color: white;
    font-family : Junge;

    #state{
      width : 5px;
      height : 5px;
      background  : ${props => props.finished ? "#95fea1" : "#C54242"};
      border-radius : 100%;
      margin-left : 0.6em;
      align-self : center;
    }
  }

`
const PaperContainer = styled.div`
  width           : 4.5em                   ;
  height          : 4.5em                   ;

  background      : white                   ;

  display         : grid                    ;

  grid-template-columns  : repeat(2, 1fr)   ;
  grid-template-rows     : repeat(2, 1fr)    ;

  column-gap      : 1em                     ;
  row-gap         : 1em                     ;

  padding         : 0.7em                   ;

  position        : absolute                ;

  bottom          : 1.6em                   ;
  
  margin-bottom   : 0.7em                   ;
  
  border-radius   : 0.5em 0.5em 0em 0.5em   ;
  
  margin-left     : -4.3em                  ;
`
const Content = styled.div`

  display         : inline-table      ;

  position        : relative          ;

  max-width       : 20em              ;

  height          : auto              ;

  padding-inline  : 0.5em             ;

  padding-top     : 0.5em             ;
  padding-bottom  : 0.5em             ;

  margin-top      : 0.3em             ;
  
  color           : white             ;
  background      : #292d32           ;

  overflow        : hidden            ;
  
  &.left{
    border-radius : 0em 1em 1em 1em   ;
    margin-right  : auto              ;
  }
  
  &.right{
    background    : #7F38D3           ;
    border-radius : 1em 0em 1em 1em   ;
    margin-left   : auto              ;
  }
  
  .value{
    font-size     : 13px              ;
  }

`
export class MsgDocument extends Component<{file : any, key : number, setFile : any}>{

  render(): ReactNode {
    return (
      <Content className = "right" key={this.props.key} onClick={() => this.props.setFile(this.props.file)}>
        <div style={{display:"flex", alignItems:"center"}}>
          <Image src={document_show} style={{width : "5em", height:"auto"}} alt="SVG Repo"/>
          <label className = "value" style={{paddingRight:"1em"}}>{this.props.file.name}</label>
        </div>
      </Content>

    )
  }
}

export class MsgImage extends Component<{file : any, key : number, setFile : any}>{

  render(): ReactNode {
    const image = URL.createObjectURL(this.props.file)

    return (
      <Content className = "right" key={this.props.key}>
        <Image style={{objectFit : "contain", height:"auto"}} src={image} onClick={() => this.props.setFile([image, this.props.file])} width = {320} height = {320} alt = "image"/>
      </Content>

    )
  }
}

export class MsgText extends Component<{side : string, content : string, key : number}>{

  render(): ReactNode {
    return (
      <Content className = {this.props.side} key = {this.props.key}>
        <label className = "value" >{this.props.content}</label>
      </Content>
    )
  }
}

export class Contact extends Component<{name : string, lestMsg : string, finished : boolean, image : any, onClick : any}>{

  render(): ReactNode {
    return (
      <ContactContainer onClick={this.props.onClick} finished = {this.props.finished}>

        <Image src={this.props.image ?? user} alt="img" id="user"/>

        <div id="info">

          <label style={{display:"inline-flex"}}>
            {this.props.name}
            <div id="state"/>
          </label>

          <label style={{fontSize : "12px"}}>{this.props.lestMsg}</label>
          
        </div>

      </ContactContainer>
    )
  }
}

export class Paper extends Component<{msgs : Array<any>, setMsgs : any, setFile : any}, {visibility : boolean}>{
  constructor(props){
    super(props)

    this.state = {
      visibility : false
    }
  }

  showMySelf(){
    if (!this.state.visibility){
      return this.setState({visibility : true})
    }

    this.setState({visibility : false})
  }

  addFiles(imagesRef : HTMLInputElement, TypeMsg : any){
    const files : Array<any> = Array.from(imagesRef.files);

    if (files.length <= 4){
      const newElements = []

      files.forEach( file => newElements.push(
        <TypeMsg file={file} key={this.props.msgs.length} setFile={this.props.setFile}/>
      ))

      this.props.setMsgs(this.props.msgs.concat(newElements));
    }
    
    imagesRef["value"] = "";
    
    this.showMySelf()
  }

  render(): ReactNode {
    return(
      <PaperContainer id="paper" style={{visibility : this.state.visibility ? "visible" : "hidden"}}>

        <input type="file" onChange={e => this.addFiles(e.target, MsgImage)} accept="image/*" id="imageInput" multiple={true} style={{display:"none"}}></input>
        <Image src={camera} alt="SVG Repo" onClick={() => document.getElementById('imageInput').click()} style={{width:"100%", height:"100%"}}/>

        <input type="file" accept=".txt .doc .pdf" onChange={e => this.addFiles(e.target, MsgDocument)} id="fileInput" multiple={true} style={{display:"none"}}></input>
        <Image src={document_add} alt="SVG Repo" onClick={() => document.getElementById('fileInput').click()} style={{width:"100%", height:"100%"}}/>

        <Image src={bitcoin} alt="SVG Repo" style={{width:"110%", height:"110%"}}/>
        <Image src={money} alt="SVG Repo" style={{width:"100%", height:"100%"}}/> 

      </PaperContainer>
    )
  }
}
