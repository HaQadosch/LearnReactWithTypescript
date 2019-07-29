let product: [string, number]
product = ['table', 500]

product.forEach(elt => {
  console.log(elt)
})

function logScores(...scores: [...number[]]) {
  console.log(scores)
}
logScores(50, 70, 75)

function logScore (score1: number, score2: number, score3: number) {
  console.log(score1, score2, score3)
}
const scores: [number, number, number] = [50, 70, 75]

logScore(...scores)

type Scores = [string, ...number[]]
const billyScores: Scores = ['Billy', 60, 70, 75]
const sallyScores: Scores = ['Sally', 60, 70, 75, 70]

function logNameAndScores(...scores: Scores) {
  console.log(scores)
}
logNameAndScores('Sally', 60, 70, 75, 70)


type Empty = []
type Scores2 = [] | [number] | [number, number] | [number, number, number]
const empty: Empty = []

const benScores: Scores2 = [];
const samScores: Scores2 = [55];
const bobScores: Scores2 = [95, 75];
const jayneScores: Scores2 = [65, 50, 70];
// const sarahScores: Scores2 = [95, 50, 75, 75];

type Scores3 = [number, number?, number?]
const henryScores: Scores3 = [55];
const jeanScores: Scores3 = [95, 75];
const robertScores: Scores3 = [65, 50, 70];

function logScores3(...scores: Scores3) {
  console.log(scores)
}
logScores3(45, 58, 80)

function logScores3Enhanced(...scores: Scores3) {
  if (scores.length === 3) {
    console.log(scores, 'thank you for logging all 3 scores')
  } else {
    console.log(scores)
  }
}
logScores3Enhanced(60, 70, 75)
logScores3Enhanced(60, 70)
logScores3Enhanced(60)
