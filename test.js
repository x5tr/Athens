const shell = require('shelljs');
require('dotenv').config();

shell.exec(`git clone ${process.env.REPOSITORY} Athens`);

// Move the specific folder to your desired location
const sourcePath = 'Athens/src/commands'; // Replace with the actual path
const targetPath = 'src/commands'; // Replace with the desired target directory

shell.mv('-f', sourcePath, targetPath);
shell.rm('-rf', 'Athens');

console.log('Folder cloned successfully.');
