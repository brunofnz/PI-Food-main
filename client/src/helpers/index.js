export function paginationArray(array, num) {
    let resultArray = [];
    let count = 0;
    let numArray = [];
  
    for (const element of array) {
      if(count === num){
        resultArray.push(numArray);
        count = 0;
        numArray = [];
      }
      numArray.push(element)
      count++;
    }
    resultArray.push(numArray);
    return resultArray;
}

export function orderArray(array, option) {
  function SortArrayByNameAsc(x, y){
    if (x.title < y.title) {return -1;}
    if (x.title > y.title) {return 1;}
    return 0;
  }

  function SortArrayByNameDesc(x, y){
    if (x.title > y.title) {return -1;}
    if (x.title < y.title) {return 1;}
    return 0;                                                                                                                                                                                                                        
  }

  function SortArrayByHealthScore(x, y){
    if (x.health_score < y.health_score) {return 1;}
    if (x.health_score > y.health_score) {return -1;}
    return 0;
  }

  switch (option) {
    case 'asc':
      return array.sort(SortArrayByNameAsc);
    case 'desc':
      return array.sort(SortArrayByNameDesc);
    case 'health_score':
      return array.sort(SortArrayByHealthScore);
    default:
      break;
  }
}