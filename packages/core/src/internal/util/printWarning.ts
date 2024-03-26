/* eslint-disable no-console */

function isTestEnv() {
  return process.env.JEST_WORKER_ID !== undefined;
}

export const printWarning = (msg: string) => {
  if (!isTestEnv()) {
    console.warn('[⚠️@react-native-styled-system/core]', msg);
  }
};
