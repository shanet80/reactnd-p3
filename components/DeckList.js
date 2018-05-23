import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Platform,
} from 'react-native';
import Deck from './Deck';
import { getDecks } from '../utils/api';
import { connect } from 'react-redux';
import { recieveDecks } from '../actions';
import { white, blue } from '../utils/colors';

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		backgroundColor: white,
		borderRadius: Platform.OS === 'ios' ? 16 : 1,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,.24)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},
	title: {
		fontSize: 21,
		fontWeight: 'bold',
		color: blue,
		marginBottom: 4,
	},
	CardsNumber: {
		fontSize: 14,
		color: blue,
	},
	iconContainer: {
		marginRight: 12,
	},
	icon: {
		fontSize: 42,
	},
});

class DeckList extends Component {
	componentDidMount() {
		getDecks().then((decks) => this.props.dispatch(recieveDecks(decks)));
	}

	renderItem = (listItem) => {
		const { title, questions } = listItem.item;
		return (
			<TouchableOpacity
				onPress={() => this.props.navigation.navigate('Deck', { title: title })}
			>
				<View style={styles.item}>
					<View>
						<Text style={styles.title}>{title}</Text>
						{questions.length > 0 ? (
							<Text style={styles.CardsNumber}>
								Number of Cards: {questions.length}
							</Text>
						) : (
							<Text style={styles.CardsNumber}>
								You haven't created any cards yet.
							</Text>
						)}
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		const { decks } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={decks}
					renderItem={(item) => this.renderItem(item)}
					keyExtractor={(item) => item.title}
				/>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		decks: Object.keys(state).map((title) => state[title]),
	};
}

export default connect(mapStateToProps)(DeckList);
