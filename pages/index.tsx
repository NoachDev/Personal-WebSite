import Head from "next/head"
import { useState } from "react"
import { Logo, BarPdd } from "../components/Up";
import Cards from "../components/cards";
import styled from "styled-components";

const ContainerUp = styled.div`
  height          : 20em      ;
  width           : 100%      ;

  padding-inline  : 10em      ;
  
  position        : relative  ;
  display         : flex      ;

  flex-direction  : column    ;
  justify-content : center    ;
  align-items     : center    ;

  border-bottom   : 1px solid ;

`
export async function getServerSideProps(context){
  const locages = {"programs" : 0, "desing" : 2};

  return{
    props : {
      val_locage : locages[context.query.l] || 1
    }
  }
}

function HomePage({val_locage}){

  const [locage , setLocage] = useState(val_locage)

  return (
    <div style={{display:"flex"}}>

      <ContainerUp>
        <Logo/>
        <BarPdd locage={locage} setLocage={setLocage}/>
      </ContainerUp>

      <>
        {/* <Cards/> */}
      </>
      

    </div>
  )
}

export default HomePage