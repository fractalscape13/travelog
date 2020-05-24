import React from 'react';
import './../App.css';
import tulum from '../assets/tulum.png'
import ColorThief from "colorthief";

function App() {

    const img = new Image();
    img.source = {tulum};

  return (
    <div>
      <img src={tulum} alt="tulum" onLoad={() => {
              const colorThief = new ColorThief();
              const result = colorThief.getColor(img.source, 25);
              console.log("RESULT::", result)
            }}/>
      <h1>Travelog</h1>
      <p>Check this shit out</p>
    </div>
  );
}

export default App;
