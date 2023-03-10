import {
	app,
	BrowserWindow,
	globalShortcut,
} from "electron";
import { createWindow } from "./utils/createWindow";

// disable screen capture
app.commandLine.appendSwitch(
	"disable-features",
	"ScreenCapture"
);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

// Steals focus from other windows
app.focus({ steal: true });

// Only allow one instance of the app
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
	app.quit();
}

// Quit when all windows are closed
app.on("window-all-closed", () => {
	app.quit();
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
	createWindow();
	// Register a keyboard shortcut to quit the app
	globalShortcut.register("Command+Q", () => {
		app.quit();
	});
});
