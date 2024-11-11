import { ProductDatabase } from '../data/index.js';
import { PRODUCT_INPUT, ERROR_MESSAGE } from '../constants/index.js';
import { Exception } from '../utils/index.js';

/** @typedef {import('../types/index.js').Product} Product */

class ProductValidator {
  /**
   * @param {string[]} inputs
   * @param {ProductDatabase} productDB
   */
  static validate(inputs, productDB) {
    ProductValidator.#validateProductInputLength(inputs);
    ProductValidator.#validateProductInputConventionAll(inputs);
    ProductValidator.#validateProductAll(inputs, productDB);
  }

  /**
   * @param {string[]} inputs
   * @param {ProductDatabase} productDB
   */
  static #validateProductAll(inputs, productDB) {
    const userProductList = ProductValidator.parseInput(inputs);
    const productMap = ProductValidator.#getProductMap(userProductList);

    [...productMap.entries()].forEach(([name, quantity]) => {
      ProductValidator.#validateProductType({ name, quantity });
      ProductValidator.#validateData({ name, quantity }, productDB);
    });
  }

  /**
   * @param {Pick<Product, 'name' | 'quantity'>[]} productList
   * @returns {Map<Product['name'], Product['quantity']>}
   */
  static #getProductMap(productList) {
    return productList.reduce((map, { name, quantity }) => {
      if (map.has(name)) {
        return map.set(name, map.get(name) + quantity);
      }

      return map.set(name, quantity);
    }, new Map());
  }

  /** @param {string[]} inputs */
  static #validateProductInputLength(inputs) {
    if (inputs.length < 1) {
      throw new Exception(ERROR_MESSAGE.INVALID_INPUT);
    }
  }

  /** @param {string[]} inputs */
  static #validateProductInputConventionAll(inputs) {
    inputs.forEach(ProductValidator.#validateProductInputConvention);
  }

  /** @param {string} input */
  static #validateProductInputConvention(input) {
    if (!input.trim()) {
      throw new Exception(ERROR_MESSAGE.INVALID_INPUT);
    }

    ProductValidator.#validateProductInputPrefix(input);
    ProductValidator.#validateProductInputPostfix(input);
    ProductValidator.#validateProductInputSeparator(input);
  }

  /** @param {string} input */
  static #validateProductInputPrefix(input) {
    if (!input.startsWith(PRODUCT_INPUT.PREFIX)) {
      throw new Exception(ERROR_MESSAGE.INVALID_TYPE);
    }
  }

  /** @param {string} input */
  static #validateProductInputPostfix(input) {
    if (!input.endsWith(PRODUCT_INPUT.POSTFIX)) {
      throw new Exception(ERROR_MESSAGE.INVALID_TYPE);
    }
  }

  /** @param {string} input */
  static #validateProductInputSeparator(input) {
    const separators = input
      .split('')
      .filter((char) => char === PRODUCT_INPUT.SEPARATOR);

    if (separators.length !== 1) {
      throw new Exception(ERROR_MESSAGE.INVALID_TYPE);
    }
  }

  /** @param {Pick<Product, 'name' | 'quantity'>} product */
  static #validateProductType({ name, quantity }) {
    ProductValidator.#validateProductNameType(name);
    ProductValidator.#validateProductQuantityType(quantity);
  }

  /** @param {string} name */
  static #validateProductNameType(name) {
    if (!name) {
      throw new Exception(ERROR_MESSAGE.INVALID_TYPE);
    }
  }

  /** @param {number} quantity */
  static #validateProductQuantityType(quantity) {
    if (Number.isNaN(quantity) || !Number.isSafeInteger(quantity)) {
      throw new Exception(ERROR_MESSAGE.INVALID_TYPE);
    }

    if (quantity < 1) {
      throw new Exception(ERROR_MESSAGE.INVALID_TYPE);
    }
  }

  /**
   * @param {Pick<Product, 'name' | 'quantity'>} product
   * @param {ProductDatabase} productDB
   */
  static #validateData({ name, quantity }, productDB) {
    const targetProductList = productDB.findByName({ name });

    ProductValidator.#validateProductNotFound(targetProductList);
    ProductValidator.#validateProductStockQuantity(quantity, targetProductList);
  }

  /** @param {Product[]} productList */
  static #validateProductNotFound(productList) {
    if (productList.length < 1) {
      throw new Exception(ERROR_MESSAGE.PRODUCT_NOT_FOUND);
    }
  }

  /**
   * @param {number} quantity
   * @param {Product[]} productList
   */
  static #validateProductStockQuantity(requiredQuantity, productList) {
    const totalStockQuantity = productList.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    if (totalStockQuantity < requiredQuantity) {
      throw new Exception(ERROR_MESSAGE.EXCEED_STOCK_QUANTITY);
    }
  }

  /**
   * @param {string[]} inputs
   * @returns {Pick<Product, 'name' | 'quantity'>[]}
   */
  static parseInput(inputs) {
    return inputs.map((input) => {
      const [name, quantity] = input
        .trim()
        .slice(1, input.length - 1)
        .split(PRODUCT_INPUT.SEPARATOR);

      return { name, quantity: Number(quantity) };
    });
  }
}

export default ProductValidator;
