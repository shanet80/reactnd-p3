import React from 'react';
import {
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';
import { gray, blue, white } from '../utils/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 10,
	},
	input: {
		color: gray,
		backgroundColor: white,
		margin: 5,
		borderRadius: Platform.OS === 'ios' ? 16 : 1,
		padding: 20,
	},
	text: {
		textAlign: 'center',
		fontSize: 16,
		marginBottom: 3,
	},
	button: {
		marginRight: 40,
		marginLeft: 40,
		marginTop: 10,
		marginBottom: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: blue,
		borderRadius: 10,
		borderWidth: 1,
	},
	submitText: {
		color: white,
		textAlign: 'center',
		paddingLeft: 10,
		paddingRight: 10,
	},
});

class DeckCreate extends React.Component {
	state = {
		title: '',
	};

	submit = () => {
		const { title } = this.state;
		this.props.addDeck(title);
		if (!title) {
			return alert('Title is required');
		}
		saveDeckTitle(title);
		// Resetting the title to null
		this.setState({ title: '' });
		this.props.navigation.navigate('Deck', { title: title });
	};

	handleTextChange = (value) => {
		this.setState({ title: value });
	};

	render() {
		const { title } = this.state;

		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<Text style={styles.text}>Please write the deck title</Text>

				<TextInput
					value={title}
					placeholder="Deck Title"
					style={styles.input}
					onChangeText={this.handleTextChange}
					enablesReturnKeyAutomatically={true}
				/>

				<TouchableOpacity
					style={styles.button}
					onPress={this.submit}
					underlayColor="#fff"
				>
					<Text style={styles.submitText}>Create</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

function mapStateToProps(state) {
	return {
		title: state.title,
	};
}

export default connect(mapStateToProps, { addDeck })(DeckCreate);
