import React from 'react';
import './../App.css';
import tulum from '../assets/tulum.png'
import ColorThief from "colorthief";

function App() {

    const img = {tulum};
    let colors = [];

    function snagColors(img, index) {
      const result = ColorThief.getColorAsync(img)
        .then(data => {
          const rgb = ColorThief.convertColorRgb(data)
          colors[index] = rgb
        })
        .catch(err => {
          console.log("error", err)
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
      <p onClick={() => snagColors(img)} className="clickable">Check this shit out</p>
      <div className="stripe"></div>
    </div>
  );
}

export default App;