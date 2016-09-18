'use babel';
'use strict';

import { Command, Setting } from 'discord-graf';
import { oneLine } from 'common-tags';

export default class MaxLengthCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'max-length',
			aliases: ['max-duration', 'max-song-length', 'max-song-duration'],
			module: 'settings',
			memberName: 'max-length',
			description: 'Shows or sets the max song length.',
			usage: 'max-length [minutes]',
			details: oneLine`
				This is the maximum length of a song that users may queue, in minutes.
				The default is 15. Set to 0 for unlimited.
				Only administrators may change this setting.
			`,
			guildOnly: true
		});
	}

	async run(message, args) {
		if(args[0]) {
			if(!this.bot.permissions.isAdmin(message.guild, message.author)) {
				return `Only administrators may change the max song length.`;
			}
			const maxLength = parseInt(args[0]);
			if(isNaN(maxLength) || maxLength < 0) return `Invalid number provided.`;
			this.bot.storage.settings.save(new Setting(message.guild, 'max-length', maxLength));
			return `Set the maximum song length to ${maxLength} minutes.`;
		}

		const maxLength = this.bot.storage.settings.getValue(message.guild, 'max-length', 5);
		return `The maximum length of a song is ${maxLength ? `${maxLength} minutes` : 'unlimited'}.`;
	}
}
