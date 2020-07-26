import faker from 'faker';

faker.custom = {
  randomSubArray(list, isRandomSize = true, maxArraySize = null) {
    const newArray = [];
    let arraySize = maxArraySize;
    if (isRandomSize) { 
      maxArraySize = maxArraySize ? maxArraySize : list.length;
      arraySize = faker.random.number({ min: 1, max: maxArraySize }); 
    }
    let indexList = []
    for (let index = 0; index < arraySize; index++) {
      const productIndex = faker.random.number({ min: 0, max: list.length - 1 });
      if(!indexList.indexOf(productIndex)) {
        indexList.push(productIndex);
        newArray.push(list[productIndex]);
      }
    }
    return newArray;
  },
};

export default faker;
