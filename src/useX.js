import { useEffect, useState} from 'react';
import {useLocation} from "react-router-dom"
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const useX = ()=>{
  const [status,setStatus]=useState("x")
  const query = useQuery()
  useEffect(()=>{
    setStatus(query.get("x"))
  },[query])
    return status
}
  
export default useX;
