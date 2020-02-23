const { app, BrowserWindow } = require("electron");

function createWindow() {
  const window = new BrowserWindow({
    backgroundColor: "#333333",
    frame: true,
    width: 500,
    height: 375,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    webSecurity: false
  });
  window.loadFile("build/index.html");
}

app.on("window-all-closed", () => {
  app.quit();
});

async function start() {
  await app.whenReady();
  createWindow();
}
start();
