const {seperators, multipliers, comboMax, comboMin, disabledSymbols} = require ('./const.js');
const verifyPlay = require ('./verify.js');
var comboModule = require('./combo.js');
const comboFun = comboModule.combine;


sortHelper = (a,b) => {
    return (a > b) - (a < b);
}

module.exports = (message) => {
    if (message.author.bot) return;

    if (!verifyPlay(message)) {
        return;
    }

    var seperator = "(none)";
    var multiplier = "(none)";

    for (var i = 0; i < seperators.length; i++) {
        if (message.content.indexOf(seperators[i]) != -1) {
            seperator = seperators[i];
            break;
        }
    }

    for (var i = 0; i < multipliers.length; i++) {
        if (message.content.indexOf(multipliers[i]) != -1) {
            multiplier = multipliers[i];
            break;
        }
    }

    if (seperator == "(none)" && multiplier == "(none)") return;

    var comboTemp = message.content.split(seperator);
    var combo = [];

    for (var i = 0; i < comboTemp.length; i++) {
        if (multiplier == "(none)") {
            var split = [comboTemp[i]];
        } else {
            var split = comboTemp[i].split(multiplier);
        }

        if (split[0].replace(/\s+/,' ').replace(/^\s+|\s+$/g,'') == "") split[0] = comboModule.getLastCombined(message.author.id);

        if (split.length == 1) {
            combo.push(split[0].replace(/\s+/,' ').replace(/^\s+|\s+$/g,'').toLowerCase().replace(/(\b[a-z](?!\s))/g,(c) => c.toUpperCase()));
        } else {
            var times = parseInt(split[1]);
            if (Number.isNaN(times) || times < 1 || times > comboMax) {
                message.channel.send(":x: You can't multiply by non-numbers");
                return;
            }
            for (var j = 0; j < parseInt(split[1]); j++) {
                combo.push(split[0].replace(/\s+/,' ').replace(/^\s+|\s+$/g,'').toLowerCase().replace(/(\b[a-z](?!\s))/g,(c) => c.toUpperCase()));
            }
        }
    }
    if (combo.length > comboMax) {
        message.channel.send(':x: Too long of a combo');
        return;
    }
    if (combo.length < (comboMin + 1)) {
        message.channel.send(':x: Combo is empty');
        return;
    }
    for (var i = 0; i < combo.length; i++) {
        if (combo[i] == "") {
            message.channel.send(':x: An element is empty');
            return;
        }
        for (var j = 0; j < disabledSymbols.length; j++) {
            if (combo[i].indexOf(disabledSymbols[j]) != -1) {
                message.channel.send(`:x: You are using the illegal character ${disabledSymbols[j]}`);
                return;
            }
        }
    }

    comboFun(combo.sort(), message.channel, message.author.id);
}