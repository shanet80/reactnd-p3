import * as types from './actionTypes';

export function getDecks(decks) {
	return {
		type: types.GET_DECKS,
		decks,
	};
}

export function addDeck(title) {
	return {
		type: types.ADD_DECK,
		title,
	};
}

export function addCard(title, card) {
	return {
		type: type.ADD_CARD,
		title,
		card,
	};
}
