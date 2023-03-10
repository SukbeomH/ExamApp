import { BrowserWindow } from "electron";
import { captureDisplay } from "./display";
import { killMacList, killWindowsList } from "./killer";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createWindow = (): void => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		height: 600,
		width: 800,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
			nodeIntegration: true,
		},
		fullscreen: true,
		frame: false,
		titleBarStyle: "hidden",
		alwaysOnTop: true,
	});
	// Make the window full-screen, always on top, and without a frame
	mainWindow.setFullScreen(true);
	mainWindow.setAlwaysOnTop(true, "screen-saver");
	mainWindow.setKiosk(true);

	// Cannot close the window
	mainWindow.setClosable(false);

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	// Capture block
	mainWindow.setContentProtection(true);

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	// Emitted when the window loses focus
	mainWindow.on("blur", function () {
		console.log("😡 Window lost focus");
		// make alert
		mainWindow.webContents.executeJavaScript(
			`alert("😡 Window lost focus")`
		);
	});

	// When the WebPage is unresponsive, go to Url
	mainWindow.webContents.on("unresponsive", function () {
		console.log("😡 WebPage is unresponsive");
		// open the url
		mainWindow.loadURL("https://www.google.com");
	});

	// Get Display information and check if there are more than one display in every 2 seconds
	setInterval(captureDisplay, 2000);

	// Background processes divided by OS
	if (process.platform === "darwin") {
		/** Kill processes in every 1 minutes */
		setInterval(killMacList, 60000);
	} else if (process.platform === "win32") {
		/** Kill processes in every 1 minutes */
		setInterval(killWindowsList, 60000);
	}

	// load url
	mainWindow.loadURL("https://www.naver.com");
};
