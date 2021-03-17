import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import LeaderBoard from './components/LeaderBoard';



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
				<h1>Hello World</h1>
        <Router forceRefresh={true}>
          <div>
            <Link to="/game">Game</Link><br/>
            <Link to="/leaderboard">LeaderBoard</Link><br/>
          </div>
          <Switch>
           
            <Route path="/leaderboard" component={LeaderBoard}/>
          </Switch>
        </Router>
          <div>
            
            <p className="App-intro">{this.state.apiResponse}</p>
			    </div>
      </div>

		);
	}
}