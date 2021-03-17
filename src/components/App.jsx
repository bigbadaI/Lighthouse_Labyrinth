import React from "react";
import {BrowseRouter as Router, Link, Route, Switch} from "react-router-dom";
import Leaderboard from './LeaderBoard';
import Game from 'Game';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:3000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .then(res => console.log(res))
          .catch(err => console.log(err))
  }

  componentWillMount() {
      this.callAPI();
  }
  
  render() {
		return (

			<div style={{ textAlign: "center" }}>
<<<<<<< HEAD
				<h1>Hello World</h1>
        <Router forceRefresh={true}>
          <div>
            <Link to="/game">Game</Link><br/>
            <Link to="/leaderboard"></Link><br/>
          </div>
          <Switch>
            <Route path="/game" component={Game} />
            <Route path="/leaderboard" component={Leaderboard}/>
          </Switch>
        </Router>
          <div>
            
            <p className="App-intro">{this.state.apiResponse}</p>
			    </div>
      </div>

=======
				<h1>Lighthouse Labrynith</h1>
        <p className="App-intro">{this.state.apiResponse}</p>
			</div>
>>>>>>> master
		);
	}
}