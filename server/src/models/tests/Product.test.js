import ProductModel from "../Product";

test("It accepts all params and implements all methods", () => {
  const raw = { id: "1234", name: "WHMIS", price: 23, images: ["1"] };
  const product = new ProductModel(raw);
  expect(product.getData()).toEqual(raw);
});
