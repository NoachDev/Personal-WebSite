import { useEffect, useRef, useState } from "react"
import {BrandPages, Card, DataCard, Logo} from "../components/home";
import homeImage from "../public/wp4511654-scenery-night-digital-art-wallpapers.jpg"

import { Down, Home, Up } from "../styles/home/page";
import { BaseBar, ElementBar, ScrollingBar} from "../styles/home/bar";

import { Login } from "../components/tools";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import {getData as apiHome} from "./api/home"

import { useRouter } from "next/router";
import Image from "next/image"
import { nodeInterface } from "../models/node";

let elements = {"ux/ui" : [], "drawings" : [], "programs" : ""}

export async function getServerSideProps(ctx){
  
  const locageName = ctx.query.l ?? "ux/ui"
  const cards = await apiHome(locageName)

  return{
    props : {
      val_locage : locageName,
      cards : {
        [locageName] : cards
      }
    }
  }
}

function HomePage({val_locage, cards}){
  const router = useRouter();

  const viewData = useRef(null);
  const loginForm = useRef(null);

  const supabaseClient = useSupabaseClient()
  const user = useUser()

  const [locage , setLocage] = useState(val_locage)
  const [cardsElments, setCards] = useState()

  elements[val_locage] = createCard(cards[val_locage])

  const getPos = () => {
    switch (locage){
      case "drawings":
        return 0

      case "ux/ui":
        return 1
      
      case "programs":
        return 2
    }
  }

  function createCard(cardsVal : {[key in number] : nodeInterface}) : Array<JSX.Element>{
    // return cardsVal.map((x, index) => <Card index={index} key={index} openData={openData} image={x.src}/>)
    return Object.entries(cardsVal).map(([key, value], index) => <Card index={index} key={index} openData={openData} image={value.src}/>)
  }

  function openData(index : number){
    viewData.current.openCloseMe()

    console.log(cards);
    console.log(locage);
    
    viewData.current.loadData(cards[locage][index])
  }

  function openLogin(){
    if (!user){
      loginForm.current.showMySelf()
      return
    }

    router.push("/proposal")
  }

  function closeCurrent(){
    if (loginForm.current.state.visibility != "hidden"){
      loginForm.current.hiddenMySelf()
    }
    else if (viewData.current.state.visibility != "hidden"){
      viewData.current.hiddenMySelf()
    }
  }

  useEffect(() => {
    setCards(elements[locage])
  }, [locage])

  useEffect(() => {
    const loadcollection = (collection : string) => fetch("/api/home", {method : "POST", body : JSON.stringify({collection : collection})})

    const listCollections = ["drawings", "ux/ui", "programs"];

    listCollections.forEach(x => {
      if (!(x in cards)){
        loadcollection(x).then( res => res.json()).then(data => {
          cards[x] = data
          elements[x] = createCard(cards[x])
        })
      }

    })
  }, [null])

  return (
    <Home>
      <Image onClick={closeCurrent} id={"homeImage"} src={homeImage} alt={"homeImage"} />
      <BrandPages/>

      <Up onClick={closeCurrent}>
        <Logo/>

        <BaseBar>
          <ScrollingBar elm={getPos()} className="slide" />
          <ElementBar onClick={x => setLocage("drawings")}>drawings</ElementBar>
          <ElementBar onClick={x => setLocage("ux/ui")}>ux/ui</ElementBar>
          <ElementBar onClick={x => setLocage("programs")}>programs</ElementBar>
        </BaseBar>

      </Up>

      <Down onClick={closeCurrent}>
        {cardsElments}
      </Down>

      <DataCard ref={viewData} login={openLogin} />

      <Login supabaseClient={supabaseClient} router={router} ref={loginForm} />

    </Home>
  )
}

export default HomePage