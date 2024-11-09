import { DATA_PATH } from '../constants/index.js';
import { parseCSV, readFileSync } from '../utils/index.js';

/** @typedef {import('../types/index.js').Promotion} Promotion */

class PromotionDatabase {
  /** @type {Promotion[]} */
  #data;

  constructor() {
    const promotionCSV = readFileSync(DATA_PATH.PROMOTION_CSV);
    this.#data = parseCSV(promotionCSV);
  }

  /** @param {Pick<Promotion, 'name'>} query */
  findByName({ name }) {
    return this.#data.find((promotion) => promotion.name === name);
  }
}

export default PromotionDatabase;
