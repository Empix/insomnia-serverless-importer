import program from 'commander';
import path from 'path';
import dotenv from 'dotenv';

import { writeFile } from 'fs/promises';
import { convert } from './converter';

const readConfig = require('serverless/lib/configuration/read');
const resolve = require('serverless/lib/configuration/variables');

(async () => {
  // Configure CLI input
  program.parse(process.argv);

  const inputPath = program.args[0];
  if (!inputPath) {
    console.log('\n[ERROR] Input path not specified\n');
    process.exit(1);
  }

  const outputPath = program.args[1];
  if (!inputPath) {
    console.log('\n[ERROR] Output path not specified\n');
    process.exit(1);
  }

  // Resolve paths
  const fullOutputPath = path.resolve(outputPath);
  const serviceDir = path.resolve(inputPath);
  const configPath = path.resolve(serviceDir, 'serverless.yml');

  // Load .env inside the project
  dotenv.config({ path: path.join(inputPath, '.env') });

  // Read the config file and resolve variables
  const configuration = await readConfig(configPath);
  const raw = JSON.parse(JSON.stringify(configuration));
  await resolve({ serviceDir, configuration });
  configuration.raw = raw;

  // Convert serverless functions
  const result = convert(configuration);

  // Save file
  const exportContents = JSON.stringify(result, null, 2);
  await writeFile(fullOutputPath, exportContents);
})();
