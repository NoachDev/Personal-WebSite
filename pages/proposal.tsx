import styled from "styled-components"
import noUser from "../public/user.svg"
import Image from "next/image"
import { useRouter } from "next/router"

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
      // color         : blue;
    }

  }
  
`
const Write = styled.div`
  width : 100%;
  height: 100%;

  background : white;


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
    background : white;

  }
`
const Notes = styled.div`
  height            : 10em                          ;

  background        : #292d32                       ;

  border-radius     : 0.5em                         ;
  overflow          : hidden                        ;
  

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
        </Notes>

      </Top>

      <Subimit>
        <Write>

          <div id="styles">
          </div>

          <textarea id="input" />

        </Write>

        <div id="send" onClick={() => router.push("/chats")}>
          {/* <Image/> */}
          <label> send the proposal</label>
        </div>

      </Subimit>

    </Layout>

  )

}

export default Project