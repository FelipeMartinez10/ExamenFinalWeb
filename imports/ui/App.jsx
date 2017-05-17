import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx";
import Overlay2 from "./Overlay2.jsx";

export class App extends Component {
  constructor(props) {
    super(props);
    this.projection = null;
    this.state = {
    zoomed: 0,
    checked: false,
    };

  }
  setZoomed(z)
  {
    //1 sera zoom in.   0 zoom out.
    this.setState({
      zoomed: z,
    });
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
  handleInputChange(event)
  {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      checked: value,
    });
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
              setProjection={this.setProjection.bind(this)}
              setZoomed={this.setZoomed.bind(this)}></ColombiaMap>
              {this.props && this.props.tweets ?
                <Overlay getProjection={this.getProjection.bind(this)} tweets={this.props.tweets} zoom={this.state.zoomed}></Overlay> :
                <p></p>
              }
              {this.props && this.props.tweets && this.state.checked ?
                <Overlay2 getProjection={this.getProjection.bind(this)} tweets={this.props.tweets}></Overlay2> :
                <p></p>
              }
          </div>
          <div className='col-md-5'>
            <div className='row row-eq-height '>
              <div className='col-md-3'>
                  <button className='btn btn-primary center-block boton' type="button" onClick={this.changeQuery.bind(this)}>Start</button>
              </div>
              <div className='col-md-3'>
                <label className='check'>
                  Show Users:
                  <input
                    name="users"
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={this.handleInputChange.bind(this)}
                  style={{"marginLeft": "10px"}} />
                </label>
              </div>
              <div className='col-md-6'>
                <h2>Results:</h2>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                {this.props && this.props.tweets ?
                  <TweetsResults tweets={this.props.tweets}/> :
                  <p>Enter a query</p>
                }
              </div>
            </div>
          </div>
          <div className='col-md-1'></div>
        </div>
        <div className='row'>
          <hr className='divider'></hr>
          <div className='col-md-1'></div>
          <div className='col-md-11'>
            <h4><a target='_blank' className='link' href='http://www.piazuelo.com'>Felipe Martinez Piazuelo</a></h4>
          </div>
          <hr className='divider'></hr>
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
