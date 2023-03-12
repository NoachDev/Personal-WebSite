import Head from "next/head"
import { useState } from "react"
import { Logo, Bar_pdd } from "../components/Up";
import Cards from "../components/cards";
import styled from "styled-components";

const ContainerUp = styled.div`
  height          : 24em      ;
  width           : 100%      ;

  padding-inline  : 10em      ;
  
  position        : relative  ;
  display         : flex      ;

  flex_direction  : column    ;

  justify-content : center    ;

  border-bottom   : 1px solid ;

`

export async function getServerSideProps(context){
  const locages = ["programs", "desing"];

  return{
    props : {
      val_locage : locages.find(x => x == context.query.l) || "drawing"
    }
  }
}

function HomePage({val_locage}){

  const [locage , setLocage] = useState(val_locage)

  return <div style={{display:"flex"}}>
    <Head>
      <title>WebSite</title>
    </Head>

    <ContainerUp>
      <Logo/>
      {/* <Bar_pdd locage={locage} setLocage={setLocage}/> */}
    </ContainerUp>

    <>
      {/* <Cards/> */}
    </>
    

  </div>
}

export default HomePage