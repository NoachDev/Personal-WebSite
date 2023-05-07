import styled from "styled-components"

export const Providers = styled.div.attrs((props : {view : string}) => props)`
  width               : 26em              ;
  height              : 40em              ;

  position            : fixed             ;
  background          : ${props => props.theme.bg.primary}             ;

  border-radius       : 0.5em             ;

  left                : 0                 ; 
  right               : 0                 ;

  margin-left         : auto              ; 
  margin-right        : auto              ;

  top                 : 7%                ;
  z-index             : 11                ;

  visibility          : ${props => props.view}   ;

  display             : flex              ;
  flex-direction      : column            ;

  gap                 : 1em               ;

  align-items         : center            ;

  overflow            : hidden            ;

  #acconts{
    margin-top        : 2em               ;
    margin-bottom     : 2em               ;
    object-fit        : contain           ;
  }

  #close{
    position          : absolute          ;
    right             : 1em               ;
    top               : 0.4em             ;
    width             : 0.7em             ;
  }

  #forget{
    width : auto;
    
    color : white;
    
    font-size : 14px;
    font-family: Poiret One;
    
    margin: 1.5em 0em 2em 5%;
    align-self: start;

  }

  @media (max-width: ${props => props.theme.devices.mobile}) {
    width : 100%;
    height : 100%;
    top : 0%;
    border-radius     : 0em             ;

    #forget{
      align-self: center;
      margin-top: 4em;
    }
  }

`
export const FormSubimit = styled.button`

  width             : 80%               ;
  height            : 3.5em             ;

  margin-top        : 2em               ;

  border            : 0px solid         ;
  border-radius     : 2em               ;

  color             : black             ;
  background        : #95fea1           ;

  &:hover{
    color: white;
  }

`

export const Provider = styled.div`
  width: 200%;
  height: 100%;

  align-self: start;

  display: flex;

  .section{
    display: flex;
    flex-direction: column;
    gap: 2.5em;

    width : 50%;
    height: 100%;
  }

  .authButtom{
    border : 2px solid #303030;
    border-radius : 0.5em

  }

  .authContainer{
    display: flex;
    width : 18.5em;
    height : 2.5em;
    margin-inline: auto;
  }

  #credentials{
    
    display: flex;
    flex-direction: column;

    width : 80%;
    height: 100%;

    margin-bottom: 2em;

    align-self: center;
    justify-content: center;

    gap : 4em;

    & > *{

      display: flex;
      flex-direction: column;

      gap: 1em;

      label{
        color : white;
        font-size: 13px;
        font-family: Confortaa;
        margin-left: 1em;
      }

      input {

        border-radius: 1em;
        border: 0px solid white;

        height: 2.5em;
        outline: nonde;

      }
    }
  }


  @media (max-width: ${props => props.theme.devices.mobile}) {
    height: 60%;
    margin-top: 3em;
  }

` 
export const Line = styled.div`
  display: flex;
  height: 1em;

  justify-content: center;
  align-items: center;
  
  #name{
    
    position: absolute;

    width: auto;
    height: auto;
  
    background: ${props => props.theme.bg.primary};
    padding-inline: 0.5em;
  
    color :  ${props => props.theme.fg};
    font-size: 13px;
    font-family: Confortaa;

  }

  #line{
    width : 100%;
    height : 0px;
  }
`