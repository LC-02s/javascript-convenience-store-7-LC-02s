import { StoreController } from './controller/index.js';

class App {
  async run() {
    const controller = new StoreController();
    await controller.run();
  }
}

export default App;
