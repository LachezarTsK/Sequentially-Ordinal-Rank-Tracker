
// const {PriorityQueue} = require('@datastructures-js/priority-queue');
/*
 PriorityQueue is internally included in the solution file on leetcode.
 So, when running the code on leetcode it should stay commented out. 
 It is mentioned here as a comment, just for information about 
 which external library is applied for this data structure.
*/

class SORTracker {

    private minHeap = new MinPriorityQueue(
        { compare: (x, y) => this.comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName(x, y) });

    private maxHeap = new MaxPriorityQueue(
        { compare: (x, y) => this.comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName(x, y) });

    private numberOfQueries: number = 0;

    private comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName(x: Place, y: Place): number {
        return (x.score === y.score) ? (y.name.localeCompare(x.name)) : (x.score - y.score);
    }

    private comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName(x: Place, y: Place): number {
        return (x.score === y.score) ? (x.name.localeCompare(y.name)) : (y.score - x.score);
    }

    add(name: string, score: number): void {
        this.minHeap.enqueue(new Place(name, score));
        if (this.minHeap.size() > this.numberOfQueries + 1) {
            this.maxHeap.enqueue(this.minHeap.dequeue());
        }
    }

    get(): string {
        ++this.numberOfQueries;

        const placeWithRankEqualToTheNumberOfQueries = this.minHeap.front();
        if (!this.maxHeap.isEmpty()) {
            this.minHeap.enqueue(this.maxHeap.dequeue());
        }
        return placeWithRankEqualToTheNumberOfQueries.name;
    }
}

class Place {

    name: string;
    score: number;

    constructor(name: string, score: number) {
        this.name = name;
        this.score = score;
    }
}
