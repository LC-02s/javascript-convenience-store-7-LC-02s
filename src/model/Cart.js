import { ProductDatabase } from '../data/index.js';
import ProductValidator from './ProductValidator.js';

/** @typedef {import('../types/index.js').Product} Product */

class Cart {
  /** @type {Map<Product['name'], Product['quantity']>} */
  #productList;

  /** @type {ProductDatabase} */
  #productDB;

  /**
   * @param {string[]} inputs
   * @param {ProductDatabase} productDB
   */
  constructor(inputs, productDB) {
    this.#productDB = productDB;
    this.#productList = new Map();
    this.addProduct(inputs);
  }

  /** @param {string[]} inputs */
  addProduct(inputs) {
    ProductValidator.validate(inputs, this.#productDB);
    ProductValidator.parseInput(inputs).forEach(({ name, quantity }) => {
      if (this.#productList.has(name)) {
        this.#productList.set(name, this.#productList.get(name) + quantity);
        return;
      }

      this.#productList.set(name, quantity);
    });
  }

  getProductList() {
    return [...this.#productList.entries()].map(([name, quantity]) => {
      return { name, quantity };
    });
  }
}

export default Cart;
