import React from 'react';
import './../App.css';
import tulum from '../assets/tulum.png'
import { Palette } from 'color-thief-react';

function App() {

  return (
    <div>
      <img src={tulum} alt="tulum" />
      <h1>Travelog</h1>
      <Palette src={tulum} colorCount={10}>
        {({ data, loading, error }) => (
          <React.Fragment>
            <div style={{ color: data[0] }}>
              Text with the predominant color
            </div>
            <div style={{ color: data[1] }}>
              Text with a color
            </div>
            <div style={{ color: data[2] }}>
              Text with a color
            </div>
            <div style={{ color: data[3] }}>
              Text with a color
            </div>
            <div style={{ color: data[4] }}>
              Text with a color
            </div>
            <div style={{ color: data[5] }}>
              Text with a color
            </div>
            <div style={{ color: data[6] }}>
              Text with a color
            </div>
            <div style={{ color: data[7] }}>
              Text with a color
            </div>
            <div style={{ color: data[8] }}>
              Text with a color
            </div>
            <div style={{ color: data[9] }}>
              Text with a color
            </div>
          </React.Fragment>
        )}
      </Palette>
      <div className="stripe"></div>
    </div>
  );
}

export default App;