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
            getLog: (session, date, time) => {
                const filePath = getPath(session, date, time);
                if(!fs.existsSync(filePath))
                    throw "Log does not exist";
                return fs.readFileSync(filePath)
            },
            getSession: (session) => {
                if(!session)
                    session = "default";
                const sessionDir = Buffer.from(session).toString('base64').replace('+', '_');
                mkdir(sessionDir);

                return {
                    appendLog: (text) => {
                        const date = new Date();
                        const dateDir = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
                        const timePath = `${dateDir}_${date.getHours()}`;

                        mkdir(sessionDir, dateDir);

                        const filePath = getPath(sessionDir, dateDir, timePath);
                        fs.appendFileSync(filePath, text);
                        fs.appendFileSync(filePath, "\n");
                    }
                }
            }
        }
    })
