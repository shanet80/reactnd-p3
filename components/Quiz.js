import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { darkGray, blue, lightGray, white, gray, green } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import FlipCard from 'react-native-flip-card';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	card: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: white,
		borderRadius: Platform.OS === 'ios' ? 16 : 1,
		borderColor: 'transparent',
		padding: 40,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
		shadowRadius: 3,
		shadowOpacity: 0.8,
	},
	item: {
		marginBottom: 10,
	},
	itemText: {
		fontSize: 12,
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
		borderColor: 'transparent',
		borderWidth: 1,
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,.24)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},
	submitText: {
		color: lightGray,
		textAlign: 'center',
		paddingLeft: 10,
		paddingRight: 10,
	},
	desc: {
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	descText: {
		fontSize: 30,
		textAlign: 'center',
	},
	howTo: {
		fontSize: 16,
		textAlign: 'center',
		color: gray,
		marginBottom: 10,
	},
});

class Quiz extends React.Component {
	state = {};

	componentDidMount() {
		const { deck } = this.props;
		this.setState({
			questions: deck.questions.map((item, index) => index),
			correctAnswers: 0,
		});
		this.nextQuestion();
		clearLocalNotification().then(setLocalNotification);
	}

	nextQuestion() {
		this.setState((state) => {
			const { questions } = state;
			if (questions.length > 0) {
				const nextQuestion = Math.floor(Math.random() * questions.length);
				return {
					currentQuestion: questions[nextQuestion],
					questions: questions.filter((item, index) => index != nextQuestion),
					leftQuestions: questions.filter(
						(item, index) => index != nextQuestion
					).length,
					isQuestionDisplayed: true,
				};
			} else {
				return {
					currentQuestion: -1,
					isQuestionDisplayed: true,
				};
			}
		});
	}

	handleCorrectAnswer = () => {
		this.setState((state) => ({
			correctAnswers: state.correctAnswers + 1,
		}));
		this.nextQuestion();
	};

	handleIncorrectAnswer = () => {
		this.nextQuestion();
	};

	restartQuiz = () => {
		this.props.navigation.navigate('Quiz', {
			id: this.props.navigation.state.params.id,
			...this.props.navigation.state.params,
		});
	};

	goBackToDeck = () => {
		this.props.navigation.navigate('Deck', {
			title: this.props.navigation.state.params.id,
			...this.props.navigation.state.params,
		});
	};

	render() {
		const { deck } = this.props;
		const { questions } = deck;
		const { currentQuestion, correctAnswers, leftQuestions } = this.state;

		if (typeof correctAnswers === 'undefined') {
			return null;
		}

		if (currentQuestion < 0) {
			return (
				<View style={styles.container}>
					<View style={styles.desc}>
						<Text style={[styles.descText, { fontWeight: 'bold' }]}>
							Your Score: {correctAnswers / questions.length * 100} %
						</Text>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={this.restartQuiz}
						underlayColor={white}
					>
						<Text style={styles.submitText}>Restart</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={this.goBackToDeck}
						underlayColor={white}
					>
						<Text style={styles.submitText}>Go Back</Text>
					</TouchableOpacity>
				</View>
			);
		}

		const item = questions[currentQuestion];
		return (
			<View style={styles.container}>
				<Text style={styles.howTo}>
					Click on the question to reveal the answer, and click it back to see
					the question again
				</Text>
				<FlipCard
					style={styles.card}
					perspective={100}
					alignWidth={true}
					alignHeight={true}
				>
					<View style={styles.item}>
						<Text style={styles.itemText}>{item.question}</Text>
					</View>

					<View style={styles.item}>
						<Text style={styles.itemText}>{item.answer}</Text>
					</View>
				</FlipCard>
				<Text style={styles.howTo}>Cards left: {leftQuestions}</Text>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: green }]}
					onPress={this.handleCorrectAnswer}
					underlayColor={white}
				>
					<Text style={styles.submitText}>Correct</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: darkGray }]}
					onPress={this.handleIncorrectAnswer}
					underlayColor={white}
				>
					<Text style={styles.submitText}>Incorrect</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

function mapStateToProps(state, { navigation }) {
	const { title } = navigation.state.params;
	return {
		state,
		deck: state[title],
	};
}

export default connect(mapStateToProps)(Quiz);
