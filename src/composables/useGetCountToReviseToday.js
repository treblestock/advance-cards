import {
  isShouldRevisedQuestion,
} from '@/assets/helpers'


export default function(set, setAnswersStats) {
  if (!set || !setAnswersStats) return 0
  const questions = Array.isArray(set) ? set : Object.keys(set)
  return questions.reduce((toReviseCount, question) => {
    return isShouldRevisedQuestion(setAnswersStats[question])
      ? ++toReviseCount
      : toReviseCount
  }, 0)
}