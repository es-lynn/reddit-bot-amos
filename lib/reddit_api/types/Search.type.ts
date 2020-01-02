export interface Search {
	kind: string;
	data: SearchData;
}

export interface SearchData {
	modhash:  string;
	dist:     number;
	children: Child[];
	after:    string;
	before:   null;
}

export interface Child {
	kind: string;
	data: ChildData;
}

export interface ChildData {
	awarders:                         any[];
	total_awards_received:            number;
	approved_at_utc:                  null;
	link_title?:                      string;
	mod_reason_by:                    null;
	banned_by:                        null;
	author_flair_type:                string;
	removal_reason:                   null;
	link_id?:                         string;
	author_flair_template_id:         null;
	likes:                            boolean;
	replies?:                         string;
	user_reports:                     any[];
	saved:                            boolean;
	id:                               string;
	banned_at_utc:                    null;
	mod_reason_title:                 null;
	gilded:                           number;
	archived:                         boolean;
	no_follow:                        boolean;
	author:                           string;
	num_comments:                     number;
	can_mod_post:                     boolean;
	created_utc:                      number;
	send_replies:                     boolean;
	parent_id?:                       string;
	score:                            number;
	author_fullname:                  string;
	over_18:                          boolean;
	approved_by:                      null;
	mod_note:                         null;
	all_awardings:                    any[];
	subreddit_id:                     string;
	body?:                            string;
	edited:                           boolean;
	author_flair_css_class:           null;
	name:                             string;
	steward_reports:                  any[];
	author_patreon_flair:             boolean;
	downs:                            number;
	author_flair_richtext:            any[];
	is_submitter?:                    boolean;
	body_html?:                       string;
	gildings:                         Gildings;
	collapsed_reason?:                null;
	distinguished:                    null;
	associated_award?:                null;
	stickied:                         boolean;
	author_premium:                   boolean;
	can_gild:                         boolean;
	subreddit:                        string;
	author_flair_text_color:          null;
	score_hidden?:                    boolean;
	permalink:                        string;
	num_reports:                      null;
	link_permalink?:                  string;
	report_reasons:                   null;
	link_author?:                     string;
	author_flair_text:                null;
	link_url?:                        string;
	created:                          number;
	collapsed?:                       boolean;
	subreddit_name_prefixed:          string;
	controversiality?:                number;
	locked:                           boolean;
	author_flair_background_color:    null;
	collapsed_because_crowd_control?: null;
	rte_mode:                         string;
	mod_reports:                      any[];
	quarantine:                       boolean;
	subreddit_type:                   string;
	ups:                              number;
	selftext?:                        string;
	clicked?:                         boolean;
	title?:                           string;
	link_flair_richtext?:             any[];
	hidden?:                          boolean;
	pwls?:                            null;
	link_flair_css_class?:            null;
	thumbnail_height?:                number;
	hide_score?:                      boolean;
	link_flair_text_color?:           string;
	media_embed?:                     Gildings;
	thumbnail_width?:                 number;
	is_original_content?:             boolean;
	secure_media?:                    null;
	is_reddit_media_domain?:          boolean;
	is_meta?:                         boolean;
	category?:                        null;
	secure_media_embed?:              Gildings;
	link_flair_text?:                 null;
	thumbnail?:                       string;
	content_categories?:              null;
	is_self?:                         boolean;
	link_flair_type?:                 string;
	wls?:                             null;
	removed_by_category?:             string;
	domain?:                          string;
	allow_live_comments?:             boolean;
	selftext_html?:                   null;
	suggested_sort?:                  null;
	view_count?:                      null;
	is_crosspostable?:                boolean;
	pinned?:                          boolean;
	media_only?:                      boolean;
	spoiler?:                         boolean;
	visited?:                         boolean;
	removed_by?:                      null;
	link_flair_background_color?:     string;
	is_robot_indexable?:              boolean;
	discussion_type?:                 null;
	whitelist_status?:                null;
	contest_mode?:                    boolean;
	parent_whitelist_status?:         null;
	url?:                             string;
	subreddit_subscribers?:           number;
	num_crossposts?:                  number;
	media?:                           null;
	is_video?:                        boolean;
}

export interface Gildings {
}
