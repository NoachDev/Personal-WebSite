import styled from "styled-components";

export const DiskIcon = styled.div.attrs((props : {color? : string, size? : number, border? : string}) => props)`
  border-style    : solid                         ;
  border-width    : ${props => props.border ?? "1px"}                           ;
  border-color    : ${props => props.color ?? props.theme.fg}   ;

  border-radius   : 100%                          ;

  display         : flex                          ;

  background      : gray                          ;

  width           : ${props => props.size ?? 3}em ;
  height          : ${props => props.size ?? 3}em ;

  justify-content : center                        ;
  align-items     : center                        ;

  overflow        : hidden                        ;

  #icon{
    width : 100%;
    height: 100%;
    object-fit: contain;
  }

`