const express = require("express");
const ws = require("express-ws");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

module.exports = container => container.configure(
    require("node-tools/multistage")(
        "server",
        {
            init: () => {
                const app = express();
                ws(app);
                app.use(cors())
                app.use(bodyParser.json());
                app.use(morgan('dev'))

                return app;
            },
            run: () => { },
            stages: ["route", "fallback", "listen"]
        }
    ),
    ({ run }) => run("server:run", async ({ get }) => {
        const server = await get("server");
        const config = await get("config");

        server.listen(app => {
            const port = config?.port || 9000;

            app.listen(port);
        })
    })
)