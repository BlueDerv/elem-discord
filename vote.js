const { voteThreshold, newsChannel } = require('./const.js');

const { pushCombo } = require('./combo.js');

votes = {};

module.exports = (reaction, user, combo, result) => {
    if (reaction.message.author != '880926181791240202') return;
    if (reaction.emoji.name != '⬆️' && reaction.emoji.name != '⬇️') return;
    
    if (votes[reaction.message.id] == null) votes[reaction.message.id] = {'⬆️':1,'⬇️':1};

    votes[reaction.message.id][reaction.emoji.name] = reaction.count;

    if (votes[reaction.message.id]['⬆️'] - votes[reaction.message.id]['⬇️'] >= voteThreshold) {
        reaction.message.guild.channels.fetch(newsChannel)
            .then(channel => {
                reaction.message.delete();
                pushCombo([...combo,result],channel,reaction.message.author.id);
            });
    }
    else if (votes[reaction.message.id]['⬆️'] - votes[reaction.message.id]['⬇️'] <= -voteThreshold) {
        reaction.message.delete();
    }
}