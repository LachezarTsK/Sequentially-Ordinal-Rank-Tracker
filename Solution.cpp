
/*
// The code will run faster with ios::sync_with_stdio(0).
// However, this should not be used in production code and interactive problems.
// In this particular problem, it is ok to apply ios::sync_with_stdio(0).

// Many of the top-ranked C++ solutions for time on leetcode apply this trick,
// so, for a fairer assessment of the time percentile of my code
// you could outcomment the lambda expression below for a faster run.
const static auto speedup = [] {
    ios::sync_with_stdio(0);
    return nullptr;
}();
*/

class SORTracker {

    struct Place {
        string name;
        int score;
        Place(const string& name, int score) : name{ name }, score{ score } {}
    };

    struct comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName {
        bool operator()(const Place& x, const Place& y) const {
            return (x.score == y.score) ? (y.name > x.name) : (x.score > y.score);
        }
    };

    struct comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName {
        bool operator()(const Place& x, const Place& y) const {
            return (x.score == y.score) ? (y.name < x.name) : (x.score < y.score);
        }
    };

    using MinHeap = priority_queue<Place, vector<Place>,
                    comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName>;

    using MaxHeap = priority_queue<Place, vector<Place>,
                    comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName>;

    MinHeap minHeap;
    MaxHeap maxHeap;

    int numberOfQueries = 0;

public:
    void add(string name, int score) {
        minHeap.emplace(name, score);
        if (minHeap.size() > numberOfQueries + 1) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }

    string get() {
        ++numberOfQueries;
        
        Place placeWithRankEqualToTheNumberOfQueries = minHeap.top();
        if (!maxHeap.empty()) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        }      
        return placeWithRankEqualToTheNumberOfQueries.name;
    }
};
