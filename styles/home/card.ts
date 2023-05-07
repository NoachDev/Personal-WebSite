import styled from "styled-components"

export const ContainerCard = styled.div`

  width               : ${props => props.theme.sizes.default[0]} ;
  height              : ${props => props.theme.sizes.default[1]} ;
  
  border-radius       : 1em                               ;
  border-color        : ${props => props.theme.bg.primary};
  border-bottom       : 2px solid rgba(255, 255, 255, 0.1);
  border-top          : 4px solid rgba(255, 255, 255, 0.08);
  border-right        : 4px solid rgba(255, 255, 255, 0.08);

  display             : flex                    ;

  overflow            : hidden                  ;

  #info{
    width             : 1.3em                   ;
    height            : 1.3em                   ;
    position          : absolute                ;
    margin-left       : 0.5em                   ;
    margin-top        : 0.5em                   ;
  }

  #drawing{
    width             : 100%                    ;
    height            : 100%                    ;
    object-fit        : cover                   ;
  }

  @media (max-width: ${props => props.theme.devices.mobile}) {
    width               : 43% ;
    height              : calc(100vw * 43 / 100 / 5 * 3.5);
  }
  
`
export const Glass = styled.div.attrs((props : {view : string}) => props)`
  background          : rgba(0, 0, 0, 0.7);

  backdrop-filter     : blur(3px)         ;

  width               : 70em              ;
  height              : 35em              ;
  
  position            : fixed             ;
  display             : flex              ;
  flex-direction      : row               ;

  visibility          : ${props => props.view}   ;

  top                 : 13%               ;
  left                : 0                 ; 
  right               : 0                 ;

  margin-left         : auto              ; 
  margin-right        : auto              ;

  border-radius       : 0.5em             ;

  overflow            : hidden            ;
  color               : white ; 

  z-index             : 10                ;

  #name{
    margin-top        : 1.3em             ;
    align-self        : center            ;
    font-family       : Poiret One        ;
    font-size         : 30px              ;
  }

  #data{
    width             : 70%               ;
    height            : 65%;

    align-self        : center            ;
    text-align        : center            ;
    line-height       : 2em               ;
    font-family       : Junge             ;

    overflow          : scroll;

  }

  #image{
    width             : 60%               ;
    background        : black             ;
    height            : auto              ;
    border-radius     : 0.5em             ;
    object-fit        : contain           ;

  }

  #right{
    width             : 40%               ;
    height            : auto              ;
    display           : flex              ;
    flex-direction    : column            ;

  }

  #down{
    display           : flex              ;
    flex-direction    : row               ;
    position          : absolute          ;

    right             : 2%                ;
    bottom            : 1.5em             ;

    gap               : 1em               ;
  }

  #iconBuy{
    width             : 2em             ;
    height            : 2em             ;
  }

  #textBuy{
    align-self        : center            ;
    justify-self      : center            ;

    text-align        : center            ;
    margin-top        : 0.6em             ;

    text-decoration   : underline         ;
    font-family       : Confortaa         ;
  }

  #close{
    position          : absolute          ;
    right             : 2%                ;
    top               : 2.5%              ;

    width             : 0.8em               ;
  }

  &.vertical{
    width : 100%;
    height: 100%;

    background : rgba(0, 0, 0, 0.9);


    top : 0%;

    display: flex;
    flex-direction: column;

    border-radius : 0em;

    #image{
      width : 100%;
      border-radius: 0em 0em 0.5em 0.5em;
    }

    #right{
      width : 100%;
      height : 100%;

      overflow: hidden;
    }

    #data{
      width : 80%;
    }
    
    #close{
      top : 1%;
      right : 3.8%;
    }
  }

`