const fs = require("fs");
const path = require("path");

module.exports = container => container
    .inject("store", async ({ get }) => {
        const config = await get("config");

        if(!config.logDir) {
            console.log("logDir configuration is not present");
            require("process").exit(1);
        }

        const getPath = (...dir) => {
            return path.join(config.logDir, ...dir)
        }

        const mkdir = (...dir) => {
            dir = getPath(...dir)
            if(!fs.existsSync(dir))
                fs.mkdirSync(dir, { recursive: true });
        }
        mkdir();

        return {
            getSessions: () => {
                const dir = getPath();
                if(!fs.existsSync(dir))
                    throw "Directory does not exist"
                return fs.readdirSync(dir)
            },
            getDates: (session) => {
                const dir = getPath(session);
                if(!fs.existsSync(dir))
                    throw "Directory does not exist"
                return fs.readdirSync(dir)
            },
            getLogs: (session, date) => {
                const dir = getPath(session, date);
                if(!fs.existsSync(dir))
                    throw "Directory does not exist"
                return fs.readdirSync(dir)
            },
            getLogModify: (session, date, time) => {
                const filePath = getPath(session, date, time);
                if(!fs.existsSync(filePath))
                    throw "Log does not exist";

                return fs.statSync(filePath).mtimeMs;
            },
            getLog: (session, date, time) => {
                const filePath = getPath(session, date, time);
                if(!fs.existsSync(filePath))
                    throw "Log does not exist";

                return fs.readFileSync(filePath);
            },
            getSession: (session) => {
                if(!session)
                    session = "default";
                mkdir(session);

                return {
                    appendLog: (text) => {
                        const date = new Date();
                        const dateDir = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
                        const timePath = date.getHours().toString();

                        mkdir(session, dateDir);

                        const filePath = getPath(session, dateDir, timePath);
                        fs.appendFileSync(filePath, text);
                        fs.appendFileSync(filePath, "\n");
                    }
                }
            }
        }
    })
