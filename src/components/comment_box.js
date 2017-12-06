import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveComment } from '../actions';

const INITIAL_STATE = {
	comment: ''
};

class CommentBox extends Component {
	constructor(props) {
		super(props);

		this.state = INITIAL_STATE;
	}

	onSubmit(event) {
		event.preventDefault();
		this.props.saveComment(this.state.comment);
		this.setState(INITIAL_STATE);
	}

	onChange(event) {
		const { value } = event.target;
		this.setState({ comment: value });
	}
	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)} className="comment_box">
				<h4>Add a comment</h4>
				<textarea
					value={this.state.comment}
					onChange={this.onChange.bind(this)}
				/>
				<div>
					<button action="submit">Submit</button>
				</div>
			</form>
		);
	}
}

export default connect(null, { saveComment })(CommentBox);
