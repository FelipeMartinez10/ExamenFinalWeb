import React, { Component } from 'react';
import d3 from "d3";
import './ColombiaMap.css';


export default class Overlay2 extends Component {
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
      if(tweet.id > this.state.max)
      {
        this.setMax(tweet.id);
        this.drawPoint(tweet.coordinates.coordinates[0],tweet.coordinates.coordinates[1],tweet.user.screen_name);
      }
    },this);
  }
  updateCanvas()
  {

  }
  drawPoint(lat,lon,name)
  {
    const point = this.projection([lat,lon]);
    const ctx = this.refs.canvasTemp.getContext('2d');
    //X,Y,R,
		ctx.clearRect(0, 0, 600, 600);
    ctx.strokeStyle = "#337ab7";
    ctx.beginPath();
    ctx.arc(point[0],point[1],6,0,2*Math.PI);
    ctx.stroke();
		const x = Math.floor(Math.random() * (70 - 10 + 1)) + 10;
		const y = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
		ctx.font = "bold 15px verdana, sans-serif ";
		ctx.fillStyle = "#337ab7";
		ctx.fillText('@'+name,x,y);
		//x Max 70 Min 10
		//y Max 500 Min 100
  }

	render() {
		return (
      <div style={{pointerEvents:"none",zIndex:3}}>
        <canvas id="myCanvas" ref='canvasTemp' width="600" height="600" style={{position:"relative",zIndex:3}}>
      </canvas></div>
			);
	}
}
