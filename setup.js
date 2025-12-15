import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // Check if already configured
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  if (packageJson.name !== 'template-placeholder' && packageJson.name !== 'vite-react-typescript-tailwind-template') {
    // Assuming if the name is changed, it's already set up.
    // But the user might want to re-run it?
    // Let's just proceed but default to current values?
    // Or just exit?
    // The user said "after anyone clone this repo and run 'npm install' then when setup will ask".
    // So it should run.
    console.log('Project appears to be already configured.');
    // We can continue to allow re-configuration or just exit.
    // Let's continue.
  }

  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Project Name (Display Name):',
      initial: 'My Vite App'
    },
    {
      type: 'text',
      name: 'packageName',
      message: 'Package Name (package.json name):',
      initial: 'my-vite-app',
      validate: value => /^[a-z0-9-~][a-z0-9-._~]*$/.test(value) ? true : 'Invalid package name'
    }
  ]);

  if (!response.projectName || !response.packageName) {
    console.log('Setup cancelled.');
    return;
  }

  // Update package.json
  packageJson.name = response.packageName;
  
  // Remove the postinstall script so it doesn't run again on next install?
  // Or keep it?
  // If we keep it, it will ask every time `npm install` runs, which is annoying.
  // So we should remove it from scripts.
  if (packageJson.scripts && packageJson.scripts.postinstall) {
      delete packageJson.scripts.postinstall;
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Update index.html title
  const indexHtmlPath = path.join(__dirname, 'index.html');
  let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  indexHtml = indexHtml.replace(/<title>.*<\/title>/, `<title>${response.projectName}</title>`);
  fs.writeFileSync(indexHtmlPath, indexHtml);

  console.log(`\nSetup complete! Project: ${response.projectName}, Package: ${response.packageName}\n`);
}

main().catch(console.error);
