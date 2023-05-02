import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

import React from 'react';

import { Contact, Msg, Paper} from "../components/chat";
import { SideBars, ViwerBar } from "../components/tools";

import Image from "next/image"
import styled from "styled-components"

import paperclip from "../public/chats/paperclip.svg"
import logOut from "../public/chats/log-out.svg"

import menu from "../public/chats/menu.svg"
import menu_horizontal from "../public/chats/menu-horizontal.svg"

import close from "../public/close.svg"
import send from "../public/send.svg"

import getMsgs from "./api/chat";
import { userInterface } from "../models/users";
import { userCheck } from "../lib/auth";
import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

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

export async function getServerSideProps({req}){
  console.log("my req", req.method);
  
  const user = await userCheck(req)

  const props = user === null ? {
    redirect : {
      destination: '/login?back=chats',
      permanent: false,
    }
  } : {
    props : {
      cnts : await getMsgs(req, NextResponse.next()).then(x => x.json()),
      admin : user
    }
  }
  
  return props
}

function Chat({cnts, admin}){
  
  const router = useRouter();

  const paperRef = useRef()
  const ViwerRef = useRef()

  const msgUsers = loadMsgs()
  
  const ids = Object.values(cnts).map(x => x["_id"])

  const [currentId, setId] = useState(ids[0]) 

  const [msgs, setMsgs ] = useState(msgUsers["0"]);
  const [contacts, setCnt] = useState(admin ? loadContacts(): []);
  const lastMsg = useRef(null)

  const msgApi = new XMLHttpRequest()
  msgApi.open("POST", "/api/chat")

  const sendMsg = (type : string, val : any) => msgApi.send(JSON.stringify({type : type, content : val, _id : currentId}))

  msgApi.onreadystatechange = function(){
        
    if (this.readyState == 4 && this.status == 500){
      lastMsg.current.setFail()
    }

  }

  function loadMsgs() : {[key in string] : JSX.Element[]}{
    const msgs = {}

    Object.values(cnts).forEach( (cnt : userInterface, indexU) => {
      msgs[indexU] = cnt.msgs.map((msg, index) => <Msg key={index } typeElm={msg.type} side={msg.side} content={msg.content}/>)
    })
    

    return msgs

  }

  function loadContacts() : JSX.Element[]{
    const contacts = []

    const lastMsg = msgs => msgs.filter( m => m.side == "left" ).pop() ?? {content  : ""}

    Object.entries(cnts).forEach( (key, index) => {
      const name : string = key[0]
      const cnt : any = key[1]

      contacts.push (
        <Contact onClick={() => {setId(ids[index]); setMsgs(msgUsers[index])}} name={name} finished={cnt.finished} image={cnt.image == "nothing" ? undefined : cnt.image} lestMsg={lastMsg(cnt.msgs).content}/>
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
      
      sendMsg("text", val)
      setMsgs( prev => [...prev, <Msg ref = {lastMsg} side = "right" typeElm="text" content = {val} key={msgs.length}/>])

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
            <Paper ref = {paperRef} msgs={msgs} setMsgs={setMsgs} sendMsg={sendMsg} setFile={(file) => (ViwerRef.current ?? {})["setFile"](file)}/>

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