function random_range(min,max) {
    // picks a random float in the range, inclusive
    let ran = Math.random();
    return ran*(max-min)+min;
}

function weighted_random_choice(data) {
    // takes data in the form [['item1',2], ['item2',1], ['item3',4]]
    // returns the index //not ->// returns one of the keys e.g. 'item1' with its weighted probability, for item 1 being 2/7

    let total_weight = 0;
    for (let info of data) {
        total_weight += info[1];
    }
    let ran_val = random_range(0, total_weight);
    for (let i=0;i<data.length;i++) {
        ran_val -= data[i][1];
        if (ran_val < 0) {
            return data[i][0]; // return the key, not the index
        }
    }
    console.log('weighted random function broke', ran_val, data, total_weight);
}

class GameManagerClass {
	constructor(events, cards) {
		this.events = events;
		this.cards = cards;
		this.past_events = {};
		this.stats = {
			economy: 50,
			environment: 50,
			politics: 50,
			military: 50,
			qualityOfLife: 50,
		};

		this.currentYear = 2025;
	}

	selectCard() {
		// Placeholder for card selection logic
	}

	incrementYear(selectedCard) {
		let newEvents = this.getNewEvents();
		let newCards = this.getNewCards();

		this.currentYear += 1;
	}

	getNewEvents() {
		let possibleEvents = [];
		for (let event of this.events) {
			possibleEvents.push([event, this.getEventProbability(event)]);
		}
		let selectedEvents = [];
		let i = 0;
		let max_events = random_range(2, 4);
		while (i < max_events && possibleEvents.length > 0) {
			let new_event_index = weighted_random_choice(possibleEvents);
			selectedEvents.push(possibleEvents[new_event_index]);
			possibleEvents.splice(new_event_index, 1);
		}
		return selectedEvents;
	}

	getNewCards() {
		// Placeholder for card generation logic
	}

	getStats() {
		return this.stats;
	}

	getEventProbability(event) {
		if (
			event['dateRange']['earliestYear'] < this.currentYear ||
			event['dateRange']['latestYear'] > this.currentYear
		) {
			return 0;
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
}

module.exports = GameManagerClass;