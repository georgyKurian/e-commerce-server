import Product from "./Product";

export default class Order {
  /**
   * @param  {string} id
   * @param  {string} customer
   * @param  {number} timestamp
   * @param  {Array} products
   * @param  {Array} contact
   * @param  {Array} shippingAddress
   */
  constructor({
    _id,
    customer,
    timestamp,
    products,
    contact,
    shippingAddress
  }) {
    this._id = _id;
    this._customer = customer;
    this._timestamp = timestamp;
    this._products = products.map(product => new Product(product));
  }

  /**
   * @return {string}
   */
  getId = () => this._id;

  /**
   * @return {string}
   */
  getCustomer = () => this._customer;

  /**
   * @return {nustringmber}
   */
  getTimestamp = () => this._timestamp;

  /**
   * @return {Array.<Products>}
   */
  getProducts = () => this._products;

  getTotalPrice = () =>
    this._products.reduce((sum, product) => sum + product.getPrice(), 0);

  getFormattedTotalPrice = () => `$${this.getTotalPrice() / 100}`;

  /**
   * @return  {{_id: string, customer: string, timestamp: string, products: Array<Products>}}
   */
  getData = () => ({
    _id: this._id,
    customer: this._customer,
    timestamp: this._timestamp,
    products: this._products.map(product => product.getData())
  });
}
