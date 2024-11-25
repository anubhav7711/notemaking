import React, { createContext, useEffect, useState } from 'react';
const Data = createContext()

export default function AppProvider(props) {

  const [canvasvalue,setcanvasvalue] = useState("")
  const [canvasid,setcanvasid] = useState("")
  useEffect(()=>{
    const fetchCanvasContent = async() =>{
      console.log('response sent')
      let response = await fetch('http://localhost:5000/chapter/find',{
        method:"GET",
        headers:{"Content-Type": "application/json","chapter_id": canvasid}
      })
      response = await response.json()
      console.log(response.response.content)
      setcanvasvalue(response.response.content)
    }
    if(canvasid){
      fetchCanvasContent()
    }
  },[canvasid])
  
  
  return (
    <Data.Provider value={{canvasvalue,setcanvasvalue,canvasid,setcanvasid}}>
      {props.children}
    </Data.Provider>
  )
}
export { Data }