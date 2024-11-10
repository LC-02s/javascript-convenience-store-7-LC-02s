import { DATA_PATH } from '../constants/index.js';
import { parseCSV, readFileSync } from '../utils/index.js';

/** @typedef {import('../types/index.js').Product} Product */

class ProductDatabase {
  /** @type {Product[]} */
  #data;

  constructor() {
    const productCSV = readFileSync(DATA_PATH.PRODUCT_CSV);
    this.#data = parseCSV(productCSV);
  }

  /** @param {Pick<Product, 'name' | 'quantity'>} product */
  putProductQuantityByName({ name, quantity }) {
    for (const { id, quantity: targetQuantity } of this.findByName({ name })) {
      if (targetQuantity >= quantity) {
        this.#data[id].quantity -= quantity;
        break;
      }

      quantity -= targetQuantity;
      this.#data[id].quantity = 0;
    }
  }

  /** @param {Pick<Product, 'name'>} query */
  findWithPromotionByName({ name }) {
    return this.#data.find((product) => {
      return !!product.promotion && product.name === name;
    });
  }

  /** @param {Pick<Product, 'name'>} query */
  findByName({ name }) {
    return this.#data.filter((product) => product.name === name);
  }

  /**
   * @param {Pick<Product, 'id'>} query
   * @returns {Product}
   */
  findById({ id }) {
    return { ...this.#data[id] };
  }

  /** @param {(data: Product[]) => void} printer */
  printAll(printer) {
    printer(this.#data);
  }
}

export default ProductDatabase;
