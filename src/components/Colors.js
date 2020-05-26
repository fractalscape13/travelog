import React from 'react';
import tulum from '../assets/tulum.png'
import { Palette } from 'color-thief-react';

function Colors(props) {

  return (
    <div>
        <h1 style={{color: props.pickedStyle}}>{props.styleType}</h1>
      <Palette src={tulum} colorCount={10}>
        {({ data, loading, error }) => (
          <React.Fragment>
            <div className="clickable" onClick={() => props.setColor(data[0])}style={{ color: data[0] }}>
              Click to choose this color
            </div>
            <div className="clickable" onClick={() => props.setColor(data[1])}style={{ color: data[1] }}>
              Click to choose this color
            </div>
            <div className="clickable" onClick={() => props.setColor(data[2])}style={{ color: data[2] }}>
              Click to choose this color
            </div>
            <div className="clickable" onClick={() => props.setColor(data[3])}style={{ color: data[3] }}>
              Click to choose this color
            </div>
            <div className="clickable" onClick={() => props.setColor(data[4])}style={{ color: data[4] }}>
              Click to choose this color
            </div>
            <div className="clickable" onClick={() => props.setColor(data[5])}style={{ color: data[5] }}>
              Click to choose this color
            </div>
            <div className="clickable" onClick={() => props.setColor(data[6])}style={{ color: data[6] }}>
              Click to choose this color
            </div>
            <div className="clickable" onClick={() => props.setColor(data[7])}style={{ color: data[7] }}>
              Click to choose this color
            </div>
            <div className="clickable" onClick={() => props.setColor(data[8])}style={{ color: data[8] }}>
              Click to choose this color
            </div>
            <div className="clickable" onClick={() => props.setColor(data[9])}style={{ color: data[9] }}>
              Click to choose this color
            </div>
          </React.Fragment>
        )}
      </Palette>
    </div>
  );
}

export default Colors;