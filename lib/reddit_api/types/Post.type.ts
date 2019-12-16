import {Thread} from "./Threads.type";
import {Comment} from "./Comments.type";

export enum Kind {
	Thread = "t3",
	Comment = "t1"
}

export type Post = {
	kind: Kind
	id: string
	url: string
	author: string
	thread_id: string
	title: string
	body: string
	date: number
}
