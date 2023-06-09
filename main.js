const { app, BrowserWindow } = require("electron");
const path = require("path");

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        title: "FM-MidiWingSetup",
        width: 1280,
        height: 720,
        minWidth: 850,

        /*transparent: true,*/
        enablePreferredSizeMode: true,
        icon: __dirname + "/icon.ico",
    });
    mainWindow.setAspectRatio(16 / 9);

    mainWindow.loadFile(path.join(__dirname, "renderer/index.html"));
};

app.whenReady().then(() => {
    createMainWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
