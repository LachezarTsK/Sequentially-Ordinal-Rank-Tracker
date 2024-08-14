
// const {PriorityQueue} = require('@datastructures-js/priority-queue');

class SORTracker {

    #minHeap = new MinPriorityQueue(
            {compare: (x, y) => this.#comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName(x, y)});

    #maxHeap = new MaxPriorityQueue(
            {compare: (x, y) => this.#comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName(x, y)});

    #numberOfQueries = 0;

    /** 
     * @param {Place} x 
     * @param {Place} y
     * @return {number}
     */
    #comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName(x, y) {
        return (x.score === y.score) ? (y.name.localeCompare(x.name)) : (x.score - y.score);
    }

    /** 
     * @param {Place} x 
     * @param {Place} y
     * @return {number}
     */
    #comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName(x, y) {
        return (x.score === y.score) ? (x.name.localeCompare(y.name)) : (y.score - x.score);
    }

    /** 
     * @param {string} name 
     * @param {number} score
     * @return {void}
     */
    add(name, score) {
        this.#minHeap.enqueue(new Place(name, score));
        if (this.#minHeap.size() > this.#numberOfQueries + 1) {
            this.#maxHeap.enqueue(this.#minHeap.dequeue());
        }
    }

    /**
     * @return {string}
     */
    get() {
        ++this.#numberOfQueries;

        const placeWithRankEqualToTheNumberOfQueries = this.#minHeap.front();
        if (!this.#maxHeap.isEmpty()) {
            this.#minHeap.enqueue(this.#maxHeap.dequeue());
        }
        return placeWithRankEqualToTheNumberOfQueries.name;
    }
}

/** 
 * @param {string} name 
 * @param {number} score
 */
function Place(name, score) {
    this.name = name;
    this.score = score;
}
