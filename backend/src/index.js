module.exports = container => container.configure(
    require("./routes"),
    require("./core")
)