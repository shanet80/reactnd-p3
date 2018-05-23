import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { setLocalNotification } from './utils/helpers';
import { Constants } from 'expo';
import Navigator from './components/Navigators';

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification();
	}

	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ flex: 1 }}>
					<Navigator />
				</View>
			</Provider>
		);
	}
}
