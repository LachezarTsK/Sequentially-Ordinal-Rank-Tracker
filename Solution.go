
package main

import (
    "container/heap"
    "fmt"
)

type SORTracker struct {
    minHeap         PriorityQueue
    maxHeap         PriorityQueue
    numberOfQueries int
}

func Constructor() SORTracker {
    sortracker := SORTracker{
        minHeap: PriorityQueue{
            container:  make([]*Place, 0),
            comparator: comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName},
        maxHeap: PriorityQueue{
            container:  make([]*Place, 0),
            comparator: comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName},
        numberOfQueries: 0,
    }
    return sortracker
}

func (this *SORTracker) Add(name string, score int) {
    heap.Push(&this.minHeap, &Place{name: name, score: score})
    if this.minHeap.Len() > this.numberOfQueries+1 {
        heap.Push(&this.maxHeap, heap.Pop(&this.minHeap).(*Place))
    }
}

func (this *SORTracker) Get() string {
    this.numberOfQueries++

    placeWithRankEqualToTheNumberOfQueries := this.minHeap.container[0]
    if this.maxHeap.Len() > 0 {
        heap.Push(&this.minHeap, heap.Pop(&this.maxHeap).(*Place))
    }
    return placeWithRankEqualToTheNumberOfQueries.name
}

func Ternary[T any](condition bool, first T, second T) T {
    if condition {
        return first
    }
    return second
}

type Place struct {
    name  string
    score int
}

type PriorityQueue struct {
    container  []*Place
    comparator func(container []*Place, first, second int) bool
}

func comparatorMinScoreOnTopByEqualScoresLexicographicallyLargestName(container []*Place, first int, second int) bool {
    return Ternary((container[first].score == container[second].score),
                   (container[second].name < container[first].name),
                   (container[first].score < container[second].score))
}

func comparatorMaxScoreOnTopByEqualScoresLexicographicallySmallestName(container []*Place, first int, second int) bool {
    return Ternary((container[first].score == container[second].score),
                   (container[second].name > container[first].name),
                   (container[first].score > container[second].score))
}

func (pq PriorityQueue) Len() int {
    return len(pq.container)
}

func (pq PriorityQueue) Less(first int, second int) bool {
    return pq.comparator(pq.container, first, second)
}

func (pq PriorityQueue) Swap(first int, second int) {
    pq.container[first], pq.container[second] = pq.container[second], pq.container[first]
}

func (pq *PriorityQueue) Push(object any) {
    place := object.(*Place)
    (*pq).container = append((*pq).container, place)
}

func (pq *PriorityQueue) Pop() any {
    length := len((*pq).container)
    place := ((*pq).container)[length-1]
    ((*pq).container)[length-1] = nil
    ((*pq).container) = ((*pq).container)[0 : length-1]
    return place
}
