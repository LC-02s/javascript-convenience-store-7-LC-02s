import { ProductDatabase } from '../data/index.js';
import { Cart, ProductValidator, PromotionChecker } from '../model/index.js';
import { getUserInputLoop } from '../utils/index.js';
import { InputView, OutputView } from '../view/index.js';

/** @typedef {import('../types/index.js').Product} Product */

class StoreController {
  /** @type {ProductDatabase} */
  #productDB;

  /** @type {Cart} */
  #cart;

  /** @type {PromotionChecker} */
  #promotionChecker;

  constructor() {
    this.#productDB = new ProductDatabase();
    this.#promotionChecker = new PromotionChecker(this.#productDB);
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
    await this.#checkProductPromotionAll(productList);
    this.#payment();
  }

  /** @param {Pick<Product, 'name' | 'quantity'>[]} productList */
  async #checkProductPromotionAll(productList) {
    for (const product of productList) {
      const recommended = this.#promotionChecker.recommend(product);

      if (!recommended) continue;

      const { type, quantity } = recommended;
      const { name } = product;

      await this.#recommendActionByPromotion(type)({ name, quantity });
    }
  }

  /**
   * @param {'stock' | 'additional'} type
   * @returns {(product: Pick<Product, 'name' | 'quantity'>) => Promise<void>}
   */
  #recommendActionByPromotion(type) {
    const recommendedAction = {
      stock: (product) => this.#confirmPurchaseWithoutDiscount(product),
      additional: (product) => this.#confirmAdditionalFreeProduct(product),
    };

    return recommendedAction[type];
  }

  /** @param {Pick<Product, 'name' | 'quantity'>} product */
  async #confirmPurchaseWithoutDiscount(product) {
    const without = await InputView.confirmPurchaseWithoutDiscount(product);

    if (!without) {
      this.#cart.removeProduct(product);
    }
  }

  /** @param {Pick<Product, 'name' | 'quantity'>} product */
  async #confirmAdditionalFreeProduct(product) {
    const intention = await InputView.confirmAdditionalFreeProduct(product);

    if (intention) {
      this.#cart.addProduct(product);
    }
  }

  #payment() {
    const productList = this.#cart.getProductList();

    productList.forEach((product) => {
      this.#productDB.putProductQuantityByName(product);
    });
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
