import React, { Component } from 'react';
import img from '../../img/tt.png';
import './Main.css';
import Form from '../Form/Form';
import App from '../App/App';
import Nickname from "../Nickname/Nickname";
import Footer from "../Footer";
import firebase from 'firebase';
import firebaseConfig from '../../config';
import axios from 'axios';
import dotenv from 'dotenv';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            category: null,
            exists: null,
            current: null,
            callback: null,
            callbackemail: null,
            allUsers: null,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user: user });
            this.doesUserExist();
            this.getAllUsers();
            // this.props.history.push('/path');
        });
    }

    componentDidUpdate() {
        // console.log(this.state.exists.nickname);
        // console.log(this.state.user.nickname)
        console.log("Component Did Update!");
        if (this.state.exists && this.state.current) {
            if (this.state.exists.nickname != this.state.current.nickname) {
                console.log("REEEEE: " + this.state.exists.nickname);
                console.log("REEEEE: " + this.state.user.nickname)
                this.axiosUserExist();
            }
        }
    }

    axiosUserExist() {
        axios.get('/api/email/' //+ 'test1@gmail.com') 
            + this.state.user.email)
            .then(res => {
                const users = res.data;
                console.log("success + " + users);
                this.setState({ current: users });
            });
    }

    handleSignIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    handleLogOut() {
        firebase.auth().signOut();
    }

    // chooseCategory1() {
    //     this.setState({ category: "random" });
    // }

    // chooseCategory2() {
    //     this.setState({ category: "disney" });
    // }

    // chooseCategory3() {
    //     this.setState({ category: "tvseries" });
    // }

    // chooseCategory4() {
    //     this.setState({ category: "games" });
    // }

    randomCategory() {
        let intRand = (Math.floor(Math.random() * 3) + 1);
        if (intRand == 1) {
            this.setState({ category: "tvseries" });
        } else if (intRand == 2) {
            this.setState({ category: "games" });
        } else {
            this.setState({ category: "random" });
        }
    }

    doesUserExist() {
        console.log("doesUserExist - START");
        axios.get('/api/email/' //+ 'test1@gmail.com') 
            + this.state.user.email)
            .then(res => {
                const persons = res.data;
                console.log("success + " + persons);
                this.setState({ exists: persons });

                if (!persons) {
                    let body = {
                        email: this.state.user.email,
                        nickname: this.state.user.displayName
                    }
                    console.log("Body: " + JSON.stringify(body));
                    axios.post('/api/createUser', body)
                }
                console.log("Exists: " + this.state.exists);
            }).catch(err => {
                console.log("GET ERR: " + err);
                // console.log("URI: " + process.env.MONGODB_URI);
            });

    }

    getAllUsers() {
        axios.get('/api/all/')
            .then(res => {
                console.log("USERS: " + JSON.stringify(res.data));
                this.setState({ allUsers: res.data });
            });
    }

    nickCb = (dataFromChild, email) => {
        this.setState({ callback: dataFromChild });
        this.setState({ callbackemail: email });
        console.log("EMAIIIIIILLLL : " + email);
    }

    render() {
        return (
            <div className="main">
                <div className="main-header" data-aos="flip-down" data-aos-once="false" data-aos-duration="3000">
                    <img src={img} className="main-logo" alt="logo" />
                    {this.state.user ? (
                        < h1>
                            {
                                this.state.exists ? (
                                    <span>{
                                        this.state.callback ? (
                                            <div className="welcome">Welcome, < span > {this.state.callback}</span></div>
                                        ) :
                                            (

                                                <div>Welcome, < span > {this.state.exists.nickname}</span></div>
                                            )
                                    }</span>


                                ) : (<div>Welcome, <span>{this.state.user.displayName}</span></div>)
                            }

                        </h1>

                    ) : (
                            <h1>
                                CHAT SHROOMS
                            </h1>
                        )
                    }


                    {
                        this.state.user ? (
                            // <button>
                            //     Change Nickname
                            // </button>
                            // <div>
                            <Nickname user={this.state.user} nicknameCb={this.nickCb} />

                            // </div>

                        ) : (
                                <div></div>
                            )
                    }



                </div >
                {
                    this.state.user ? (
                        <div className="main-list">
                            {console.log("USER LOGGING IN : " + this.state.user.displayName)}
                        </div>
                    ) : (
                            <div className="main-list">
                                <h4>
                                    <div className="login-first">Please login first before proceeding with the chat</div>
                                </h4>
                            </div>
                        )
                }
                {
                    this.state.user ? (
                        <div className="main-list">
                            {console.log("User to Form: " + this.state.user.displayName)}
                            {console.log("Email to Form: " + this.state.user.email)}
                            {console.log("Category: " + this.state.category)}
                            <h4><div className="login-first">Generate a Shroom!!</div></h4>
                            <div>
                                <button
                                    className="main-button"
                                    onClick={this.randomCategory.bind(this)}
                                >
                                    RANDOM
                                </button>

                                {/* <button
                                    className="main-button rounded "
                                    onClick={this.chooseCategory1.bind(this)}
                                >
                                    RANDOM
                                </button> */}
                                {/* <button
                                    className="main-button rounded "
                                    onClick={this.chooseCategory2.bind(this)}
                                >
                                    DISNEY
                                </button> */}
                                {/* <button
                                    className="main-button rounded "
                                    onClick={this.chooseCategory3.bind(this)}
                                >
                                    TV SERIES
                                </button>
                                <button
                                    className="main-button rounded "
                                    onClick={this.chooseCategory4.bind(this)}
                                >
                                    GAMES
                                </button> */}
                            </div>
                        </div>
                    ) : (
                            <div></div>
                        )
                }
                {
                    this.state.category && this.state.user ? (
                        <div className="main-list">
                            {console.log("User to Form: " + this.state.user.displayName)}
                            {console.log("Email to Form: " + this.state.user.email)}
                            {console.log("Category: " + this.state.category)}
                            {console.log("Callback: " + this.state.callback)}
                            <Form user={this.state.user} allUsers={this.state.allUsers} nickDb={this.state.exists} dbdata={this.state.callback} dbemail={this.state.callbackemail} category={this.state.category} />
                        </div>
                    ) : (
                            <div></div>
                        )
                }
                {
                    !this.state.user ? (
                        <div><button
                            className="signin-button rounded "
                            onClick={this.handleSignIn.bind(this)}
                        >
                            Sign in
                            </button></div>
                    ) : (
                            // this.context.router.push("./App/App")

                            // <Router>
                            //     <Route exact path="/">
                            //         {console.log("We were here")}
                            //         {this.state.user ? <Redirect to="/App" /> : <Main />}
                            // </Route>
                            <div>
                                <button
                                    className="logout-button rounded "
                                    onClick={this.handleLogOut.bind(this)}
                                >
                                    Logout
                                </button>
                            </div>
                            // {/* </Router> */}
                            // <button
                            //     className="main-button rounded "
                            //     onClick={this.handleLogOut.bind(this)}
                            // >
                            //     Logout
                            //     </button>
                        )
                }
                <Footer />
            </div >
        );
    }
}
export default Main;