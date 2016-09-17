'use babel';
'use strict';

export default class Song {
	constructor(info, url, member) {
		this.name = escapeMarkdown(info.title);
		this.url = url;
		this.id = info.video_id;
		this.length = parseInt(info.length_seconds);
		this.member = member;
		this.dispatcher = null;
		this.playing = false;
	}

	get username() {
		const name = escapeMarkdown(this.member.nickname ? this.member.nickname : this.member.user.username);
		return `${name}#${this.member.user.discriminator}`;
	}

	get lengthString() {
		return `${Math.floor(this.length / 60)}:${`0${this.length % 60}`.slice(-2)}`;
	}
}

function escapeMarkdown(text) {
	return text.replace(/([^\\]|^)(\*|_|`|~)/g, '$1\\$2');
}
