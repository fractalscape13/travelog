import React from 'react';
import './../App.css';

function App() {

  const imgSrc = '../assets/tulum.png';

  return (
    <div>
      <img href={imgSrc} />
      <h1>Travelog</h1>
      <p>Check this shit out</p>
    </div>
  );
}

export default App;
