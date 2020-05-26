import React from 'react';
import tulum from '../assets/tulum.png'
import sunset from '../assets/sunset.png'
import { Palette } from 'color-thief-react';
import './Colors.css'

function Colors(props) {

  return (
    <div>
        <h2 style={{color: props.pickedStyle}}>{props.styleType}</h2>
      <Palette src={sunset} colorCount={10}>
        {({ data, loading, error }) => (
          <React.Fragment>
            <div className="paletteParent">
              <div className="grouping">
                <div className="clickable" onClick={() => props.setColor(data[0])} style={{ backgroundColor: data[0], width: '50px', height: '50px', border: '1px solid white', margin: '5px'}}></div>
                <div className="clickable" onClick={() => props.setColor(data[1])} style={{ backgroundColor: data[1], width: '50px', height: '50px', border: '1px solid white', margin: '5px'}}></div>
              </div>
              <div className="grouping">
                <div className="clickable" onClick={() => props.setColor(data[2])} style={{ backgroundColor: data[2], width: '50px', height: '50px', border: '1px solid white', margin: '5px'}}></div>
                <div className="clickable" onClick={() => props.setColor(data[3])} style={{ backgroundColor: data[3], width: '50px', height: '50px', border: '1px solid white', margin: '5px'}}></div>
              </div>
              <div className="grouping">
                <div className="clickable" onClick={() => props.setColor(data[4])} style={{ backgroundColor: data[4], width: '50px', height: '50px', border: '1px solid white', margin: '5px'}}></div>
                <div className="clickable" onClick={() => props.setColor(data[5])} style={{ backgroundColor: data[5], width: '50px', height: '50px', border: '1px solid white', margin: '5px'}}></div>
              </div>
              <div className="grouping">
                <div className="clickable" onClick={() => props.setColor(data[6])} style={{ backgroundColor: data[6], width: '50px', height: '50px', border: '1px solid white', margin: '5px'}}></div>
                <div className="clickable" onClick={() => props.setColor(data[7])} style={{ backgroundColor: data[7], width: '50px', height: '50px', border: '1px solid white', margin: '5px'}}></div>
              </div>
              <div className="grouping">
                <div className="clickable" onClick={() => props.setColor(data[8])} style={{ backgroundColor: data[8], width: '50px', height: '50px', border: '1px solid white', margin: '5px'}}></div>
                <div className="clickable" onClick={() => props.setColor(data[9])} style={{ backgroundColor: data[9], width: '50px', height: '50px', border: '1px solid white', margin: '5px'}}></div>
              </div>
            </div>
          </React.Fragment>
        )}
      </Palette>
    </div>
  );
}

export default Colors;