import { useEffect, useRef, useState } from "react"
import { Logo, BarPdd } from "../components/Up";
import {Card, DataCard} from "../components/cards";
import styled from "styled-components";

import Login from "../components/login";
import { useRouter } from "next/router";

const ContainerUp = styled.div`
  height          : 18em      ;
  width           : auto      ;

  padding-inline  : 10em      ;
  
  display         : flex      ;

  flex-direction  : column    ;
  justify-content : center    ;
  align-items     : center    ;

  border-bottom   : 1px solid ;

  background      : #2E2E2E   ;

`
const ContainerDown = styled.div`

  padding-inline  : 10%      ;
  padding-top     : 3em       ;
  
  position        : relative  ;
  display         : flex      ;

  flex-direction  : row       ;
  flex-wrap       : wrap      ;
  gap             : 5em       ;

  justify-content : center    ;


`
export async function getServerSideProps(context){

  return{
    props : {
      val_locage : context.query.l ?? "ux|ui",
      elements : {}
    }
  }
}

async function uploadCards(openData, locageName){
  const data : Object = await fetch("/api/home", {method : "GET"}).then(x => x.json())
  
  return Object.values(data).filter(x => x.locage == locageName).map(x => <Card openData={openData} image={x.src}/>)
}

function HomePage({val_locage, elements}){
  const [locage , setLocage] = useState(val_locage)
  const [cardsElments, setCards ] = useState([])
  const [image, setImage] = useState(undefined)
  
  const showData = useRef(null);
  const showLogin = useRef(null);

  const router = useRouter();

  function openData(image){
    if (showData.current.state.visibility == "hidden"){
      setImage(image);
      showData.current.setState(({visibility : "visible"}))
    }
    
  }

  function chatPage(){
    showLogin.current.showSelf()
  }

  useEffect(() => {
    console.log("in effect");
    
    if (locage in elements){
      return setCards( elements[locage])
    }

    console.log("to upload");
    
    uploadCards(openData, locage).then(x => {
      elements[locage] = x
      setCards(x)
      console.log("end upload");

    })

    }
  )

  return (
    <div style={{display : "flex", flexDirection: "column"}}>

      <ContainerUp>
        <Logo/>
        <BarPdd locage={locage} setLocage={setLocage}/>
      </ContainerUp>

      <ContainerDown>
        {cardsElments}

      </ContainerDown>
      
      <Login ref={showLogin} router={router}/>
      <DataCard ref={showData} image={image} toPage={chatPage}/>


    </div>
  )
}

export default HomePage