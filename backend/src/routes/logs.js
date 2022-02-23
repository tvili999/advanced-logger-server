module.exports = container => container
    .dependency("routes:logs", { dependentBy: "server" })
    .run("routes:logs", async ({ get }) => {
        const server = await get("server");
        const store = await get("store");

        server.route(app => {
            app.ws("/log", (ws, req) => {
                let session = store.getSession(null);
                ws.on("message", (data) => {
                    try {
                        const message = JSON.parse(data);
                        if(message?.[1] === "session" && message?.[3])
                            session = store.getSession(message[3]);
                    }
                    catch {}

                    session?.appendLog?.(data);
                })
            })
        })
    })