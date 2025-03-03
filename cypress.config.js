const { defineConfig } = require("cypress");

const fs = require('fs');
const path = require('path');

module.exports = {
  e2e: {
    baseUrl: 'https://www.zedge.net',
    setupNodeEvents(on, config) {
      // Register the custom task
      on('task', {
        deleteFile(filePath) {
          const fileToDelete = path.resolve(filePath);
          if (fs.existsSync(fileToDelete)) {
            fs.unlinkSync(fileToDelete); // Delete the file
            return null; // Task was successful
          } else {
            throw new Error('File not found: ' + filePath); // Throw error if file doesn't exist
          }
        },
      });
    },
  },
};