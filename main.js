const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
    const win = new BrowserWindow({
        title: "FM-MidiWingSetup",
        width: 1280,
        height: 720,
        minWidth: 850,

        /*transparent: true,*/
        enablePreferredSizeMode: true,
        icon: __dirname + "/icon.ico",
    });
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
