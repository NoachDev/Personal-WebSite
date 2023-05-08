import Image from "next/image"
import React, { Component, ReactNode } from "react"

import info from "../public/info.svg"
import buy from "../public/buy.svg"
import close from "../public/close.svg"

import { HomeBrand } from "../styles/home/page"
import { ContainerCard, Glass } from "../styles/home/card"

import Link from "next/link"

import toggle from "../public/toggle.svg"

export class BrandPages extends Component<{}, { opcity : number}>{
  constructor(props){
    super(props)

    this.state = {
      opcity : 0
    }

    this.showContent = this.showContent.bind(this)

  }

  showContent(){
    this.setState({opcity : this.state.opcity ? 0 : 1})
  }

  render(): ReactNode {
    
    return(
      <HomeBrand opacity={this.state.opcity} onClick={this.showContent}>
        <Image id="toggle" src={toggle} alt="toggle"/>

        <div id="brand" className="showContent">
          <Link href={"/chats"} style={{color : "white", textDecoration : "none"}}>
            Chats
          </Link>
          <Link href={"/proposal"} style={{color : "white", textDecoration : "none"}}>
            Proposals
          </Link>
        </div>
        
      </HomeBrand>
    )
  }
}

export class Card extends Component<{openData : any, image : string, index : number}>{

  render(): ReactNode {
    
    return(
      <ContainerCard onClick={x => this.props.openData(this.props.index)}>
        
        <Image src={info} id="info" alt=""/>
        <Image src={this.props.image} width={1920} height={1080} id="drawing" alt="" />
        
      </ContainerCard>
    )
  }
}

export class DataCard extends Component<{login : any, buy? : boolean, orientation? : "vertical" | ""}, {visibility: string, image : string, name : string, content : string, class : string}>{
  static defaultProps = {
    buy : true,
  }

  constructor(props : any){
    super(props)

    this.state= {
      visibility : "hidden",
      image : null,
      name : "",
      content : "",
      class : this.props.orientation ?? ""
    }

    this.openCloseMe = this.openCloseMe.bind(this)
    this.loadData = this.loadData.bind(this)
    this.hiddenMySelf = this.hiddenMySelf.bind(this)
    this.showMySelf = this.showMySelf.bind(this)

  }

  componentDidMount(){
    console.log("here mount");

    if (window.innerWidth <= 512){
      this.setState(prev => { return {...prev, class : "vertical"}})
      
    }
  }

  hiddenMySelf(){
    this.setState(prev => { return {...prev, visibility : "hidden"}})
  }

  showMySelf(){
    this.setState(prev => { return {...prev, visibility : "visible"}})
  }

  openCloseMe(){
    if (this.state.visibility == "hidden"){
      this.showMySelf()
      return
    }

    this.hiddenMySelf()

  }

  loadData(data : any){
    const newContents = {
      image : data.src,
      name : data.name,
      content : data.content
    } 

    this.setState(prev => { return {...prev, ...newContents}})
  }

  render(): ReactNode {
    return(
      <Glass id="DataCard" view={this.state.visibility} className={this.state.class}>
        {this.state.image ? <Image src={this.state.image} width = {1920} height = {1080} alt={""} id="image"/> : <div id="image"/> }

        <div id="right">
          <p id={"name"}>{this.state.name}</p>

          <label id="data">{this.state.content}</label>

          {
            !this.props.buy ? null : 

              <div id="down" onClick={this.props.login}>
                <Image src={buy} alt="" id="iconBuy"/>

                <p id="textBuy">
                  Buy a similar
                </p>

              </div>
          }

          <Image src={close} alt="" id="close" onClick={this.hiddenMySelf}/>

        </div>

      </Glass>
    )
  }
} 