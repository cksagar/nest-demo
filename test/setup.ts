import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test', 'test.sqlite'));
  } catch (err) {
    // do nothing
  }
});
