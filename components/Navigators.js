import React from 'react';
import {
	createStackNavigator,
	createBottomTabNavigator,
	createMaterialTopTabNavigator,
} from 'react-navigation';
import { darkGray, black, blue, white } from '../utils/colors';
import { FontAwesome } from '@expo/vector-icons';
import { Platform } from 'react-native';
// Components
import DeckCreate from './DeckCreate';
import Quiz from './Quiz';
import Deck from './Deck';
import CardCreate from './CardCreate';
import DeckList from './DeckList';

const Tabs =
	Platform.OS === 'ios'
		? createBottomTabNavigator(
				{
					DeckList: {
						screen: DeckList,
						navigationOptions: {
							tabBarLabel: 'Deck List',
							tabBarIcon: ({ tintColor }) => (
								<FontAwesome name="list-ul" size={30} color={tintColor} />
							),
							title: 'Decks List',
						},
					},
					DeckCreate: {
						screen: DeckCreate,
						navigationOptions: {
							tabBarLabel: 'Create a Deck',
							tabBarIcon: ({ tintColor }) => (
								<FontAwesome name="plus-square" size={30} color={tintColor} />
							),
							title: 'Deck Create',
						},
					},
				},
				{
					navigationOptions: {
						headerStyle: {
							backgroundColor: black,
						},
						headerTitleStyle: {
							color: white,
						},
					},
				},
				{
					tabBarOptions: {
						activeTintColor: blue,
						style: {
							height: 56,
							backgroundColor: white,
						},
					},
				}
		  )
		: createMaterialTopTabNavigator(
				{
					DeckList: {
						screen: DeckList,
						navigationOptions: {
							tabBarLabel: 'Deck List',
							tabBarIcon: ({ tintColor }) => (
								<FontAwesome name="list-ul" size={30} color={tintColor} />
							),
							title: 'Decks List',
						},
					},
					DeckCreate: {
						screen: DeckCreate,
						navigationOptions: {
							tabBarLabel: 'Create a Deck',
							tabBarIcon: ({ tintColor }) => (
								<FontAwesome name="plus-square" size={30} color={tintColor} />
							),
							title: 'Deck Create',
						},
					},
				},
				{
					navigationOptions: {
						headerStyle: {
							backgroundColor: black,
						},
						headerTitleStyle: {
							color: white,
						},
					},
				},
				{
					tabBarOptions: {
						activeTintColor: white,
						style: {
							height: 56,
							backgroundColor: blue,
						},
					},
				}
		  );

export default (Navigator = createStackNavigator(
	{
		Home: {
			screen: Tabs,
		},
		DeckList: {
			screen: DeckList,
		},
		Deck: {
			screen: Deck,
		},
		DeckCreate: {
			screen: DeckCreate,
		},
		CardCreate: {
			screen: CardCreate,
		},
		Quiz: {
			screen: Quiz,
		},
	},
	{
		navigationOptions: {
			headerStyle: {
				backgroundColor: darkGray,
			},
			headerTitleStyle: {
				color: white,
			},
			headerTintColor: white,
		},
	}
));
