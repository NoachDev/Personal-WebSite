import { useRouter } from "next/router"

import { Header, Layout, Notes, Up } from "../styles/proposal"
import { UserIcon } from "../components/tools"
import { Write } from "../components/proposal"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"


export async function getServerSideProps(ctx){
  const supabase = createServerSupabaseClient(ctx)
  const {data : {user}} = await supabase.auth.getUser()
  

  if (user){
    return {
      props : {
        userId : user.id,
        name : ctx.query.name ?? "test1",
        place : ctx.query.place ?? null,
      },
    }
  }

  return{
    redirect : {
      destination: '/',
      permanent: false,
    }
  }
  
} 

function Project({userId, name, place}){
  const router = useRouter();
  
  function sendProposal(){
    if (!place || name == "test1"){
      return
    }

    const proposalApi = new XMLHttpRequest();
  
    const propost = {
      title : `I whant one project styled a type #( ${name} ) `,
      name: name,
      place : place,
      content : document.getElementById("input")["value"],
      files : [],
      _sb: userId

    }

    proposalApi.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        router.push("/chats")
      }
    }
    
    proposalApi.open("POST", "/api/proposal")

    proposalApi.send(JSON.stringify(propost))
  }
  
  return (
    
    <Layout>
      <Up>
        <Header>
          <div id="user">
            <UserIcon image={null}/>
          </div>

          <div id="text">
            <label>I whant one project styled a type #( {name} ) </label>
          </div>

        </Header>
        
        <Notes>
          <label id = "warning">Warning</label>
          <label id="text" >Please. Take a care with what you write, because this proposal gonna be reading and analyzed so write in a way that conveys full understanding of what you whant.</label>
        </Notes>

      </Up>

      <Write subimit={sendProposal}/>

    </Layout>

  )

}

export default Project