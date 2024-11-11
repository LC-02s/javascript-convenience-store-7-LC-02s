import { DATA_PATH } from '../constants/index.js';
import { parseCSV, readFileSync } from '../utils/index.js';

/** @typedef {import('../types/index.js').Product} Product */

class ProductDatabase {
  /** @type {Product[]} */
  #data;

  constructor() {
    const initialData = this.#getInitialData();
    const parsedData = this.#parseInitialData(initialData);

    this.#data = this.#generateId(parsedData);
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

  /** @returns {{ data: Object<string, unknown>[]; productNameList: string[]; }} */
  #getInitialData() {
    const productCSV = readFileSync(DATA_PATH.PRODUCT_CSV);
    const data = parseCSV(productCSV);
    const productNameList = data.reduce((nameList, { name }) => {
      if (nameList.some((n) => n === name)) return nameList;

      return [...nameList, name];
    }, []);

    return { data, productNameList };
  }

  /**
   * @param {{ data: Object<string, unknown>[]; productNameList: string[]; }} param
   * @returns {Omit<Product, 'id'>[]}
   */
  #parseInitialData({ data, productNameList }) {
    return productNameList.reduce((parsed, name) => {
      const target = data.filter((product) => product.name === name);
      const [targetProduct] = target;

      if (target.length !== 1) return [...parsed, ...target];

      if (!targetProduct.promotion) return [...parsed, targetProduct];

      return [...parsed, targetProduct, { ...targetProduct, quantity: 0, promotion: null }];
    }, []);
  }

  /** @param {Omit<Product, 'id'>[]} parsedData */
  #generateId(parsedData) {
    return parsedData.map((data, id) => ({ ...data, id }));
  }
}

export default ProductDatabase;
