module.exports = container => container.configure(
    require("node-tools/configLoader").fromFile("config", "config.json")
)