import Head from "next/head"
import React, { useEffect, useState } from "react"
import { Logo, BarPdd } from "../components/Up";
import Card from "../components/cards";
import styled from "styled-components";

const ContainerUp = styled.div`
  height          : 21.5em      ;
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
  const locages = {"programs" : 0, "uxui" : 2};

  return{
    props : {
      val_locage : locages[context.query.l] || 1,
      elements : {}
    }
  }
}

function uploadCards(locage, index){
  // to api : feth data 
  
  return []
}

function HomePage({val_locage, elements}){
  
  const [locage , setLocage] = useState(val_locage)
  const [cardsElments, setCards ] = useState([])

  useEffect(() => {
    setCards(locage in elements ? elements[locage] : elements[locage] = uploadCards(locage, 0))
    }
  )

  return (
    <div style={{display : "flex", flexDirection: "column"}}>

      <ContainerUp>
        <Logo/>
        <BarPdd setVal={x => val_locage=x} val={val_locage} locage={locage} setLocage={setLocage}/>
      </ContainerUp>

      <ContainerDown>
        {cardsElments}
      </ContainerDown>
      

    </div>
  )
}

export default HomePage