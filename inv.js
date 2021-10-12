const verifyPlay = require('./verify.js');
const combo = require('./combo.js');

module.exports = async interaction => {

    interaction.reply({embeds: [{
        color: 0x0099ff,
        description: combo.getUserInv(interaction.user.id).join('\n'),
        title: `${interaction.user.username}'s Inventory (${combo.getUserInv(interaction.user.id).length} elements)`
    }]});
};