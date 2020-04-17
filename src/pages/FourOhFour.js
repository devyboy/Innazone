import React from 'react';
import PDA from '../images/pda.png';

const styles = {
  h1: {
    color: '#fff',
    fontSize: '2em',
    fontWeight: 400
  },
  p: {
    margin: '0 auto',
    width: '300px'
  },
  container: {
    position: 'relative',
    textAlign: 'center',
    color: '#fff'
  },
  centered: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

function FourOhFour(props) {
  return (
    <div style={styles.container} id='PDAContainer'>
      <img src={PDA} id='PDA' />
      <div style={styles.centered}>
        <h1 style={styles.h1}>Lost to the Zone.</h1>
        <p style={styles.p}>
          Sorry, but the page you were trying to view does not exist. Check the
          map on your PDA or <a href='/'>head back to base</a>.
        </p>
      </div>
    </div>
  );
}

export default FourOhFour;
