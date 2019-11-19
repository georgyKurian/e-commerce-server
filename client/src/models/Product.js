export default class Product {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {number} price
   * @param  {boolean} isFeatured
   * @param  {Array.<string>} images
   */
  constructor({ _id, name, price, isFeatured, images, categories }) {
    this._id = _id;
    this._name = name;
    this._price = price;
    this._isFeatured = isFeatured;
    this._images = images;
    this._categories = categories;
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
  getFormattedPrice = () => `$${this._price / 100}`;

  /**
   * @return {number}
   */
  getPrice = () => this._price;

  /**
   * @return {boolean}
   */
  getIsFeatured = () => (this.this._isFeatured = isFeatured);

  /**
   * @return {string[]}
   */
  getImages = () => this._images;

  /**
   * @return {string[]}
   */
  getImages = () => this._images;

  /**
   * @return  {{_id: string, name: string, prie: number, images: Array<string>}}
   */
  getData = () => ({
    _id: this._id,
    name: this._name,
    price: this._price,
    isFeatured: this._isFeatured,
    formattedPrice: this.getFormattedPrice(),
    images: this._images,
    categories: this._categories
  });
}
