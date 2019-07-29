let product;
product = ['table', 500];
product.forEach(elt => {
    console.log(elt);
});
function logScores(...scores) {
    console.log(scores);
}
logScores(50, 70, 75);
function logScore(score1, score2, score3) {
    console.log(score1, score2, score3);
}
const scores = [50, 70, 75];
logScore(...scores);
const billyScores = ['Billy', 60, 70, 75];
const sallyScores = ['Sally', 60, 70, 75, 70];
function logNameAndScores(...scores) {
    console.log(scores);
}
logNameAndScores('Sally', 60, 70, 75, 70);
const empty = [];
const benScores = [];
const samScores = [55];
const bobScores = [95, 75];
const jayneScores = [65, 50, 70];
const henryScores = [55];
const jeanScores = [95, 75];
const robertScores = [65, 50, 70];
function logScores3(...scores) {
    console.log(scores);
}
logScores3(45, 58, 80);
function logScores3Enhanced(...scores) {
    if (scores.length === 3) {
        console.log(scores, 'thank you for logging all 3 scores');
    }
    else {
        console.log(scores);
    }
}
logScores3Enhanced(60, 70, 75);
logScores3Enhanced(60, 70);
logScores3Enhanced(60);
//# sourceMappingURL=tuples.js.map