import Image from "next/image";

import { CSSProperties, Component, ReactNode } from "react";

import styled from "styled-components";

import close from "../public/close.svg"
import star_one  from "../public/chats/star-one.svg"
import { NextRouter } from "next/router";

import { FormSubimit, Line, Provider, Providers } from "../styles/login";
import { SocialAuth } from "@supabase/auth-ui-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { ThemeSupa } from "@supabase/auth-ui-shared";

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
export class LineElement extends Component<{name? : string, style? : CSSProperties, color? : string}>{
  render(): ReactNode {
    return (
      <Line style={this.props.style ?? {}}>

        <label id={"name"}>
          {this.props.name ?? ""}
        </label>
        
        <hr id={"line"} style={{background : this.props.color ?? "inherit", borderColor : this.props.color ?? "inherit"}}/>

      </Line>
    )
  }
}
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
      <Image src={star_one} alt="SVG Repo" style={{height : "108%", width : "100%", objectFit:"contain"}}/>
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
export class Login extends Component<{router : NextRouter, supabaseClient : SupabaseClient<any, "public", any>, view : boolean}, {visibility : string}>{
  static defaultProps = {
    view : false,
  }

  constructor(props){
    super(props)

    this.state = {
      visibility : this.props.view ? "visible" : "hidden",
    }

    this.hiddenMySelf = this.hiddenMySelf.bind(this)

  }

  showMySelf(){
    this.setState({visibility : "visible"})
  }

  hiddenMySelf(){
    this.setState({visibility : "hidden"})
  }
  
  handleSubimit(e, path : string){
    e.preventDefault()
    console.log("here subimit");
    

    const email : string = document.getElementById("email")["value"]
    const password : string = document.getElementById("passwd")["value"]

    if (email.length > 0 && password.length > 0){
      this.props.supabaseClient.rpc("check_user_by_email", {useremail : email}).then( x => {

        if (x.data){
          this.props.supabaseClient.auth.signInWithPassword({email, password}).then(u => {
            this.props.router.push(path)
          })
        }
        
        else{
  
        }
      })
      
    }

  }

  render(): ReactNode {
    const path = "/" + String(this.props.router.query.back ?? "proposal")
    
    return (
      <Providers view={this.state.visibility}>


        <Provider>
          <div className={"section"}>
            <LineElement style={{width : "18em", marginTop : "2em", marginInline: "auto"}} name={"LogIn / SigIn"}/>

            <SocialAuth
              redirectTo={path}
              appearance={{
                className : {button : "authButtom", container : "authContainer"},
                theme : ThemeSupa

              }}

              supabaseClient={this.props.supabaseClient}
              providers={['github']}
              socialLayout="horizontal"
            />

            <hr style={{width : "90%", background : "#303030" , border : "1px solid #303030"}}/>

            <div id="credentials">
              <div>
                <label>Email address</label>
                <input id={"email"}  type="email"/>
              </div>
              <div>
                <label>Your password</label>
                <input id={"passwd"} type="password"/>
              </div>

            </div>

            
          </div>
        </Provider>

        <FormSubimit onClick={e => this.handleSubimit(e, path)} >
          Continue
        </FormSubimit>

        <label id="forget">Forget your password?</label>

        <Image src={close} alt="" id="close" onClick={this.hiddenMySelf}/>

      </Providers>
    )
  }
}