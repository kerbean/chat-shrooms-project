import React, { Component } from 'react';
import './Message.css';
import JsonFind from 'json-find';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickName: null,
            dbdata: null,
        };
    }

    findNickOfUser() {

        let allUsers = this.props.allUsers;
        // console.log("Message - props.AllUsers: " + allUsers);

        for (let key in allUsers) {
            if (allUsers.hasOwnProperty(key)) {
                // console.log('RAAAAH', allUsers[key].email)
                if (allUsers[key].email == this.props.message.email) {
                    this.setState({ nickName: allUsers[key].nickname });
                }
            }
        }

        // let doc = JsonFind(allUsers);
        // console.log("FINDING NEMOOOOO: " + JSON.stringify(doc.findValues('email')));

        // for (let i = 0; i < allUsers.length; i++) {
        //     // let obj = allUsers[i];
        //     console.log("Nickname: " + allUsers[i].email);
        // }

        // let searchUser = allUsers.find(user => user.email === "pokervindelrio@gmail.com").foo;
        // console.log(searchUser["email"]);
    }

    componentDidMount() {
        console.log("Message.js - DID MOUNT");
        this.findNickOfUser();
        this.sortNickname();
    }

    componentDidUpdate() {
        this.sortNickname();
    }

    sortNickname() {
        console.log("sortNickname - START");
        if (this.props.dbemail == this.props.message.email) {
            this.setState({ dbdata: this.props.dbdata });
        }

    }

    render() {
        return (
            <div className="msg">
                {/* {console.log("HEEEEEEEEEEY dbData: " + this.props.dbdata)} */}

                {/* {this.props.dbdata}: */}
                {/* {console.log("HERE1111111111")} */}

                {/* {console.log("THIIIIIS", this.state.dbdata)} */}
                {/* {this.props.dbdata ? (
                    <span className="user">
                        {console.log("THIIIIIS", this.state.dbdata)}
                        {this.state.dbdata}:
                        </span>
                ) : ( */}
                <span className="user">
                    {this.props.message.nick}:
                        </span>
                {/* )} */}

                {this.props.message.message}
            </div>
        )
    }
}


export default Message;