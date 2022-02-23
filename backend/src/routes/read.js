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
                const text = store.getLog(id, date, time).toString();
                res.set("Content-Type", "text/plain");
                res.status(200).send(text);
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
