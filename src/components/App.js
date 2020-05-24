import React from 'react';
import './../App.css';
import tulum from '../assets/tulum.png'
import ColorThief from "colorthief";

function App() {

    const img = new Image();
    img.source = {tulum};
    let colors = [];

    thiefColor(img, index) {
      const result = ColorThief.getColorAsync(img).then(data => {
        const rgb = ColorThief.convertColorRgb(data)
        colors[index] = rgb
      })
      console.log(result)
    }

  return (
    <div>
      {/* <img src={tulum} alt="tulum" onLoad={() => {
              const colorThief = new ColorThief();
              const result = colorThief.getColor(img.source, 25);
              console.log("RESULT::", result)
            }}/> */}
      <img src={tulum} alt="tulum" />
      <h1>Travelog</h1>
      <p>Check this shit out</p>
      <div className="stripe"></div>
    </div>
  );
}

export default App;
