import { ProductDatabase, PromotionDatabase } from '../data/index.js';
import { Cart, ProductValidator } from '../model/index.js';
import { getUserInputLoop } from '../utils/index.js';
import { InputView, OutputView } from '../view/index.js';

class StoreController {
  /** @type {ProductDatabase} */
  #productDB;

  /** @type {PromotionDatabase} */
  #promotionDB;

  constructor() {
    this.#productDB = new ProductDatabase();
    this.#promotionDB = new PromotionDatabase();
  }

  async run() {
    const productList = await this.#getProductSelection();
    const cart = new Cart(productList, this.#productDB);
  }

  async #getProductSelection() {
    this.#productDB.printAll(OutputView.printProductAll);

    return await getUserInputLoop({
      reader: InputView.readProductSelection,
      validator: (productList) =>
        ProductValidator.validate(productList, this.#productDB),
    });
  }
}

export default StoreController;
