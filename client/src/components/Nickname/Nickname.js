import React, { Component } from "react";
import "./Nickname.css";
import firebase from 'firebase';
import axios from 'axios';
import dotenv from 'dotenv';

export default class Nickname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            email: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log("Receive Props : " + nextProps);

        this.setState({ email: this.props.user.email });
        console.log("Email Props: " + this.props.user.email);
        // console.log("Email State: " + this.state.email);

        if (nextProps.user) {
            this.setState({ 'userName': nextProps.user.displayName });
            // console.log("userName Next Props: " + nextProps.user.displayName);


        }
    }

    componentDidMount() {
        // this.setState({ 'userName': this.props.user.displayName });
    }

    handleChange(event) {
        console.log(event.target)
        this.setState({ nickname: event.target.value });
    }
    handleSend() {
        if (this.state.nickname) {
            console.log("state msg: " + this.state.nickname);
            var body = {
                email: this.state.email,
                nickname: this.state.nickname,
            }
            console.log("Body: " + JSON.stringify(body));
            axios.put('/api/updateUser', body)
                .then(res => {
                    console.log("Update user: " + res.data);
                    this.props.nicknameCb(this.state.nickname, this.state.email);
                });
        }
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter') return;
        this.handleSend();
    }

    render() {
        return (
            < div >
                <input
                    className="nick-input"
                    type="text"
                    placeholder="Change Nickname"
                    value={this.state.nickname}
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
                <button
                    className="nick-button rounded "
                    onClick={this.handleSend.bind(this)}
                >
                    Change!
                                </button>
            </div >
        );
    }
}

// export default Nickname;