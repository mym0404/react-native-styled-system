#!/usr/bin/env node
/* eslint-disable no-console */

import { run } from '../dist/index.js';

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
