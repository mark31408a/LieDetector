import './App.css';
import useX from './useX'
import Controll from './Controll'
import Liedetector from './Liedetector'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
function App() {
  const status = useX(); 
  const screen1 = useFullScreenHandle();
  // console.log(status)
  return (
    <>
      <div className="App">
        {
          status==="x"?
            <div onClick={()=>{
              if(!screen1.active)screen1.enter()
            }}>
              <FullScreen handle={screen1}>
                <Controll/>
              </FullScreen>
            </div>
          :
            <div onClick={()=>{
              if(!screen1.active)screen1.enter()
            }}>
              <FullScreen handle={screen1}>
                <Liedetector/>
              </FullScreen>
            </div>
        }
      </div>
      
    </>
  );
}

export default App;
