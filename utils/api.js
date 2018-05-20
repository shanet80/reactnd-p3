import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'Udacicards:decks';

function initStorage() {
	let data = {};
	AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	return data;
}

export function getDecks() {
	return AsyncStorage.getItem(STORAGE_KEY).then(
		(result) => (result === null ? initStorage() : JSON.parse(result))
	);
}

export function getDeck(title) {
	return getDecks().then((decks) => decks[title]);
}

export function saveDeckTitle(title) {
	const deck = {
		title,
		questions: [],
	};

	return AsyncStorage.mergeItem(
		STORAGE_KEY,
		JSON.stringify({
			[deck.title]: deck,
		})
	);
}

export function addCardToDeck(title, card) {
	getDeck(title).then((deck) => {
		return AsyncStorage.mergeItem(
			STORAGE_KEY,
			JSON.stringify({
				[deck.title]: {
					questions: deck.questions.concat(card),
				},
			})
		);
	});
}
