import {Comment} from './types/Comments.type'
import {Kind, Post} from './types/Post.type'
import {Thread} from './types/Threads.type'
import {Child, Search} from "./types/Search.type";
import {Log} from "../../src/app/Spring";
import {InvalidArgumentError} from "../ext/Errors";

export function map_t1(it: Comment): Post {
	return {
		id: `t1_${it.data.id}`,
		author: it.data.author,
		body: it.data.body,
		date: it.data.created_utc,
		kind: Kind.Comment,
		parent_id: it.data.parent_id,
		thread_id: it.data.link_id,
		title: it.data.link_title,
		url: `https://reddit.com${it.data.permalink}`
	}
}

export function map_t3(it: Thread): Post {
	// HACK: AWS DyanmoDB cannot insert keys with empty values
	//  Please fix AWS DynamoDB insert function instead!
	return {
		id: it.data.name,
		author: it.data.author,
		// body: it.data.selftext
		body: it.data.selftext === '' ? '<empty>' : it.data.selftext,
		date: it.data.created_utc,
		kind: Kind.Thread,
		thread_id: it.data.name,
		title: it.data.title,
		url: it.data.url,
	}
}

export function map_search(it: Child): Post {
	if (it.kind === Kind.Comment) {
		return map_t1(it as any)
	} else if (it.kind === Kind.Thread) {
		return map_t3(it as any)
	} else {
		throw new InvalidArgumentError(`Invalid kind: ${it.kind}, id: ${it.data.id}`)
	}
}