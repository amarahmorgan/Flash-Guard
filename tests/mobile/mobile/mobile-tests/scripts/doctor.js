const { execSync } = require("node:child_process");

function run(label, command) {
  process.stdout.write(`\n[doctor] ${label}\n`);
  try {
    const output = execSync(command, { stdio: "pipe" }).toString().trim();
    process.stdout.write(`${output}\n`);
    return true;
  } catch (error) {
    const stderr = error.stderr ? error.stderr.toString().trim() : "";
    const stdout = error.stdout ? error.stdout.toString().trim() : "";
    process.stdout.write(`${stdout || stderr || error.message}\n`);
    return false;
  }
}

const checks = [
  run("node", "node -v"),
  run("npm", "npm -v"),
  run("adb", "adb version"),
  run("appium", "npx appium -v"),
  run("installed appium drivers", "npx appium driver list --installed"),
];

if (checks.every(Boolean)) {
  process.stdout.write("\n[doctor] Environment looks ready for Appium + Playwright.\n");
  process.exit(0);
}

process.stdout.write("\n[doctor] Some checks failed. Install missing tools and run npm run e2e:doctor again.\n");
process.exit(1);
