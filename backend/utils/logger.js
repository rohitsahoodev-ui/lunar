import fs from 'fs';
import path from 'path';

export const logger = {
  info: (message) => {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
  },
  error: (message, stack) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    if (stack) console.error(stack);
  }
};
