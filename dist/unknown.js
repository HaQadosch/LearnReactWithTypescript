function logScoresAny(scores) {
    console.log(scores.firstName);
    console.log(scores.scores);
}
logScoresAny({
    name: 'Billy',
    scores: [60, 70, 75]
});
const scoreCheck = (scores) => {
    return 'name' in scores && 'scores' in scores;
};
function logScoresUnknown(scores) {
    if (scoreCheck(scores)) {
        // console.log(scores.firstName)
        console.log(scores.scores);
    }
}
function logScores2Unknown(scores) {
    // console.log((scores as Scores4).firstName)
    console.log(scores.scores);
}
//# sourceMappingURL=unknown.js.map