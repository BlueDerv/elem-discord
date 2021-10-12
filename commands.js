module.exports.commands = [
    {
        "name": "inv",
        "description": "Get your inventory",
    },
    {
        "name": "sugg",
        "description": "Suggest an element",
        "options": [
            {
                "name": "element",
                "description": "Element to be suggested",
                "required": true,
                "type": 3
            }
        ]
    }
]

module.exports.commandHandlers = {
    "inv": require("./inv.js"),
    "sugg": require("./sugg.js")
};