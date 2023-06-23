export function convertDateToString(date) {
  const realDate = new Date(date)
  return realDate.toLocaleDateString()
}

export function convertDateForDatePicker(date) {
  const realDate = new Date(date)

  return realDate.toLocaleDateString().split('/').reverse().join('-')
}
