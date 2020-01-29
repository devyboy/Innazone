import React from 'react';
import Menu from "../components/menu";
import mainChallenge from "../images/mainchallenge.png";
import '../css/App.css';

function HomePage(props) {
  return(
    <div className="App" style={{color: 'white'}}>
      <Menu />
      <h1>Innazone</h1>
      
      <img src={mainChallenge} alt="main-challenge" />
    </div>
  );
}

export default HomePage;
