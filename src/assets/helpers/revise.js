function isLoadingKnowledgeFinished(dateStart) {
  return new Date(Date.now() - dateStart).getDate() > 3 // actually "4"
}
function getNextReviseDate({n, dateStart}) {
  return dateStart.getDate() + 2 ** n
}
function isShouldRevisedQuestion({dateStart, n}) {
  if (!arguments || !isLoadingKnowledgeFinished(dateStart)) return true 
    // case, when there wasn't answer before: !arguments
  return getNextReviseDate({n, dateStart}) < new Date().getDate()
}


export {
  isLoadingKnowledgeFinished,
  getNextReviseDate,
  isShouldRevisedQuestion,
}