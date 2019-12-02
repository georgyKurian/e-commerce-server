import faker from "faker";

faker.custom = {
  randomSubArray(list, quantity = null) {
    const newArray = [];
    if (!quantity) quantity = faker.random.number({ min: 1, max: list.length });
    for (let index = 0; index < quantity; index++) {
      newArray.push(
        list[faker.random.number({ min: 0, max: list.length - 1 })]
      );
    }
    return newArray;
  }
};

export default faker;
