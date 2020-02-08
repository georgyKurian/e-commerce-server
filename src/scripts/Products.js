import faker from 'faker';

export default (() => {
  const productList = [];

  for (let id = 1; id <= 30; id += 1) {
    const categories = [];
    const catCount = faker.random.number(5);
    for (let catIndex = 0; catIndex < catCount; catIndex++) {
      categories.push(faker.hacker.adjective());
    }
    productList.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      // faker.image.image(1280, 720, false)
      images: [
        `https://picsum.photos/id/${id * 2 - 1}/1280/720`,
        `https://picsum.photos/id/${id * 2}/1280/720`,
      ],
      categories,
      isFeatured: faker.random.number({ min: 0, max: 10 }) > 7,
    });
  }
  return productList;
})();
