const {playChannels} = require ('./const.js');

module.exports = interaction => {
    var playChannel = false;
    for (var i = 0; i < playChannels.length; i++) {
        if (interaction.channel.name.match(playChannels[i])) {
            playChannel = true;
            break;
        }
    }
    return playChannel;
}