import { exec } from "child_process";

// Terminate Discord
export const killWindows = (appName: string): void => {
	exec(
		`taskkill /IM ${appName}.exe /F`,
		(error, stdout, stderr) => {
			if (error) {
				console.error(
					`Error while terminating ${appName}: ${error.message}`
				);
				return;
			}
			if (stderr) {
				console.error(
					`Error while terminating ${appName}: ${stderr}`
				);
				return;
			}
			console.log(`${appName} terminated: ${stdout}`);
		}
	);
};

// Terminate Discord
export const killMac = (appName: string): void => {
	exec(`killall ${appName}`, (error, stdout, stderr) => {
		if (error) {
			console.error(
				`Error while terminating ${appName}: ${error.message}`
			);
			return;
		}
		if (stderr) {
			console.error(
				`Error while terminating ${appName}: ${stderr}`
			);
			return;
		}
		console.log(`${appName} terminated: ${stdout}`);
	});
};

export const KillListMac: string[] = [
	"Discord",
	"Slack",
	"Microsoft Teams",
	"Zoom",
	"KakaoTalk",
	"Skype",
	"Telegram",
	"WhatsApp",
	"LINE",
];

export const KillListWindows: string[] = [
	"Discord",
	"Slack",
	"Teams",
	"Zoom",
	"KakaoTalk",
	"Skype",
	"Telegram",
	"WhatsApp",
	"LINE",
];

export const killMacList = (): void => {
	KillListMac.forEach((process) => killMac(process));
};

export const killWindowsList = (): void => {
	KillListWindows.forEach((process) =>
		killWindows(process)
	);
};
