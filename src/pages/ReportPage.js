import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from '../components/spinner';
import firebase from 'firebase/app';
import 'firebase/firestore';
import FourOhFour from '../pages/FourOhFour';
import Menu from '../components/menu';
import { Modal, Button, Form } from 'react-bootstrap';
import ViewForm from '../components/viewform';

import OlMap from 'ol/Map';
import OlLayerTile from 'ol/layer/Tile';
import OlSourceOSM from 'ol/source/OSM';

import Reaptcha from 'reaptcha';

import paper from '../images/paper.png';

const styles = {
  form: {
    width: '50em',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '4em',
    padding: '3em',
    borderRadius: '5px',
    backgroundImage: `url(${paper})`,
    backgroundRepeat: 'repeat',
    marginTop: '3.5em'
  },
  map: {
    height: '400px',
    width: '650px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2em',
    marginBottom: '2em',
    border: '1px solid black'
  },
  input: {
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1
  },
  label: {
    fontSize: '1em',
    color: 'white',
    backgroundColor: 'red',
    width: '150px',
    padding: '.25em',
    borderRadius: 5,
    display: 'block',
    cursor: 'pointer',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  captcha: {
    width: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: '2em'
  }
};

class ReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.captcha = null;
    this.state = {
      data: null,
      deleteModal: false,
      error: false
    };

    this.fetchReport = this.fetchReport.bind(this);
    this.showDelete = this.showDelete.bind(this);
    this.deleteReport = this.deleteReport.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.mapDivId = `map-${Math.random()}`;
    this.map = new OlMap({
      layers: [
        new OlLayerTile({
          name: 'OSM',
          source: new OlSourceOSM()
        })
      ]
    });
  }

  componentDidMount() {
    this.fetchReport();
  }

  fetchReport() {
    let rid = window.location.pathname.substring(
      window.location.pathname.lastIndexOf('/') + 1
    );
    let reportRef = firebase.firestore().collection('reports').doc(rid);
    reportRef.get().then((doc) => {
      if (!doc.exists) {
        ReactDOM.render(<FourOhFour />, document.getElementById('root'));
      } else {
        this.setState({ data: doc.data() });
      }
    });
  }

  showDelete() {
    this.setState({ deleteModal: true });
  }

  closeModal() {
    this.setState({ deleteModal: false, error: false });
  }

  deleteReport() {
    const t = require('tripcode');
    if (t(this.state.password) === this.state.data.trip) {
      let rid = window.location.pathname.substring(
        window.location.pathname.lastIndexOf('/') + 1
      );
      let reportRef = firebase.firestore().collection('reports').doc(rid);
      reportRef.delete().then(() => {
        this.props.history.push({
          pathname: '/view',
          state: {
            deleted: true
          }
        });
      });
    } else {
      this.setState({ error: true });
      this.captcha.reset();
    }
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className='App' style={{ height: '100%', paddingBottom: '2em' }}>
        <Menu report delete={this.showDelete} />
        {this.state.data === null ? (
          <Spinner />
        ) : (
          <div className='special'>
            <ViewForm styles={styles} data={this.state.data} />
          </div>
        )}

        <Modal show={this.state.deleteModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete field report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this report? This action is
            permanent. To proceed, enter the pasword you used to create it below
            and click "Delete".
            <Form
              style={{ marginTop: '1em' }}
              onSubmit={(e) => e.preventDefault()}
            >
              <Form.Control
                type='password'
                placeholder='password'
                onChange={this.updatePassword}
              />
            </Form>
            <span
              style={{
                color: 'red',
                visibility: this.state.error ? 'visible' : 'hidden'
              }}
            >
              Incorrect password, please try again
            </span>
          </Modal.Body>
          <Modal.Footer style={{ borderTopWidth: 0 }}>
            <Button variant='secondary' onClick={this.closeModal}>
              Close
            </Button>
            <Reaptcha
              ref={(e) => (this.captcha = e)}
              sitekey='6LfQn9MUAAAAAD2R5eeaT0byQmBQcAmmd-HfdyvK'
              onVerify={this.deleteReport}
              size='invisible'
              theme='dark'
            />
            <Button variant='danger' onClick={() => this.captcha.execute()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ReportPage;
