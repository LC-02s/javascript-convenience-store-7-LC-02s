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

  /** @param {Pick<Product, 'name'>} query */
  findByName({ name }) {
    return this.#data.filter((product) => product.name === name);
  }

  /** @param {Pick<Product, 'id'>} query */
  findById({ id }) {
    return this.#data[id];
  }

  /** @param {(data: Product[]) => void} printer */
  printAll(printer) {
    printer(this.#data);
  }
}

export default ProductDatabase;
