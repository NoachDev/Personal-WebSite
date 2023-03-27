import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

import React from 'react';

import { Contact, MsgText, Paper} from "../components/chat";
import { SideBars, ViwerBar } from "../components/tools";

import Image from "next/image"
import styled from "styled-components"

import paperclip from "../public/chats/paperclip.svg"
import logOut from "../public/chats/log-out.svg"

import menu from "../public/chats/menu.svg"
import menu_horizontal from "../public/chats/menu-horizontal.svg"

import close from "../public/close.svg"
import send from "../public/send.svg"

const Middle = styled.div`
  display           : flex                    ;
  flex-direction    : column                  ;

  width             : 100%                    ;
  height            : 100%                    ;

  margin-inline     : 0.7em                   ;

  #top{                 
    display         : flex                    ;
    flex-direction  : column                  ;

    height          : 100%                    ;
    width           : 100%                    ;

    overflow-y      : scroll                  ;

  }                 

  #bottom{                  
    display         : flex                    ;

    bottom          : 0px                     ;

    height          : 1.6em                   ;
    width           : 100%                    ;

    margin-top      : 1em                     ;
    margin-bottom   : 0.7em                   ;

    align-items     : center                  ;

    border-radius   : 1em                     ;
    overflow        : hidden                  ;

    background      : white                   ;

    overflow        : hidden                  ;

    #input{                 
      height        : 100%                    ;
      width         : 100%                    ;
      font-size     : 13px                    ;
      outline       : none                    ;
    }                 

    .icons{                 
      height        : 1.2em                   ;
      width         : 1.2em                   ;
    }     

  }
  
  #logOut{
    margin-left     : auto                    ;

    width           : 1.5em                   ;
    height          : 1.5em                   ;

  }

  .smartphone{
    @media (min-width : 576px){
      visibility  : hidden  ;
      display     : none    ;
    }
  }
`
function Chat(){
  const cnts =  {
    "test" : {
      finished : false, image : undefined, msgs : [{side : "right", content : "test a"} ]
    },
    "test abc" : {
      finished : true, image : undefined, msgs : [
        {side : "right", content : "test abcdfg"},
        {side : "left" , content : "test bcd"},
        {side : "right", content : "test ghif"},
        {side : "right", content : "test ab test at vq"},
        {side : "right", content : "test sjhjk sdhn wyjhb"},
      ]
    }
  }

  const admin = true;

  const router = useRouter();

  const paperRef = useRef()
  const ViwerRef = useRef()

  const msgUsers = loadMsgs()
  
  const [msgs, setMsgs ] = useState(msgUsers["0"]);
  const [contacts, setCnt] = useState(admin ? loadContacts(): []);

  function loadMsgs(){
    const msgs = {}

    Object.values(cnts).forEach( (cnt, indexU) => {
      msgs[indexU] = cnt.msgs.map((msg, index) => <MsgText key={index } side={msg.side} content={msg.content}/>)
    })

    return msgs

  }

  function loadContacts() : JSX.Element[]{
    const contacts = []

    const lastMsg = msgs => msgs.filter( m => m.side == "left" ).pop() ?? {content  : ""}

    Object.entries(cnts).forEach( ([name, cnt], index) => {
      contacts.push (
        <Contact onClick={() => setMsgs(msgUsers[index])} name={name} finished={cnt.finished} image={cnt.image} lestMsg={lastMsg(cnt.msgs).content}/>
      )
    })

    return contacts
  }

  function showContacts(){
    const element = document.getElementById("contacts")
    
    if (getComputedStyle(element).visibility == "visible"){
      return element.classList.remove("show")
    }
    
    element.classList.add("show")

  }

  function addMsg(){
    const val : string = document.getElementById("input")["value"];

    if (val.length != 0){
      setMsgs(msgs.concat([<MsgText side = "right" content = {val} key={msgs.length}/>]))
    }
    else{
      console.log("no msg");
    }

    return

  }

  function updateScrollTop(){
    var element = document.getElementById("top");
    element.scrollTop = element.scrollHeight;
  }

  useEffect(updateScrollTop)

  return (
    <div style={{height:"100vh", display:"flex"}}>

      <ViwerBar ref={ViwerRef}/>

      <Middle onClick={(ViwerRef.current ?? {})["hasNone"]}>

        <div style={{width:"100%", display:"flex", paddingTop:"0.2em"}}>

          <Image src={menu} alt="SVG Repo" className="smartphone" onClick={() => (ViwerRef.current ?? {})["showMySelf"]()}/>
          
          {admin ? <Image src={menu_horizontal} className="smartphone" onClick={showContacts} style={{marginLeft:"1em"}} alt="SVG Repo"/> : null}
          
          <Image src={logOut} alt="SVG Repo" id="logOut" onClick={() => router.push("/")}/>
          
        </div>
        
        <div id="top">
          {msgs}
        </div>

        <div id="bottom">

          <textarea id="input"/>

          <div style={{display:"flex"}}>
            <Paper ref = {paperRef} msgs={msgs} setMsgs={setMsgs} setFile={(file) => (ViwerRef.current ?? {})["setFile"](file)}/>

            <Image src={paperclip} alt="jtblabs" onClick={() => (paperRef.current ?? {})["showMySelf"]()} className="icons" style={{marginLeft: "0.3em"}}/>
            <Image src={send} alt="SVG Repo" onClick={addMsg} className="icons" style={{marginInline:"0.5em"}}/>
            
          </div>

        </div>

      </Middle>

      {
        admin ? <SideBars id="contacts" className="right" style={{overflowY:"scroll"}}>
          <Image src={close} className="closebar" alt="" onClick={showContacts}/>
          {contacts}
        </SideBars> : null
      }
      
    </div>
  )
}

export default Chat