import faker from 'faker';

faker.custom = {
  randomSubArray(list, isRandomSize = true, arraySize = null) {
    const newArray = [];
    if (isRandomSize && !arraySize) { arraySize = faker.random.number({ min: 1, max: list.length }); }
    for (let index = 0; index < arraySize; index++) {
      newArray.push(
        list[faker.random.number({ min: 0, max: list.length - 1 })],
      );
    }
    return newArray;
  },
};

export default faker;
