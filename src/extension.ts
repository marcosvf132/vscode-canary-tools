import * as vscode from "vscode";
import * as settings from "./settings";
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("run-canary", () => {
		if (settings.getCanaryPath() === "" || settings.getBuildPath() === "") {
			vscode.window.showErrorMessage('Canary or build path is missing.');
			return;
		}

		if (!fs.existsSync(`${settings.getCanaryPath()}/canary.exe`)) {
			vscode.window.showErrorMessage('canary.exe is missing.');
			return;
		}

		let canary: vscode.Terminal | undefined;
		canary = canary || vscode.window.createTerminal("Canary");
		canary.show();
		canary.sendText(`robocopy ${settings.getCanaryPath()} ${settings.getBuildPath()} /nfl /ndl /njh /njs /np`);
		canary.sendText(`cd ${settings.getCanaryPath()}`);
		canary.sendText(`./canary.exe`);

		vscode.window.onDidCloseTerminal((closedTerminal) => {
			if (closedTerminal === canary) {
				canary = undefined;
			}
		});
	}))

	context.subscriptions.push(vscode.commands.registerCommand("run-login-mysql", () => {
		if (settings.getMySQLPath() === "" || settings.getLoginServerPath() === "") {
			vscode.window.showErrorMessage('MySQL or login-server path is missing.');
			return;
		}

		if (!fs.existsSync(`${settings.getLoginServerPath()}/login-server.exe`)) {
			vscode.window.showErrorMessage('login-server.exe is missing.');
			return;
		}

		if (!fs.existsSync(`${settings.getMySQLPath()}/mysqld_z.exe`)) {
			vscode.window.showErrorMessage('mysqld_z.exe is missing.');
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
