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
    this.addProductList(inputs);
  }

  /** @param {string[]} inputs */
  addProductList(inputs) {
    ProductValidator.validate(inputs, this.#productDB);
    ProductValidator.parseInput(inputs).forEach((product) => {
      this.addProduct(product);
    });
  }

  /** @param {Pick<Product, 'name' | 'quantity'>} product */
  addProduct({ name, quantity }) {
    if (this.#productList.has(name)) {
      this.#productList.set(name, this.#productList.get(name) + quantity);
      return;
    }

    this.#productList.set(name, quantity);
  }

  /** @param {Pick<Product, 'name' | 'quantity'>} product */
  removeProduct({ name, quantity }) {
    if (!this.#productList.has(name)) return;

    const prevQuantity = this.#productList.get(name) ?? 0;

    if (prevQuantity <= quantity) {
      this.#productList.delete(name);
      return;
    }

    this.#productList.set(name, prevQuantity - quantity);
  }

  getProductList() {
    return [...this.#productList.entries()].map(([name, quantity]) => {
      return { name, quantity };
    });
  }
}

export default Cart;
