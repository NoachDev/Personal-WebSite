import connect_public from "./client"

async function getImagesElm(req, res){
  
  let data = {}

  const result = await connect_public()
  
  const locageStr = (l : number) => {
    switch (l){
      case 0:
        return "drawings"
      case 1:
        return "ux/ui"
      case 2:
        return "programs"
    }
  }

  result.forEach((val, index) => data[index] = {...val, locage : locageStr(val["locage"])})

  res.status(200).json(data)
}

export default getImagesElm