export default class Review {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {string} comment
   * @param  {string} customerName
   * @param  {number} rating
   * @param  {string} updatedAt
   */
  constructor({ _id, title, comment, customerName, rating, updatedAt }) {
    this._id = _id;
    this._title = title;
    this._comment = comment;
    this._customerName = customerName;
    this._rating = rating;
    this._updatedAt = updatedAt;
  }

  /**
   * @return {string}
   */
  getId = () => this._id;

  /**
   * @return {string}
   */
  getTitle = () => this._title;

  /**
   * @return {string}
   */
  getComment = () => this._comment;

  /**
   * @return {string}
   */
  getcustomerName = () => this._customerName;

  /**
   * @return {number}
   */
  getRating = () => this._rating;

  /**
   * @return {string}
   */
  getUpdatedAt = () => this._updatedAt;

  /**
   * @return  {{_id: string, name: string, prie: number, images: Array<string>}}
   */
  getData = () => ({
    _id: this._id,
    name: this._title,
    price: this._comment,
    isFeatured: this._customerName,
    formattedPrice: this._rating,
    updatedAt: this._updatedAt
  });
}
