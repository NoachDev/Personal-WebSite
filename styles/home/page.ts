import styled from "styled-components";

export const Home = styled.div`
  display : grid;

  width : 100vw;
  height: 100vh;

  #homeImage{
    position: fixed;
    width : 100%;
    height : 100%;
    bottom: 0px;
    object-fit: cover;
    z-index : -1;
  }

`
export const Up = styled.div`
  display: flex;
  flex-direction : column;

  width : 100%;
  height: 45%;
  
  align-items: center;
  justify-content: end;

  gap: 3.5em;

  @media (max-width: ${props => props.theme.devices.mobile}) {
    height : 30%;
    gap: 2em;

  }

`
export const Down = styled.div`

  position: absolute;
  
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  width : 100%;

  height: auto;

  top : 55%;
  padding-inline: 10%;
  gap: 5em;

  box-sizing: border-box;

  @media (max-width: ${props => props.theme.devices.mobile}) {
    top : 38%;
    gap: 2em;

  }
`
export const HomeBrand = styled.div.attrs((props : {opacity : number}) => props)`
  display:  flex;

  position: absolute;

  font-size: 14px;
  font-family: Confortaa;

  align-items: center;

  width : 100%;
  height: auto;

  padding-left: 1em;
  padding-top: 1em;

  box-sizing: border-box;

  gap: 1em;
  
  #brand{
    display: flex;
    gap: 1em;
  }

  .showContent{
    transition: 0.5s;
    opacity: ${props => props.opacity};
  }

`
export const DiskContainer = styled.div`
  width           : 8em  ;
  height          : 8em  ;

  border-style    : solid    ;
  border-radius   : 100%     ;
  border-color    : #C54242  ;
  
  display         : flex     ;

  justify-content : center   ;
  align-items     : center   ;

  overflow        : hidden   ;

  #logo{
    width : 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: ${props => props.theme.devices.mobile}) {
    width               : 20% ;
    height              : auto;
  }

`