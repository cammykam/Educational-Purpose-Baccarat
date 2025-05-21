const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Load preload script
      contextIsolation: true, // Security best practice
      enableRemoteModule: false // Security best practice
    }
  });

  // Load the index.html file
  mainWindow.loadFile('index.html');

  // Open DevTools (comment out for production)
  mainWindow.webContents.openDevTools();
}

// Electron app initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});