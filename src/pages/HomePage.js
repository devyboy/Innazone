import React from 'react';
import Menu from "../components/menu";
import mainChallenge from "../images/mainchallenge.png";
import '../css/App.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <Menu />
        <img src={mainChallenge} />
      </div>
    );
  }
}

export default HomePage;
