import styled from "styled-components"

export const Header = styled.div`
  display           : flex                          ;
  gap               : 1em                           ;

  height            : 3em                           ;
  
  align-items       : center                        ;

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
  
  @media (max-width: ${props => props.theme.devices.mobile}){

    label {
      font-size: 10px;
    }
  }
`
export const Subimit = styled.div`
  width             : 10em                          ;
  height            : 65%                           ;

  display           : flex                          ;
  flex-direction    : column                        ;
  
  width             : auto                          ;
  margin-top        : 1.5em                           ;

  @media (min-width: ${props => props.theme.devices.mobile}){
    position        : absolute                      ;
    top             : 5.5em                         ;
    width           : 70%                           ;
    height          : 80%                           ;
  }

  #send{
    margin-top      : 1.5em                         ;
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
export const ContainerWrite = styled.div`
  width : 100%;
  height: 100%;

  background : #2E2E2E;

  display : flex;
  flex-direction : column;
  
  border-radius : 0 0 0.5em 0.5em;
  overflow : hidden;

  
  #topBar{
    width : 100%;
    height : 1.8em;
    background : rgba(40, 40, 40, 0.6);

    display: flex;

    align-items: center;

    padding-inline: 1em;

    box-sizing: border-box;

    gap: 0.8em;

    color: white;

    border-radius: 0em 0em 0.3em 0.3em;

    #fontList{
      height: 1.3em;
      border: 0px solid white;
      border-radius: 0.3em;
      width: 8em;

      background: inherit;
      color: white;

      @media (max-width: ${props => props.theme.devices.mobile}){
        font-size: 12px                  ;
      }

    }

    #fontSize{
      height: 1.3em;
      width: 3em;
      border: 0px solid white;
      border-radius: 0.3em;

      background: inherit;
      color: white;

      @media (max-width: ${props => props.theme.devices.mobile}){
        font-size: 12px                  ;
      }

    }

  }
  
  #input{
    color : ${props => props.theme.fg};
    width : 100%;
    height : 85% ;

    border : 0px solid;
    background : inherit;

    outline: none;
    resize: none;

    overflow: scroll;

  }
`
export const Notes = styled.div`
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
export const Up = styled.div`
  display           : grid                          ;
  gap               : 1.5em                         ;

  margin-top        : 2.5em                         ;
  
  @media (min-width: ${props => props.theme.devices.mobile}){
    grid-template-columns: 70% 30%                  ;
  }

`
export const Layout = styled.div`
  margin-inline     : 6em                           ;
  position          : absolute                      ;

  width             : calc(100vw - 12em)            ;
  height            : 100vh                         ;
  
  @media (max-width: ${props => props.theme.devices.mobile}){
    margin-inline   : 3em                           ;
    position        : absolute                      ;

    width           : calc(100vw - 6em)             ;
    height          : 100vh                         ;

    font-size       : 12px ;
  }

`