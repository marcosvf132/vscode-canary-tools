import * as vscode from 'vscode';

let config = vscode.workspace.getConfiguration("canary");

export function getCanaryPath() {
    return config.get<string>("path");
}

export function getBuildPath() {
    return config.get<string>("build-path");
}

export function getLoginServerPath() {
    return config.get<string>("login-server-path");
}

export function getMySQLPath() {
    return config.get<string>("mysql-path");
}
