'use babel';
'use strict';

import { Command, Setting } from 'discord-graf';
import { oneLine } from 'common-tags';

export default class MaxSongsCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'max-songs',
			module: 'settings',
			memberName: 'max-songs',
			description: 'Shows or sets the max songs per user.',
			usage: 'max-songs [amount]',
			details: oneLine`
				This is the maximum number of songs a user may have in the queue.
				The default is 5. Set to 0 for unlimited.
				Only administrators may change this setting.
			`,
			guildOnly: true
		});
	}

	async run(message, args) {
		if(args[0]) {
			if(!this.bot.permissions.isAdmin(message.guild, message.author)) {
				return `Only administrators may change the max songs.`;
			}
			const maxSongs = parseInt(args[0]);
			if(isNaN(maxSongs) || maxSongs < 0) return `Invalid number provided.`;
			this.bot.storage.settings.save(new Setting(message.guild, 'max-songs', maxSongs));
			return `Set the maximum songs to ${maxSongs}.`;
		}

		const maxSongs = this.bot.storage.settings.getValue(message.guild, 'max-songs', 5);
		return `The maximum songs a user may have in the queue at one time is ${maxSongs || 'unlimited'}.`;
	}
}
