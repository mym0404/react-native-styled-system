import { bundleNRequire } from 'bundle-n-require';
import { program } from 'commander';
import { resolve } from 'node:path/posix';

import { initCLI } from './utils/init-cli.js';
import { generateThemeTypings } from './generate-theme-typings.js';

interface OptionsType {
  out?: string;
}

export async function run() {
  await initCLI();

  program
    .command('generate <source>')
    .option('--out <path>')
    .option('--no-format', 'Disable auto formatting')
    .action(async (themeFile: string, options: OptionsType) => {
      const { out } = options;

      const read = async () => {
        const filePath = resolve(themeFile);
        const { mod, dependencies } = await bundleNRequire(filePath);
        const theme = mod.default || mod.theme || mod;

        return { theme, dependencies };
      };

      const ctx = await read();

      const build = async () => {
        await generateThemeTypings({
          theme: ctx.theme,
          out,
        });
      };

      await build();
    });

  program.parse();
}
