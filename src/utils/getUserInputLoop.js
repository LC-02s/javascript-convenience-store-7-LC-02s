import { Console } from '@woowacourse/mission-utils';

/**
 * @template T
 * @param {{ reader: () => Promise<T>; validator?: (input: T) => void  }} param
 * @returns {Promise<T>}
 */
async function getUserInputLoop({ reader, validator }) {
  try {
    const input = await reader();
    validator?.(input);

    return input;
  } catch (error) {
    Console.print(error.message);

    return await getUserInputLoop({ reader, validator });
  }
}

export default getUserInputLoop;
