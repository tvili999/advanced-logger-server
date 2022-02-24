module.exports = container => container
    .dependency("routes:root", { dependentBy: "server" })
    .run("routes:root", async ({ get }) => {
        const server = await get("server");
        const store = await get("store");

        server.route(app => {
            app.get("/api/sessions", (req, res) => {
                res.send(store.getSessions());
            })
            app.get("/api/sessions/:id/:date/:time", (req, res) => {
                const { id, date, time } = req.params;

                const lastMod = parseInt(store.getLogModify(id, date, time));
                if(req.query.lastModified) {
                    const cliLastMod = parseInt(req.query.lastModified);
                    if(cliLastMod >= lastMod) {
                        res.status(204).end();
                        return;
                    }
                }

                const content = store.getLog(id, date, time).toString();

                res.set("Content-Type", "text/plain");
                res.set("last-modified", lastMod.toString())
                res.status(200).send(content);
            })
            app.get("/api/sessions/:id/:date", (req, res) => {
                const { id, date } = req.params;
                res.send(store.getLogs(id, date));
            })
            app.get("/api/sessions/:id", (req, res) => {
                const { id } = req.params;
                res.send(store.getDates(id));
            })
        })
    })
