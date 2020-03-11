// import React, { Component } from "react";
// import Title from "./components/Title";
// import Footer from "./components/Footer";
// import ToymComponent from "./components/ToymComponent";
// import Wrapper from "./components/Wrapper";
// import Alert from "./components/Alert";
// import Guess from "./components/Guess";
// import heroes from "./heroes.json";

// class App extends Component {
//   state = {
//     heroes,
//     score: 0,
//     topScore: 0,
//     clickedArr: [],
//     alert: false
//   };

//   handleClick = id => {
//     if (this.state.clickedArr.indexOf(id) === -1) {
//       this.state.clickedArr.push(id);
//       this.setState(
//         {
//           score: this.state.score + 1,
//           guess: true
//         },

//         () => {
//           if (this.state.score > this.state.topScore) {
//             this.setState({ topScore: this.state.score });
//           }
//           if (this.state.score === 12) {
//             alert("you win");
//             this.setState({
//               score: 0,
//               clickedArr: []
//             });
//           }
//         }
//       );
//     }

//     else {
//       this.setState({
//         score: 0,
//         clickedArr: [],
//         alert: true,
//         guess: false
//       });
//     }

//     heroes.shuffle();
//   };

//   handleAlert = () => {
//     this.setState({
//       guess: false,
//       alert: false,
//       score: 0,
//       clickedArr: [],
//     });
//   }

//   render() {
//     return (
//       <Wrapper>
//         <Title
//           score={this.state.score}
//           topScore={this.state.topScore}
//         />

//         {this.state.heroes.map(heroes => (
//           <ToymComponent
//             key={heroes.id}
//             id={heroes.id}
//             image={heroes.image}
//             handleClick={this.handleClick}
//           />
//         ))}

//         {this.state.alert ? <Alert handleAlert={this.handleAlert} /> : console.log("GUESS = CORRECT")}
//         {this.state.guess ? <Guess guessRight={this.guess} /> : console.log("GUESS = WRONG")}

//         <Footer>Copyright  Humans 2020. Wakanda FOREVAH!!</Footer>
//       </Wrapper>
//     );
//   }
// }

// Array.prototype.shuffle = function () {
//   let i = this.length, j, temp;
//   while (--i > 0) {
//     j = Math.floor(Math.random() * (i + 1));
//     temp = this[j];
//     this[j] = this[i];
//     this[i] = temp;
//   }
//   return this;
// }

// export default App;
