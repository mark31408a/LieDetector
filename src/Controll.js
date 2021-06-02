
import './Controll.css';
import useSocket from './useSocket'

function Controll() {
  const handler = (payload)=>{
    setTimeout(()=>{
      window.navigator.vibrate(800)
    },300)
  }
  const {emit} =  useSocket(handler);
  const handleClick = (x)=>{
    if(x === 0)window.navigator.vibrate(200);
    else window.navigator.vibrate(100);
    emit({reset:false,ans:x})    
  }
  const reset = ()=>{
    window.navigator.vibrate([500,500,500,500,500])
    emit({reset:true})
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col" onClick={()=>{
            handleClick(0)
          }}/>
          <div className="col" onClick={()=>{
            handleClick(1)
          }}/>
        </div>
        <div className="row2"onClick={()=>{
            reset()
        }}>
          {/* {JSON.stringify(card)} */}
        </div>
      </div>
    </>
  );
}

export default Controll;
