import React, { Component } from 'react';
import VideoPlayer from 'react-video-js-player';
import cover from '../../images/carl-pic.jpg';
// import videoTag from '../../Videos/jamplay_vid.mp4';

class VideoApp extends Component {
	player = {}
	state = {
		video: {
			src: {videoTag},
			poster: {cover}
		}
	}

	onPlayerReady(player) {
		this.player = player;
	}

	render() {
		return (
			<div>
				<VideoPlayer
					controls={true}
					src={this.state.video.src}
					poster={this.state.video.poster}
					width="720"
					height="420"
					onReady={this.onPlayerReady.bind(this)}
				/>
			</div>
		);
	}
}
export default VideoApp;
