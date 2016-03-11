import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {connect} from 'react-redux';

import * as actionCreator from '../action_creator';

export const MessageView = React.createClass({

	isRegister: function () {
		return !!this.props.user
	},

	componentWillUnmount: function () {
		if (this.isRegister()) {
			this.props.leaveRoom(this.props.user);
		}
		
	},

	render: function () {
		return (
			<div>
				{ this.isRegister() ?  <p>This is the messageview</p>  : 
					<form id = "nameMessageForm" onSubmit = {(e) => {
						e.preventDefault();
						this.props.register(this.refs.nameMessage.value);
					}}>
						Name: <input type = "text" name = "Name" ref = "nameMessage" />
						<input type = "submit" value = "Register" />
					</form>
				}
 
			</div>
		);
		
	}
});

function mapStateToProps (state) {
	return {
		user: state.get('user')
	  }
}

export const MessageViewContainer = connect(mapStateToProps, actionCreator)(MessageView);