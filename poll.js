const { MessageButton, MessageActionRow } = require("discord.js")

const { pollChannel } = require('./const.js');
const vote = require('./vote.js');

var collectors = [];

module.exports = (combo,result,channel,id,interaction) => {
    result = result.replace(/\s+/,' ').replace(/^\s+|\s+$/g,'').toLowerCase().replace(/(\b[a-z](?!\s))/g,(c) => c.toUpperCase());
    var comboString = combo.join(' + ') + ' = ' + result;
    const comboArrayString = combo.join('**') + '**' + result;

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(comboString + '**0')
                .setLabel('Upvote')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId(comboString + '**1')
                .setLabel('Downvote')
                .setStyle('PRIMARY')
        )

    interaction.reply(`Suggested ${comboString}`);

    channel.guild.channels.fetch(pollChannel).then(channel => {channel.send({
        embeds: [{
            color: 0x0099ff,
            description: comboString,
            title: 'Vote'
        }]
    }).then(message => {
        message.react('⬆️')
            .then(() => {
                message.react('⬇️').then(() => {
                    collectors.push(message.createReactionCollector());
                    collectors[collectors.length-1].on('collect', (reaction,user) => {vote(reaction,user,combo,result)});
                })
            })
    })});
}