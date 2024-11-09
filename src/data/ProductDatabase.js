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
}

export default ProductDatabase;
