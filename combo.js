var findElemIndex = function(entry,combo) {
    var comboPart = entry;
    if (combo.length != comboPart.length - 1) return false;

    for (var i = 0; i < comboPart.length - 1; i++) {
        if (combo[i] != comboPart[i]) return false;
    }
    return true;
};

const fs = require('fs');

var combos = [];
var inv = [];
var lastCombined = {};
var lastCombo = {};

fs.readFile('./db/combos.txt', 'utf-8',(err,data) => {
    combos = data.split('\n');
    for (var i = 0; i < combos.length; i++) {
        combos[i] = combos[i].split('**');
    }
});

fs.readFile('./db/inv.txt', 'utf-8',(err,data) => {
    inv = data.split('\n');
    for (var i = 0; i < inv.length; i++) {
        inv[i] = inv[i].split('**');
    }
});

module.exports.pushCombo = (result,channel, id) => {
    combos.push(result);
    fs.writeFile('./db/combos.txt', combos.map(x => x.join('**')).join('\n'), (err) => {
        channel.send(`:new: New element: ${result[result.length - 1]}`);
    });
}

const poll = require('./poll.js');

module.exports.getInv = () => {
    return inv;
}

module.exports.getLastCombined = (id) => {
    return lastCombined[id] || "Earth";
}

module.exports.getSuggestion = (id) => {
    return lastCombo[id] || [];
}

module.exports.getUserInv = (id) => {
    var userInvIndex = inv.findIndex(function(entry) {
        return entry[0] == id; 
    })

    var userInv = ['Earth', 'Fire', 'Air', 'Water'];
    if (userInvIndex != -1) {
        userInv = inv[userInvIndex].slice(1);
    }

    return userInv;
}

module.exports.combine = (combo,channel, id) => {
    var elemIndex = combos.findIndex((x) => findElemIndex(x,combo));

    var userInvIndex = inv.findIndex(function(entry) {
        return entry[0] == id; 
    })

    var userInv = ['Earth', 'Fire', 'Air', 'Water'];
    if (userInvIndex != -1) {
        userInv = inv[userInvIndex].slice(1);
    }

    for (var i = 0; i < combo.length; i++) {
        if (userInv.indexOf(combo[i]) == -1) {
            channel.send(":x: You don't have that element");
            return;
        }
    }

    if (elemIndex == -1) {
        lastCombo[id] = combo;
        channel.send(":red_circle: That combination doesn't exist yet, use /sugg to suggest");
    } else {
        var comboPart2 = combos[elemIndex];

        if (userInvIndex == -1) {
            userInvIndex = inv.length;
            inv.push([id,'Air','Earth','Fire','Water']);
        }

        lastCombined[id] = comboPart2[comboPart2.length - 1];

        if (userInv.indexOf(comboPart2[comboPart2.length - 1]) != -1) {
            channel.send(`:blue_circle: You made ${comboPart2[comboPart2.length - 1]}, but you already have it`);
            return;
        }
        inv[userInvIndex].push(comboPart2[comboPart2.length - 1]);

        fs.writeFile('./db/inv.txt', inv.map(x => x.join('**')).join('\n'), (err) => {
            channel.send(`:new: You made ${comboPart2[comboPart2.length - 1]}`);
        });
    }
}