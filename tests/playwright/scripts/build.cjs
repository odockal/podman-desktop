import { fs } from 'node:fs';
import { path } from 'node:path';

// Path to the electron binary in node_modules/.bin
const electronBinaryPath = path.resolve(__dirname, '../../node_modules/.bin/electron');

// Destination folder in 'tests/playwright'
const destinationFolder = path.resolve(__dirname, '../electron-binary');
const destinationPath = path.join(destinationFolder, 'electron');

// Ensure the destination directory exists
fs.mkdirSync(destinationFolder, { recursive: true });

// Copy the electron binary
fs.copyFile(electronBinaryPath, destinationPath, (err) => {
    if (err) {
        console.error('Error copying electron binary:', err);
        process.exit(1);
    }
    console.log('Electron binary copied successfully to:', destinationPath);
});