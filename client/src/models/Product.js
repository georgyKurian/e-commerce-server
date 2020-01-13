export default class Product {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {number} price
   * @param  {boolean} isFeatured
   * @param  {Array.<string>} images
   * @param  {Array.<string>} categories
   * @param  {string} avgRating
   * @param  {string} reviewCount
   */
  constructor({
    _id,
    name,
    price,
    isFeatured,
    images,
    categories,
    avgRating,
    reviewCount
  }) {
    this._id = _id;
    this._name = name;
    this._price = price;
    this._isFeatured = isFeatured;
    this._images = images;
    this._categories = categories;
    this._avgRating = avgRating;
    this._reviewCount = reviewCount;
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
  getIsFeatured = () => this._isFeatured;

  /**
   * @return {string[]}
   */
  getImages = () => this._images;

  /**
   * @return {string[]}
   */
  getCategories = () => this._categories;

  /**
   * @return {string}
   */
  getAvgRating = () => this._avgRating;

  /**
   * @return {string}
   */
  getReviewCount = () => this._reviewCount;

  /**
   * @return  {{_id: string, name: string, prie: number, images: Array<string>, categories: Array<string>, avgRating: string,  reviewCount: string}}
   */
  getData = () => ({
    _id: this._id,
    name: this._name,
    price: this._price,
    isFeatured: this._isFeatured,
    formattedPrice: this.getFormattedPrice(),
    images: this._images,
    categories: this._categories,
    avgRating: this._avgRating,
    reviewCount: this._reviewCount
  });
}
