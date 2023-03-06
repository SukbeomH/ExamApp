import { screen } from "electron";

export const captureDisplay = (): boolean => {
	// Get the displays (monitors)
	const displays = screen.getAllDisplays();
	// Check if there are more than one display
	if (displays.length > 1) {
		console.log("👀 There are more than one display");
		return true;
	}
	return false;
};
