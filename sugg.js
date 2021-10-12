const combo = require('./combo.js');
const poll = require('./poll.js');
const {disabledSymbols, maxElemLength} = require('./const.js');

module.exports = async interaction => {
    var comboLast = combo.getSuggestion(interaction.user.id);
    var suggestion = interaction.options.getString('element');

    if (comboLast.length === 0) {
        interaction.reply(":x: You haven't combined anything");
        return;
    }

    if (suggestion.length > maxElemLength) {
        interaction.reply(':x: Too long of a suggestion');
        return;
    }

    for (var i = 0; i < disabledSymbols.length; i++) {
        if (suggestion.indexOf(disabledSymbols[i]) != -1) {
            interaction.reply(`:x: You are using the illegal character ${disabledSymbols[j]}!`);
            return;
        }
    }

    poll(comboLast,suggestion,interaction.channel,interaction.user.id,interaction);
}