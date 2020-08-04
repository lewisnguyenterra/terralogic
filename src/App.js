import React, { Component } from 'react';
import './App.css';
import './styles/style.scss';

import Login from './pages/Login';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import ProfileContainer from './pages/Profile';

import { history } from './helpers';
import { connect } from 'react-redux';
import { alertActions } from './actions';
import { bindActionCreators } from 'redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
	render() {
		const { alert } = this.props;
		const toastOptions = {
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
		}
		// const alertType = alert.type === 'alert-success' ? 'bg-success' : 'bg-danger';
		const toastType = alert.type === 'alert-success' ? toast.success(alert.message, toastOptions) : toast.error(alert.message, toastOptions);
		return (
			<div>
				{/* {alert.message &&
					<div className={`alert-in-app text-center fade show text-white p-2 fixed-top ${alertType}`}>
						{alert.message}
						<div className="alert-dissmiss-btn">
							<button
								type="button"
								onClick={() => { this.props.alertClear() }}
								className="close"
								data-dismiss="alert">&times;</button>
						</div>
					</div>
				} */}

				{alert.message
					&& toastType
					&& <ToastContainer />}

				<Router history={history}>
					<Switch>
						<PrivateRoute exact path="/" component={ProfileContainer} />
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
						{/* 404 */}
						<Redirect from='*' to='/' />
					</Switch>
				</Router>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	const { alert } = state;
	return { alert };
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		alertClear: alertActions.clear
	}, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
