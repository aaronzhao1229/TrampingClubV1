export function convertDateToString(date) {
  // const yyyymmdd = date.split('T')[0]
  // const ymdArray = yyyymmdd.split('-')

  // let day = ymdArray[2]
  const realDate = new Date(date)
  return realDate.toLocaleDateString()
}

export function convertDateForDatePicker(date) {
  const realDate = new Date(date)

  return realDate.toLocaleDateString().split('/').reverse().join('-')
}
