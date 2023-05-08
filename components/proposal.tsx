import Image from "next/image"
import send from "../public/send-blue.svg"

import { Component, ReactNode } from "react";
import { ContainerWrite, Subimit } from "../styles/proposal"

import {IoReturnDownBack, IoReturnDownForwardOutline} from "react-icons/io5"
import {GrBold, GrItalic, GrUnderline} from "react-icons/gr"

const fontsFamily = [
  "Arial",
  "Helvetica",
  "Gill Sans",
  "Lucida",
  "Helvetica Narrow",
  "Times",
  "Times New Roman",
  "Palatino",
  "Bookman",
  "New Century Schoolbook",
  "monospace",
  "Andale Mono",
  "Courier New",
  "Courier",
  "Lucidatypewriter",
  "Fixed",
  "Cursive",
  "Comic Sans, Comic Sans MS",
  "Zapf Chancery",
  "Coronetscript",
  "Florence",
  "Parkavenue",
  "Fantasy",
  "Impact",
  "Arnoldboecklin",
  "Oldtown",
  "Blippo",
  "Brushstroke"
]

export class Write extends Component<{subimit : any}>{
  componentDidMount(): void {
    document.fonts.forEach(x => console.log(x))
  }
  
  render(): ReactNode {
    return(
      <Subimit>
        
        <ContainerWrite>
          <div id="topBar">
            <IoReturnDownBack/>
            <IoReturnDownForwardOutline/>

            <select id="fontList">
              {
                fontsFamily.map((x, index) => <option key={index}>{x}</option>)
              }
            </select>

            <select id="fontSize">
              {
                Array.from(Array(12).keys()).map(x => <option key={x}>{x+9}</option>)
              }
            </select>

            <GrBold/>
            <GrItalic/>
            <GrUnderline/>
            
          </div>
    
          <textarea id="input" />

        </ContainerWrite>
        
        <div id="send" onClick={this.props.subimit}>
          <label> send the proposal</label>
          <Image src={send} alt = "image" style={{width : "auto", height: " 100%", marginLeft : "0.5em"}}/>
        </div>

      </Subimit>
      
    )
  }
} 