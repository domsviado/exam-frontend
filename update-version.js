import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);

const versionFilePath = path.resolve(__dirname, '.version');
const envFilePath = path.resolve(__dirname, '.env');

// Read the .version file
const version = fs.existsSync(versionFilePath)
  ? fs.readFileSync(versionFilePath, 'utf8').trim()
  : '0.0.0';

// Read the .env file
let envContent = fs.existsSync(envFilePath)
  ? fs.readFileSync(envFilePath, 'utf8')
  : '';

// Update or add the NUXT_APP_VERSION
if (envContent.includes('APP_VERSION=')) {
  envContent = envContent.replace(/APP_VERSION=.*/g, `APP_VERSION=${version}`);
} else {
  envContent += `\nAPP_VERSION=${version}`;
}

// Write back to the .env file
fs.writeFileSync(envFilePath, envContent, 'utf8');
console.log(`Updated .env with APP_VERSION=${version}`);
