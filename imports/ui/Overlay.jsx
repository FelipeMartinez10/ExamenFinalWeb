import React, { Component } from 'react';
import d3 from "d3";
import './ColombiaMap.css';


export default class Overlay extends Component {
	constructor(props) {
		super(props);
		this.projection = null;
    this.state = {
    max: -1,
    };
	}
  setMax(nmax) {
    this.setState({
      max: nmax,
    });
  }
  componentDidMount()
  {
      this.updateCanvas();
      this.projection = this.props.getProjection();
  }
  componentWillUpdate(nextProps)
  {

    //console.log(nextProps.tweets);
    nextProps.tweets.forEach((tweet) => {
      //console.log(tweet.coordinates.coordinates[0]+' , '+tweet.coordinates.coordinates[1]);
      console.log("iter");
      if(tweet.id > this.state.max)
      {
        this.setMax(tweet.id);
        this.drawPoint(tweet.coordinates.coordinates[0],tweet.coordinates.coordinates[1]);
      }
    },this);
  }
  updateCanvas()
  {

  }
  drawPoint(lat,lon)
  {
    console.log('Draw point');
    const point = this.projection([lat,lon]);
    const ctx = this.refs.canvas.getContext('2d');
    //X,Y,R,
    ctx.fillStyle = "#c82124";
    ctx.beginPath();
    ctx.arc(point[0],point[1],2,0,2*Math.PI);
    ctx.fill();
  }

	render() {
		return (
      <div style={{pointerEvents:"none",zIndex:2}}>
        <canvas id="myCanvas" ref='canvas' width="600" height="600" style={{position:"relative",zIndex:2}}>
      </canvas></div>
			);
	}
}
