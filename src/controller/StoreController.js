import { ProductDatabase } from '../data/index.js';
import { Cart, ProductValidator, PromotionChecker, Cashier } from '../model/index.js';
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

  /** @type {Cashier} */
  #cashier;

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

    await this.#payment();
  }

  async #addProductListToCart() {
    const productInput = await this.#getProductSelection();

    this.#cart = new Cart(productInput, this.#productDB);

    return this.#cart.getProductList();
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

  async #payment() {
    const result = await this.#takeToTheCashier();
    const productList = this.#cart.getProductList();

    OutputView.printReceiptProductList({ productList, giftList: result.giftList });
    OutputView.printReceiptResult({ ...result, payment: this.#cashier.computePayment(result) });

    productList.forEach((product) => {
      this.#productDB.putProductQuantityByName(product);
    });
  }

  async #takeToTheCashier() {
    const cart = this.#cart.getProductList();
    this.#cashier = new Cashier(cart, this.#productDB, this.#promotionChecker);

    return await this.#cashier.compute(InputView.confirmMembershipDiscount);
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

  async #getProductSelection() {
    this.#productDB.printAll(OutputView.printProductAll);

    return await getUserInputLoop({
      reader: InputView.readProductSelection,
      validator: (productList) => ProductValidator.validate(productList, this.#productDB),
    });
  }
}

export default StoreController;
