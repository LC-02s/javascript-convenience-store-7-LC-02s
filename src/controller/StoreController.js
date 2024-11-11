import { ProductDatabase } from '../data/index.js';
import { Cart, ProductValidator } from '../model/index.js';
import { getUserInputLoop } from '../utils/index.js';
import { InputView, OutputView } from '../view/index.js';

class StoreController {
  /** @type {ProductDatabase} */
  #productDB;

  /** @type {Cart} */
  #cart;

  constructor() {
    this.#productDB = new ProductDatabase();
  }

  async run() {
    let intentionToPurchase = true;

    while (intentionToPurchase) {
      await this.#process();

      intentionToPurchase = await InputView.confirmToBuyOtherProducts();
    }
  }

  async #process() {
    const productList = await this.#addProductListToCart();
  }

  async #addProductListToCart() {
    const productInput = await this.#getProductSelection();

    this.#cart = new Cart(productInput, this.#productDB);

    return this.#cart.getProductList();
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
