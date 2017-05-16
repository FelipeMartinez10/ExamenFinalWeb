import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx";

export class App extends Component {
  constructor(props) {
    super(props);
    this.projection = null;

  }
  setProjection(projection)
  {
    this.projection = projection;
  }
  getProjection()
  {
    return this.projection;
  }
  changeQuery() {
    /*if (evt.key !== "Enter") {
      return;
    }*/
    // "this" will change in the method call, so I need to save it
    let component = this;
    //console.log(evt.target.value);
    Meteor.call("twitter.stream");

  }


  render() {
    //console.log("render!");
    //console.log(this.props.tweets);
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <h1>Tweeter Streamer Colombia</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <ColombiaMap width="600"
              height="600"
              data={{RISARALDA:0}}
              setProjection={this.setProjection.bind(this)}></ColombiaMap>
              {this.props && this.props.tweets ?
                <Overlay getProjection={this.getProjection.bind(this)} tweets={this.props.tweets}></Overlay> :
                <p></p>
              }
          </div>
          <div className='col-md-5'>
            <button type="button" onClick={this.changeQuery.bind(this)}>Start</button>
            <h2>Results:</h2>
            {this.props && this.props.tweets ?
              <TweetsResults tweets={this.props.tweets}/> :
              <p>Enter a query</p>
            }
          </div>
          <div className='col-md-1'></div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);
