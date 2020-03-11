import React, { Component } from 'react';
//import logo from '../../images/logo.svg';
import './App.css';
import Form from '../Form/Form';
import firebase from 'firebase';
import firebaseConfig from '../../config';

// firebase.initializeApp(firebaseConfig);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user });
        });
    }

    // handleSignIn() {
    //     const provider = new firebase.auth.GoogleAuthProvider();
    //     firebase.auth().signInWithPopup(provider);
    // }

    // handleLogOut() {
    //     firebase.auth().signOut();
    // }

    render() {
        return (
            <div className="app">

                {/* <div className="row"> */}
                <div className="app-header">
                    {/* <img src={logo} className="app-logo" alt="logo" /> */}
                    <h2>
                        CHAT SHROOMS
                        </h2>
                    {/* {!this.state.user ? (
                            <button
                                className="app-button rounded "
                                onClick={this.handleSignIn.bind(this)}
                            >
                                Sign in
                            </button>
                        ) : (
                                <button
                                    className="app-button rounded "
                                    onClick={this.handleLogOut.bind(this)}
                                >
                                    Logout
                                </button>
                            )} */}
                </div>
                <div className="app-list">
                    <Form user={this.state.user} />
                </div>

                {/* </div> */}
            </div>
        );
    }
}
export default App;