const {seperators, multipliers, comboMax, comboMin, disabledSymbols} = require ('./const.js');
const verifyPlay = require ('./verify.js');
var combo = require('./combo.js');


sortHelper = (a,b) => {
    return (a > b) - (a < b);
}

module.exports = (message) => {
    if (message.author.bot) return;

    if (!verifyPlay(message)) return;
    
    msg = message.content;
    
    if(!msg.startsWith("?")) return;
    
    element=msg.replace("?", "").toLowerCase();
    
    out = "";
    
    if(combo.getUserInv(message.author.id).join("**").toLowerCase().split("**").includes(element.toLowerCase())) {
        out+=":green_circle: **You have this element!**\n";
    } else {
        out+=":red_circle: **You don't have this element.**\n";
    }
    
    // https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
    const map = combo.getInv().join("**").toLowerCase().split("**").reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    
    var am; 
    try {
        var el = [...map.values()][[...map.keys()].indexOf(element)];
        am = (el!==undefined ? el : 0);
    } catch(err) {
        am = err;
    }
    //out+="Users with this element: "+JSON.stringify([...map.keys()]);
    
    message.reply("Element info:"+"\n"+out);
    
};