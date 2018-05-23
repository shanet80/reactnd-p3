import * as types from '../actions/actionTypes';

export default function reducer(state = {}, action) {
	const { title, card, decks } = action;
	switch (action.type) {
		case types.GET_DECKS:
			return {
				...state,
				...decks,
			};
		case types.ADD_DECK:
			return {
				...state,
				[title]: {
					title,
					questions: [],
				},
			};
		case types.ADD_CARD:
			return {
				...state,
				[title]: {
					...state[title],
					questions: [...state[title]['questions'].slice(), card],
				},
			};
		default:
			return state;
	}
}
