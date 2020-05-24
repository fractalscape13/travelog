import React from 'react';
import tulum from '../assets/tulum.png'
import sunset from '../assets/sunset.png'
import { Palette } from 'color-thief-react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Account() {

  const history = useHistory();
  const loggedIn = useSelector(state => state.loggedIn);

  if (!loggedIn) {
    history.push('/');
  } else {
    return (
      <div>
        <img src={sunset} alt="tulum" />
        <h1>Travelog</h1>
        <button>Sign out</button>
        <button>Account settings</button>
        <Palette src={sunset} colorCount={10}>
          {({ data, loading, error }) => (
            <React.Fragment>
              <div style={{ color: data[0] }}>
                Text with a color
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
}

export default Account;