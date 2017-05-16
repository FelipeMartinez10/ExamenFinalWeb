import React, {Component} from "react";
import { Meteor } from "meteor/meteor";
import './ColombiaMap.css';


export default class Tweet extends Component {
  render() {
    return (<div className="tweet">
      <div className="box">
        <div className="box-icon">
          <img className="iconos-acade img-circle img-responsive"
            src={this.props.tweet.user.profile_image_url}
            alt={this.props.tweet.user.screen_name + "profile image"}/>
        </div>
        {/*<span>{this.props.tweet.created_at}</span>*/}
      	<span className='tweet-user'>{this.props.tweet.user.screen_name} </span> <br></br>
        <span>{this.props.tweet.text} </span>
      </div>
      {/*<span>{JSON.stringify(this.props.tweet)}</span>*/}
    </div>);
  }
}
