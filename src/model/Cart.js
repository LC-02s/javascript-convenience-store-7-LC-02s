import { ProductDatabase } from '../data/index.js';
import ProductValidator from './ProductValidator.js';

/** @typedef {import('../types/index.js').Product} Product */

class Cart {
  /** @type {Map<Pick<Product, 'name'>['name'], Pick<Product, 'quantity'>['quantity']>} */
  #products;

  /**
   * @param {string[]} inputs
   * @param {ProductDatabase} productDB
   */
  constructor(inputs, productDB) {
    this.#products = new Map();
    this.addProduct(inputs, productDB);
  }

  /**
   * @param {string[]} inputs
   * @param {ProductDatabase} productDB
   */
  addProduct(inputs, productDB) {
    ProductValidator.validate(inputs, productDB);
    ProductValidator.parseInput(inputs).forEach(({ name, quantity }) => {
      if (this.#products.has(name)) {
        this.#products.set(name, this.#products.get(name) + quantity);
        return;
      }

      this.#products.set(name, quantity);
    });
  }

  getProducts() {
    return [...this.#products.entries()].map(([name, quantity]) => {
      return { name, quantity };
    });
  }
}

export default Cart;
