import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test', 'nestjs_test'));
  } catch (err) {
    // do nothing
  }
});
