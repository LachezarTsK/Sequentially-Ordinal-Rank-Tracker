
using System;
using System.Collections.Generic;

public class SORTracker
{
    private sealed record Place(String name, int score){}

    private readonly PriorityQueue<Place, Place> minHeap = new PriorityQueue<Place, Place>(
            comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName);

    private readonly PriorityQueue<Place, Place> maxHeap = new PriorityQueue<Place, Place>(
            comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName);

    private int numberOfQueries;

    private static Comparer<Place> comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName
         = Comparer<Place>.Create((x, y) => (x.score == y.score) ? (y.name.CompareTo(x.name)) : (x.score - y.score));

    private static Comparer<Place> comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName
        = Comparer<Place>.Create((x, y) => (x.score == y.score) ? (x.name.CompareTo(y.name)) : (y.score - x.score));

    public void Add(string name, int score)
    {
        Place place = new Place(name, score);
        minHeap.Enqueue(place, place);

        if (minHeap.Count > numberOfQueries + 1)
        {
            place = minHeap.Dequeue();
            maxHeap.Enqueue(place, place);
        }
    }

    public string Get()
    {
        ++numberOfQueries;

        Place placeWithRankEqualToTheNumberOfQueries = minHeap.Peek();
        if (maxHeap.Count > 0)
        {
            Place place = maxHeap.Dequeue();
            minHeap.Enqueue(place, place);
        }
        return placeWithRankEqualToTheNumberOfQueries.name;
    }
}
