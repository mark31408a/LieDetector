/* eslint-disable import/no-anonymous-default-export */
import './Liedetector.css';
import {useState, useEffect} from 'react'
import fingerPrintImgae from './img/fingerprint.png'
import useSocket from './useSocket'
export default  ()=>{
    const {ans} = useSocket()
    const [status,setStatus] = useState("wait")
    const [time,setTime] = useState(100)
    
    const [bonus,setBonus]=useState(false)
    useEffect(()=>{
      if(status==='scan'){
        if(bonus){
          if(ans!==undefined) setStatus("bonus")
        }
        else if(time===0){
          if(ans===undefined){
            setBonus(true)
          }
          else{
            setStatus("answer")
          }
        }
      } 
    },[status,time,ans,bonus])
    useEffect(() => {
        let interval = null;
        if (status==='scan') {
          interval = setInterval(() => {
            setTime(time=>time===0?100:time-1)
          }, 20);
        } else {
          clearInterval(interval);
          setTime(100)
        }
        return () => clearInterval(interval);
      }, [status, time]);
    const touchStart=()=>{
        setStatus(x=>x==="wait"?"scan":x)
    }
    const touchEnd=()=>{
        setStatus(x=>x==="scan"?"wait":x)
    }
    
    const [scanStyle,setScanStyle] = useState({})
    useEffect(()=>{
        setScanStyle(()=>{
            let width = (2-Math.abs(time-50)/40).toString()
            let opacity = (1.3-Math.abs(time-50)/50).toString()
            let place = (100-time).toString()
            return{
                marginTop: place+"vh",
                boxShadow: "0 0 "+width+"vh "+width+"vh rgba(0, 219, 146,"+opacity+")"
            }
        })
    },[time])

    const next = ()=>{
        setStatus(x=>{
            if(x!=="answer" && x!=="bonus") return x
            // setAnsindex(x=>x+1)
            return "wait"
        })
    }
    
    const [toggle,setToggle] = useState(false)
    useEffect(() => {
        let interval = null;
        if (status==='bonus') {
          interval = setInterval(() => {
            setToggle(t=>!t)
          }, 200);
        } else {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [status, toggle]);
    
    return(
        <div className="LieDetector" 
            onTouchStart={()=>next()}
            onMouseDown={()=>next()}
        >
            {
                status==="scan"?
                    <div className="scanLine" style={scanStyle}/>
                :
                    <></>
            }
            <div className="lietitle"></div>
            <div className="box">
                <div 
                    className="fingerPrintContainer"
                    style={
                        status==="answer"?
                            ans?
                            {
                                backgroundColor:"green",
                                boxShadow: "0 0 10px 10px green"
                            }
                            :
                            {
                                backgroundColor:"red",
                                boxShadow: "0 0 10px 10px red"
                            }
                        :status==="bonus"?
                            toggle?
                            {
                                backgroundColor:"green",
                                boxShadow: "0 0 10px 10px green"
                            }
                            :
                            {
                                backgroundColor:"red",
                                boxShadow: "0 0 10px 10px red"
                            }
                        :{}
                    }
                    onTouchStart = {()=>touchStart()}
                    onMouseDown = {()=>touchStart()}
                    onClick = {()=>touchEnd()}
                >
                    <div className="fingerPrint" style={{backgroundImage:`url(${fingerPrintImgae}`}}/>
                </div>
            </div>
            <div className="lietitle">Don't lie, or you would not pass!!</div>
        </div>
    )
}