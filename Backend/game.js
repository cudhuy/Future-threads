class GameManagerClass {
	constructor(events) {
		this.events = events;
		this.past_events = {};
		this.stats = {
			economy: 50,
			environment: 5,
			politics: 5,
			military: 5,
			qualityOfLife: 5,
		};
		this.currentYear = 2025;
	}
	generateCards() {
		// Placeholder for card generation logic
	}
	selectCard() {
		// Placeholder for card selection logic
	}
	incrementYear() {
		// returns new events
		let possibleEvents = [];

		this.currentYear += 1;
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
		}
	}
}

module.exports = GameManagerClass;
