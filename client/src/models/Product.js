export default class Product {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {number} price
   * @param  {Array.<string>} images
   */
  constructor({ _id, name, price, images, categories }) {
    this._id = _id;
    this._name = name;
    this._price = price;
    this._images = images;
  }

  /**
   * @return {string}
   */
  getId = () => this._id;

  /**
   * @return {string}
   */
  getName = () => this._name;

  /**
   * @return {string}
   */
  getFormattedPrice = () => `$${this._price/100}`;

  /**
   * @return {number}
   */
  getPrice = () => this._price;

  /**
   * @return {string}
   */
  getImages = () => this._images;

  /**
   * @return  {{_id: string, name: string, prie: number, images: Array<string>}}
   */
  getData = () => ({
    _id: this._id,
    name: this._name,
    price: this._price,
    formattedPrice: this.getFormattedPrice(),
    images: this._images,
    categories: this._categories
  });
}
