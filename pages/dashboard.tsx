import { useEffect, useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import { useRouter } from "next/router"

import close from "../public/close-p.svg"

import nodeNew from "../public/dashboard/add-circle.svg"
import toLeft from "../public/dashboard/left-align.svg"
import toRight from "../public/dashboard/right-align.svg"

const Node = styled.div`
  background: #2E2E2E;

  width : 10em;
  height: 8.5em;

  border-radius: 0.8em;
  
  display : flex;

  flex-direction: column;

  justify-content: center;
  gap: 0.5em;
  padding-left: 0.5em;

  color : white;

  & > *{
    overflow: hidden;

    text-overflow: ellipsis;

    width : 9.5em;
    height : 1.3em;

    margin-inline: 0.5em;

    font-family: Junge;
    font-size: small;
  }

  #close{
    position : absolute;
    width : 0.9em;
    height : 0.9em;
    margin-top : -7.5em;
    margin-left: 10.3em;
  }


`
const Filter = styled.div`
  border: 0px;
  border-bottom: 0.5px;

  border-style : solid;
  border-color: gray;

  display : flex;

  padding-top : 0.5em;
  padding-bottom: 0.5em;

  box-sizing: border-box;

  align-content: center;
  justify-content: center;

  color : white;

  gap : 0.5em;

  & > * {
    background: inherit;
    color : white;

  }

  #name{
    font-family: Poiret One;
    font-size: 14px;
    align-self: center;
    
  }

  #inputName{
    border-radius: 1em;
    border-top: 0px;
    border-bottom: 0px;
    width : 50%;
    font-family: Junge;

    outline: none;

    padding-left: 0.5em;

    box-sizing: border-box;
  }

  #options{
    font-family: Junge;
    border: 0px solid;
    text-align: center;
  }

  .buttonAlign{
    height : 100%;
    width : auto;

    margin-right: 0.3em;

  }
`
const Content = styled.div`
  width : 60%;
  height : 80%;

  position : fixed;

  background: #282828;

  margin-top : 3%;

  margin-left : 20%;
  
  z-index : 1;

  border: 1.5px solid #292d32;
  border-radius : 0.5em;

  grid-template-rows: 6% 5% 1fr 8%;

  box-sizing: border-box;
  padding-inline: 1em;
  padding-top: 0.7em;

  & > *{
    background: #282828;
    color : white;
  }

  #image{
    display: flex;
    font-size : 14px;
    font-family: Poiret One;

    justify-content: center;
    align-items: center;

  }

  #top{
    display : flex;

    flex-grow: 0;

    width : 100%;
    align-items: center;

    font-family: Junge;

    gap: 0.5em;

    & > *{
      background: #282828;
      color : white;
      
      border : 0px;

    }

    #inputName{
      width : 100%;
      height : 1.5em;

      font-size : 12px;
      padding-left : 0.4em;
      
      border-bottom: 1.5px;

      border-color: #95fea1;

      border-style : solid;
      border-radius : 0.5em;
      
      outline : none
    }
    
  }

  #middle{
    border : 1px solid #474A50 ;
    border-radius: 0.3em;

    outline: none;
    margin-top: 1em;
  }

  #bottom{
    display : flex;

    align-items: center;
    justify-content: end;

    gap : 0.5em;

    & > *{
      padding-inline: 2em;

      background: inherit;
      color: white;

      border: 1px solid white;

      border-radius: 8px;

      font-family: Junge;
      font-size: 12px;
    }
  }

`
const Delete = styled.div`
  width : 30%;
  height: 25%;

  position: fixed;

  display: grid;

  grid-template-rows: 1fr 2.5em;

  color : white;
  background: #282828;

  border : 1px solid #C54242;
  border-radius : 0.5em;

  z-index: 1;

  margin-left: 35%;
  margin-top: 7%;

  padding-inline: 1em;
  
  box-sizing: border-box;

  #info{
    font-family: Confortaa;
    align-self: center;
    justify-self: center;

    width : 80%;

    text-align: center;

    margin-top: 1.5em;

  }

  #buttons{
    display : flex;

    align-items: center;
    justify-content: end;

    gap : 0.5em;

    & > *{
      padding-inline: 2em;

      background: inherit;
      color: white;

      border: 0px solid;

      border-radius: 8px;

      font-family: Junge;
      font-size: 13px;
    }
  }

`

export async function getServerSideProps(ctx){

  return {
    props : {
      nodeContents : await fetch(`${process.env.NEXT_URL}/api/images`).then(x => x.json())
    }
  }
}

function DashBoard({nodeContents}){

  const admin_test = true;

  const router = useRouter();

  const [cntShow, setCShow] = useState(false);
  const [delShow, setDShow] = useState(false);
  
  const [filterPos, setPos ] = useState(false);
  const [filterName, setFName] = useState(null);
  const [filterLocage, setFLocal] = useState(null);

  const [nodes, setNodes] = useState(Object.keys(nodeContents).map( k => {
      const vals =  nodeContents[k]
      return createNode(k, vals.id, vals.name, vals.locage, vals.content, vals.src)
    }
  ));

  const defaultVal = {id : "new", image : "Nothing Here", name : "", content: "", locage : null} ;
  const [changeVal, setVal] = useState(defaultVal);

  const nodeAdd = <Image onClick={() => { outAll(); setCShow(true)}} key={0} src={nodeNew} alt = "SVG Repo" style={{width : "2.5em", height : "2.5em", alignSelf : "center"}}/>;

  function outAll(){
    setCShow(false)
    setDShow(false)
    setVal(defaultVal)
  }

  function LoadContent(e : any){
    
    e.preventDefault()
    const isClose = e.target["getAttribute"]("id") == "close";
    
    if (!isClose){
      const element : any = e.currentTarget;
      const elmId = element["getAttribute"]("id");

      outAll()
      setCShow(true)
      setVal({...nodeContents[elmId], key : elmId})

    }
    
    
  }

  function createNode(key : string, id: string, name : string, locage : string, content : string, image : string ){ 
    return (
      <Node key={key} id={String(key)} onClick={e => LoadContent(e) }>
        <Image alt="" src={close} onClick={() => setDShow(true) } id="close"/>
        <label key={name} >{name}</label>
        <label key={locage} >{locage}</label>
        <label key={2} >{content}</label>
        <label key={3} >{image}</label>
      </Node>
    )
  }

  function filterNode(nodes : JSX.Element[]){

    const getBy = (key, val, src) => src.filter(x => nodeContents[x.key][key].includes(val))

    let ret = [];

    if (filterName ?? false){
      ret = getBy("name", filterName, nodes)
    }

    if (filterLocage ?? false){
      ret = getBy("locage", filterLocage, filterName ? ret : nodes)
    }

    if (filterName || filterLocage){
      return ret
    }

    return nodes
  }
  
  if (!admin_test){
    useEffect(() => {
      router.push("/")
    })

    return <></>
  }

  return <div style={{display : "flex"}}>
    <Content style={{visibility : cntShow ? "visible" : "hidden", display : cntShow ? "grid" : "none"}}>
      <div id="image">
        <input type="file" accept="image/*" id="imageInput" multiple={true} style={{display:"none"}}></input>
        <label onClick={() => document.getElementById("imageInput").click()}>{changeVal.image}</label>
      </div>

      <div id="top">
        <input type="text" placeholder="Name :" value={changeVal.name} onChange={() => {}} id={"inputName"}/>
        <select defaultValue={changeVal.locage ?? 1} onChange={() => {}}>
          <option value={0}>drawings</option>
          <option value={1}>ux/ui</option>
          <option value={2}>programs</option>
        </select>
      </div>

      <textarea id="middle" value={changeVal.content} onChange={() => {}}/>

      <div id="bottom">
        <button onClick={outAll}>cancel</button>
        <button style={{background : "#95fea1", borderColor : "#95fea1", color : "black"}}>save</button>
      </div>
    </Content>

    <Delete style={{visibility : delShow ? "visible" : "hidden", display : delShow ? "grid" : "none"}}>
      <label id="info"> You realy whant delete this node ? All information will be lost</label>
      <div id="buttons">
        <button onClick={outAll}>cancel</button>
        <button style={{background : "#D93434"}}>delete</button>
      </div>
    </Delete>

    <div style={{display : "grid", width : "100%"}}>

      <Filter style={{width : "100%", height : "2.5em"}}>
        <label id="name">
          Name
        </label>
        <input id="inputName" type="text" onChange={e => setFName(e.target.value)}/>
        <select id="options" onChange={e => {
            const val = e.target.value
            val == "none" ? setFLocal(null) : setFLocal(val)
          }
        }>
          <option>none</option>
          <option>ux/ui</option>
          <option>drawings</option>
          <option>programs</option>
        </select>

        <Image onClick={() => setPos(false)} src={toLeft} alt = "SVG Repo" className = "buttonAlign"/>
        <Image onClick={() => setPos(true)} src={toRight} alt = "SVG Repo" className = "buttonAlign"/>
      </Filter>

      <div>
        <div style={{padding: "1em", display : "flex", gap : "1em"}}>
          { filterPos ? [nodeAdd, filterNode(nodes.reverse())] : [filterNode(nodes), nodeAdd] }
        </div>

        <div onClick={outAll} style={{width : "100%", height : "100%", position : "fixed"}}></div>

      </div>
    </div>
    
    
  </div>

} 

export default DashBoard