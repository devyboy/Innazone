import React from "react";
import Menu from "../components/menu";
import Spinner from "../components/spinner";
import firebase from "firebase/app";
import "firebase/firestore";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import paper from "../images/paper.png";

const styles = {
  card: {
    backgroundImage: `url(${paper})`,
    backgroundRepeat: "repeat",
    textAlign: "left",
    cursor: "pointer",
  },
  gridContainer: {
    padding: "50px",
    gridGap: "50px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
  },
  header: {
    margin: "2em",
    color: "#fff",
  },
};

class ViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  componentDidMount() {
    let reports = [];
    let reportRef = firebase.firestore().collection("reports");
    reportRef
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          reports.push([doc.data(), doc.id]);
        });
      })
      .then(() => {
        this.setState({
          reports: reports,
          deleted: this.props.location.state ? true : false,
        });
      });
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Menu />
        {!this.state ? (
          <Spinner />
        ) : (
          <div>
            {this.state.reports.length !== 0 ? (
              <div style={styles.gridContainer}>
                {this.state.reports.map((report) => {
                  return (
                    <Card
                      style={styles.card}
                      onClick={() =>
                        (window.location.href = `/report/${report[1]}`)
                      }
                    >
                      <Card.Body>
                        <Card.Title id="card-title">
                          <strong>{report[0].name}</strong>
                          {" #" + report[0].trip}
                        </Card.Title>
                        <hr />
                        <Card.Text>
                          <strong>Location: </strong>
                          {report[0].location}
                          <br />
                          <strong>Difficulty: </strong>
                          {report[0].difficulty}
                          <br />
                          <strong>Rank: </strong>
                          {report[0].rank}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <h1 style={styles.header} className="special">
                PDA is empty!
              </h1>
            )}
          </div>
        )}
        <Toast
          show={this.state ? this.state.deleted : false}
          onClose={() => this.setState({ deleted: false })}
          delay={5500}
          autohide
          style={{
            position: "absolute",
            textAlign: "left",
            width: 300,
            bottom: 50,
            right: 40,
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Innazone</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>Field report successfully deleted</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default ViewPage;
