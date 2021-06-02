import {useEffect, useState} from 'react'
import { io } from "socket.io-client";
const useSocket = (handler)=>{
  const [socket,setSocket] = useState(undefined)
  const [ans,setAns] = useState(undefined)
  const emit=(x)=>{
    if(!socket.connected){
      console.log("no connection!!!")
      return
    }
    socket.emit("setans",x)
  }

  useEffect(()=>{
    setSocket(()=>{
      let ws=io()
      ws.on("addans",(payload)=>{
        console.log(payload)
        if(payload.reset) setAns(undefined)
        else  setAns(payload.ans)    
        handler(payload)
      })
      return ws
    })
    return  () => {
      if(socket)socket.disconnect() 
      setSocket(undefined)
    }
  },[])
  return {emit,ans}
}
  
export default useSocket;
