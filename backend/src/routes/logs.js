module.exports = container => container
    .dependency("routes:logs", { dependentBy: "server" })
    .run("routes:logs", async ({ get }) => {
        const server = await get("server");
        const store = await get("store");

        server.route(app => {
            app.ws("/log/:session", (ws, req) => {
                let session = store.getSession(req.params.session);
                ws.on("message", (data) => {
                    session?.appendLog?.(data);
                })
            })
        })
    })