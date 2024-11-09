import { ERROR_PREFIX } from '../constants/index.js';

class Exception extends Error {
  /** @param {string} cause */
  constructor(cause) {
    super(cause);
    this.message = `${ERROR_PREFIX} ${cause}`;
    this.name = this.constructor.name;
  }
}

export default Exception;
