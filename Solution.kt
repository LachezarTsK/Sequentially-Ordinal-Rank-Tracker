
import java.util.PriorityQueue

class SORTracker() {

    private data class Place(val name: String, val score: Int){}

    private val minHeap =
        PriorityQueue<Place>() { x, y -> comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName(x, y) }

    private val maxHeap =
        PriorityQueue<Place>() { x, y -> comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName(x, y) }

    private var numberOfQueries: Int = 0

    private fun comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName(x: Place, y: Place): Int {
        return if (x.score == y.score) (y.name.compareTo(x.name)) else (x.score - y.score)
    }

    private fun comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName(x: Place, y: Place): Int {
        return if (x.score == y.score) (x.name.compareTo(y.name)) else (y.score - x.score)
    }

    fun add(name: String, score: Int) {
        minHeap.add(Place(name, score))
        if (minHeap.size > numberOfQueries + 1) {
            maxHeap.add(minHeap.poll())
        }
    }

    fun get(): String {
        ++numberOfQueries

        val placeWithRankEqualToTheNumberOfQueries = minHeap.peek()
        if (!maxHeap.isEmpty()) {
            minHeap.add(maxHeap.poll())
        }
        return placeWithRankEqualToTheNumberOfQueries.name
    }
}
