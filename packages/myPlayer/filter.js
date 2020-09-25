function filterSplitClass(val) {
  const obj = {
    '1': 'splitScreen-01',
    '2': 'splitScreen-02',
    '4': 'splitScreen-04',
    '9': 'splitScreen-09',
    '16': 'splitScreen-16',
  }
  if(val){
    return obj[val]
  } else {
    return ''
  }
}
export {filterSplitClass}
