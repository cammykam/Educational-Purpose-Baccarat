const { contextBridge } = require('electron');

// Expose safe APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Add any Node.js APIs you need here (e.g., file system access)
  // Example:
  platform: process.platform
});