import { removeFolderIfExists } from '../util/testUtility';

let setupCalled = false;
let teardownCalled = false;

export async function setup() {
  if (!setupCalled) {
    console.log('Entering global setup');
    // remove all previous testing output files
    await removeFolderIfExists('tests/output');
  } else {
    console.log('Global setup already called, skipping...');
  }
  setupCalled = true;
}

export async function teardown() {
  if (!teardownCalled) {
    console.log('Entering global teardown');
  } else {
    console.log('Global teardown already called, skipping...');
  }
  teardownCalled = true;
}
