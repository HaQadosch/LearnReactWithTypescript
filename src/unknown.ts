function logScoresAny(scores: any) {
  console.log(scores.firstName)
  console.log(scores.scores)
}

logScoresAny({
  name: 'Billy',
  scores: [60, 70, 75]
})

type Scores4 = { name: string; scores: number[] }
const scoreCheck = ( scores: any ): scores is Scores4 => {
  return 'name' in scores && 'scores' in scores
}

function logScoresUnknown(scores: unknown) {
  if (scoreCheck(scores)) {
    // console.log(scores.firstName)
    console.log(scores.scores)
  }
}

function logScores2Unknown(scores: unknown) {
  // console.log((scores as Scores4).firstName)
  console.log((scores as Scores4).scores)
}

