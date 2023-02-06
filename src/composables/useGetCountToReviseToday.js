import {
  isShouldRevisedQuestion,
} from '@/assets/helpers'


export default function(set, setAnswersStats) {
  if (!set || !setAnswersStats) return 0
  return Object.keys(set).reduce((toReviseCount, question) => {
    return isShouldRevisedQuestion(setAnswersStats[question])
      ? ++toReviseCount
      : toReviseCount
  }, 0)
}