import { ProductDatabase } from '../data/index.js';

/** @typedef {import('../types/index.js').Product} Product */

class Cashier {
  /** @type {Pick<Product, 'name' | 'quantity'>[]} */
  #productList;

  /** @type {ProductDatabase} */
  #productDB;

  /**
   * @param {Pick<Product, 'name' | 'quantity'>[]} productList
   * @param {ProductDatabase} productDB
   */
  constructor(productList, productDB) {
    this.#productList = productList;
    this.#productDB = productDB;
  }

  #computeTotalPurchaseAmount() {
    return this.#productList.reduce((total, { name, quantity }) => {
      const unit = this.#productDB.findPriceByName({ name }) ?? 0;
      const price = unit * quantity;

      return total + price;
    }, 0);
  }

  #computeTotalPurchaseQuantity() {
    return this.#productList.reduce((total, { quantity }) => {
      return total + quantity;
    }, 0);
  }
}

export default Cashier;
