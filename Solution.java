
import java.util.PriorityQueue;

public class SORTracker {

    private record Place(String name, int score){}

    private final PriorityQueue<Place> minHeap = new PriorityQueue<>(
            (x, y) -> comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName(x, y));

    private final PriorityQueue<Place> maxHeap = new PriorityQueue<>(
            (x, y) -> comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName(x, y));

    private int numberOfQueries;

    private int comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName(Place x, Place y) {
        return (x.score == y.score) ? (y.name.compareTo(x.name)) : (x.score - y.score);
    }

    private int comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName(Place x, Place y) {
        return (x.score == y.score) ? (x.name.compareTo(y.name)) : (y.score - x.score);
    }

    public void add(String name, int score) {
        minHeap.add(new Place(name, score));
        if (minHeap.size() > numberOfQueries + 1) {
            maxHeap.add(minHeap.poll());
        }
    }

    public String get() {
        ++numberOfQueries;

        Place placeWithRankEqualToTheNumberOfQueries = minHeap.peek();
        if (!maxHeap.isEmpty()) {
            minHeap.add(maxHeap.poll());
        }
        return placeWithRankEqualToTheNumberOfQueries.name;
    }
}
