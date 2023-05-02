import styled from "styled-components"
import noUser from "../public/user.svg"
import Image from "next/image"
import { useRouter } from "next/router"

import send from "../public/send-blue.svg"

const Header = styled.div`
  display           : flex                          ;
  flex-direction    : row                           ;

  gap               : 1em                           ;

  height            : 3em                           ;
  
  align-items       : center                        ;

  #icon{
    border          : 1px solid white               ;
    border-radius   : 100%                          ;
    display         : flex                          ;

    background      : gray                          ;

    width           : 3em                           ;
    height          : 3em                           ;

    justify-content : center                        ;
    align-items     : center                        ;

    overflow        : hidden                        ;

  }

  #text{
    width           : 100%                          ;
    height          : 55%                           ;

    background      : white                         ;

    border-radius   : 1em                           ;

    display         : flex                          ;

    justify-content : center                        ;
    align-items     : center                        ;

    font-family     : Poiret One                    ;

  }
`
const Subimit = styled.div`
  width             : 10em                          ;
  height            : 65%                           ;

  display           : flex                          ;
  flex-direction    : column                        ;
  
  width             : auto                          ;
  margin-top        : 1em                           ;

  @media (min-width: 576px){
    position        : absolute                      ;
    top             : 5.5em                         ;
    width           : 70%                           ;
    height          : 80%                           ;
  }

  #send{
    margin-top      : 0.3em                         ;
    margin-left     : auto                          ;
    margin-right    : 0.3em                         ;
    
    height          : 2em                           ;

    display         : flex                          ;

    align-items     : center                        ;

    color           : white                         ;
    font-family     : Confortaa                     ;
    font-size       : 13px                          ;

    &:hover{
      color         : #95BEFE;
    }

  }
  
`
const Write = styled.div`
  width : 100%;
  height: 100%;

  background : #2E2E2E;

  display : flex;
  flex-direction : column;
  
  border-radius : 0 0 0.5em 0.5em;
  overflow : hidden;
  
  #styles{
    width : 100%;
    height : 3%;
    background : gray;
  }
  
  #input{
    width : 100%;
    height : 90% ;

    border : 0px solid;
    background : inherit;

  }
`
const Notes = styled.div`
  height                : 10em                  ;

  background            : #292d32               ;

  border-radius         : 0.5em                 ;
  overflow              : hidden                ;

  display               : grid                  ;
  grid-template-rows    : 20% 1fr               ;

  gap                   : 1.2em                 ;

  #warning{   
    text-align          : center                ;
    text-justify        : center                ;
                
    padding-top         : 1.5%                  ;
                
    font-size           : 15px                  ;
    font-family         : Junge                 ;
                
    background          : #FFDA88               ;
                
  }             
              
  #text{              
    margin-inline       : 2em                   ;

    text-indent         : 12px                  ;
    line-height         : 1.5                   ;
    word-spacing        : 2px                   ;
    letter-spacing      : 1px                   ;

    font-family         : Junge                 ;
    font-size           : 13px                  ;

    color               : white                 ;
  }
  

`
const Top = styled.div`
  display           : grid                          ;
  gap               : 1em                           ;

  margin-top        : 2.5em                         ;
  
  @media (min-width: 576px){
    grid-template-columns: 70% 30%                  ;
  }

`
const Layout = styled.div`
  margin-inline     : 6em                           ;
  position          : absolute                      ;

  width             : calc(100vw - 12em)            ;
  height            : 100vh                         ;
  
  @media (max-width: 576px){
    margin-inline   : 3em                           ;
    position        : absolute                      ;

    width           : calc(100vw - 6em)             ;
    height          : 100vh                         ;
  }

`
export async function getServerSideProps({req}){
  return {
    props : {}
  }
  
} 

function Project(){
  const router = useRouter()

  return (
    
    <Layout>
      <Top>
        <Header>

          <div id="icon">
            <Image src={noUser} style={{width:"2.5em", height:"2.5em"}} alt=""/>
          </div>

          <div id="text">
            <label>I whant one project styled a type #( test1 ) </label>
          </div>

        </Header>
        
        <Notes>
          <label id = "warning">Warning</label>
          <label id="text" >Please. Take a care with what you write, because this proposal gonna be reading and analyzed so write in a way that conveys full understanding of what you whant.</label>
        </Notes>

      </Top>

      <Subimit>
        <Write>

          <div id="styles">
          </div>

          <textarea id="input" />

        </Write>

        <div id="send" onClick={() => router.push("/chats")}>
          <label> send the proposal</label>
          <Image src={send} alt = "image" style={{width : "auto", height: " 100%", marginLeft : "0.5em"}}/>
        </div>

      </Subimit>

    </Layout>

  )

}

export default Project