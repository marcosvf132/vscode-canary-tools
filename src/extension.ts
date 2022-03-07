import * as vscode from "vscode";
import * as settings from "./settings";

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("run-canary", () => {
		if (!settings.getCanaryPath()) {
			vscode.window.showErrorMessage('Canary/Datapack path is missing.');
			return;
		}

		let terminal: vscode.Terminal | undefined;
		terminal = terminal || vscode.window.createTerminal("Canary");
		terminal.show();
		terminal.sendText(`xcopy ${settings.getCanaryPath()} ${settings.getBuildPath()} /s /y`);
		terminal.sendText(`cd ${settings.getCanaryPath()}`);
		terminal.sendText(`./canary.exe`);

		vscode.window.onDidCloseTerminal((closedTerminal) => {
			if (closedTerminal === terminal) {
				terminal = undefined;
			}
		});
	}))

	context.subscriptions.push(vscode.commands.registerCommand("run-login-mysql", () => {
		if (!settings.getMySQLPath() || !settings.getLoginServerPath()) {
			vscode.window.showErrorMessage('MySQL or login-server path is missing.');
			return;
		}

		let mysql: vscode.Terminal | undefined;
		mysql = mysql || vscode.window.createTerminal("MySQL");
		mysql.show();
		mysql.sendText(`cd ${settings.getMySQLPath()}`);
		mysql.sendText(`./mysqld_z.exe`);

		let loginserver: vscode.Terminal | undefined;
		loginserver = loginserver || vscode.window.createTerminal("login-server");
		loginserver.show();
		loginserver.sendText(`cd ${settings.getLoginServerPath()}`);
		loginserver.sendText(`./login-server.exe`);

		vscode.window.onDidCloseTerminal((closedTerminal) => {
			if (closedTerminal === loginserver || closedTerminal === mysql) {
				loginserver = undefined;
				mysql = undefined;
			}
		});
	}))
}