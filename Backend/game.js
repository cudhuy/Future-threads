// This file contains the GameManagerClass which manages the game state, including events, cards, and stats.
function random_range(min, max) {
	// picks a random float in the range, inclusive
	let ran = Math.random();
	return ran * (max - min) + min;
}

// This function picks a random integer in the range, inclusive
function random_int(min, max) {
	// picks a random int in the range, inclusive
	if (max > min) {
		let temp = max;
		max = min;
		min = temp;
	}
}

// This function picks a random integer in the range, inclusive
function weighted_random_choice(data) {
	// takes data in the form [['item1',2], ['item2',1], ['item3',4]]
	// returns the index //not ->// returns one of the keys e.g. 'item1' with its weighted probability, for item 1 being 2/7

	let total_weight = 0;
	for (let info of data) {
		total_weight += info[1];
	}
	if (total_weight === 0) {
		return -1;
	}

	let ran_val = random_range(0, total_weight);
	for (let i = 0; i < data.length; i++) {
		ran_val -= data[i][1];
		if (ran_val < 0) {
			return i; // returns the index of the item in the data array
		}
	}
	console.log('weighted random function broke', ran_val, data, total_weight);
}

// This function clamps a value between a minimum and maximum value.
function clamp(value, min, max) {
	// returns the value, limited to within the given min and max
	if (min < max) {
		return Math.min(Math.max(value, min), max);
	}
	return min;
}

// This class manages the game state, including events, cards, and stats.
class GameManagerClass {
	constructor(events, cards) {
		this.events = events;
		this.cards = cards;
		this.pastEvents = [];
		this.gameEnded = false;
		this.stats = {
			economy: 50,
			environment: 50,
			politics: 50,
			military: 50,
			qualityOfLife: 50,
		};

		this.currentYear = 2025;
	}

	init() {
		this.currentCards = this.getNewCards();
		return { cards: this.currentCards, stats: this.stats };
	}

	incrementYear(selectedCard) {
		this.applyCard(selectedCard);
		let initialStats = { ...this.stats };

		let newEvents = this.getNewEvents();
		this.currentCards = this.getNewCards();

		let statChanges = this.applyNewEvents(newEvents);
		statChanges.unshift(initialStats);

		this.currentYear += 1;

		return { events: newEvents, cards: this.currentCards, stats: statChanges };
	}

	// This function returns a list of new events based on the current stats and year.
	getNewEvents() {
		if (this.gameEnded) {
			return [];
		}

		let possibleEvents = [];
		for (let event of Object.values(this.events)) {
			let probability = this.getEventProbability(event);
			if (probability !== 0) {
				possibleEvents.push([event, probability]);
			} else {
				possibleEvents.push([event, 1]);
			}
		}

		let selectedEvents = [];
		let i = 0;
		let max_events = random_int(0, 4);
		console.log('possible events', possibleEvents);
		while (i < max_events && possibleEvents.length > 0) {
			let new_event_index = weighted_random_choice(possibleEvents);
			if (new_event_index !== -1) {
				selectedEvents.push(possibleEvents[new_event_index][0]);
				possibleEvents.splice(new_event_index, 1);
				i++;
			} else if (Math.random() < 0.2) {
				i++;
			}
		}
		return selectedEvents;
	}

	// This function applies the new events to the current stats and returns the changes.
	applyNewEvents(newEvents) {
		let statChanges = [];
		for (let event of newEvents) {
			for (let stat of Object.keys(event['statEffects'])) {
				let stat_change =
					event['statEffects'][stat]['change'] +
					random_int(
						-event['statEffects'][stat]['range'],
						event['statEffects'][stat]['range'],
					);
				this.stats[stat] = clamp(this.stats[stat] + stat_change, 0, 100);
			}
			statChanges.push({ ...this.stats });
			this.pastEvents.push(event);
			if (typeof event['gameEnds'] !== 'undefined') {
				if (event['gameEnds']) {
					this.gameEnded = true;
					return statChanges;
				}
			}
		}
		return statChanges;
	}

	applyCard(card) {
		for (let stat of Object.keys(card['effects'])) {
			this.stats[stat] = clamp(
				this.stats[stat] + card['effects'][stat],
				0,
				100,
			);
		}
	}

	getNewCards() {
		if (this.gameEnded) {
			return [];
		}

		let cards = [...this.cards];
		let selectedCards = [];
		for (let i = 0; i < 3; i++) {
			let index = random_int(0, this.cards.length - 1);
			selectedCards.push(JSON.parse(JSON.stringify(this.cards[index])));
			cards.splice(index, 1);
		}
		for (let card of selectedCards) {
			for (let stat of Object.keys(card['effects'])) {
				card['effects'][stat] = random_int(
					card['effects'][stat][0],
					card['effects'][stat][1],
				);
			}
		}
		return selectedCards;
	}

	getGameStat() {
		return {
			stats: this.stats,
			currentCards: this.currentCards,
			pastEvents: this.pastEvents,
		};
	}

	// This function calculates the probability of an event occurring based on the current stats and year.
	getEventProbability(event) {
		if (
			event['dateRange']['earliestYear'] < this.currentYear ||
			event['dateRange']['latestYear'] > this.currentYear
		) {
			//return 0
		}
		let probability = event['baseProbability'];
		for (let stat of Object.keys(event['statRanges'])) {
			let info = event['statRanges'][stat];
			if (this.stats[stat] < info['min'] || this.stats[stat] > info['max']) {
				return 0;
			}
			let progress =
				(this.stats[stat] - info['min']) / (info['max'] - info['min']);
			let prog_change = info['probabilitySwing'] * progress + 1;
			probability *= prog_change;
		}
		return probability;
	}

	fromJSON(jsonData) {
		let data = JSON.parse(jsonData);
		this.pastEvents = data.past_events;
		this.stats = data.stats;
		this.currentYear = data.currentYear;
		this.gameEnded = data.gameEnded;
	}

	toJSON() {
		return JSON.stringify({
			past_events: this.pastEvents,
			stats: this.stats,
			currentYear: this.currentYear,
			gameEnded: this.gameEnded,
		});
	}
}

module.exports = GameManagerClass;
