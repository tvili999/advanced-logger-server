module.exports = container => container.configure(
    require("./read"),
    require("./logs")
)