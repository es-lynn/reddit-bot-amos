// To parse this data:
//
//   import { Convert, Comments } from "./file";
//
//   const comments = Convert.toComments(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Comments {
    kind: string;
    data: CommentsData;
}

export interface CommentsData {
    modhash:  string;
    dist:     number;
    children: Comment[];
    after:    string;
    before:   null;
}

export interface Comment {
    kind: string;
    data: ChildData;
}

export interface ChildData {
    awarders:                        any[];
    total_awards_received:           number;
    approved_at_utc:                 null;
    link_title:                      string;
    mod_reason_by:                   null;
    banned_by:                       null;
    author_flair_type:               string;
    removal_reason:                  null;
    link_id:                         string;
    author_flair_template_id:        null | string;
    likes:                           null;
    replies:                         string;
    user_reports:                    any[];
    saved:                           boolean;
    id:                              string;
    banned_at_utc:                   null;
    mod_reason_title:                null;
    gilded:                          number;
    archived:                        boolean;
    no_follow:                       boolean;
    author:                          string;
    num_comments:                    number;
    can_mod_post:                    boolean;
    created_utc:                     number;
    send_replies:                    boolean;
    parent_id:                       string;
    score:                           number;
    author_fullname:                 string;
    over_18:                         boolean;
    approved_by:                     null;
    mod_note:                        null;
    all_awardings:                   any[];
    subreddit_id:                    string;
    body:                            string;
    edited:                          Edited;
    author_flair_css_class:          null | string;
    name:                            string;
    steward_reports:                 any[];
    author_patreon_flair:            boolean;
    downs:                           number;
    author_flair_richtext:           any[];
    is_submitter:                    boolean;
    body_html:                       string;
    gildings:                        Gildings;
    collapsed_reason:                null;
    distinguished:                   null;
    associated_award:                null;
    stickied:                        boolean;
    author_premium:                  boolean;
    can_gild:                        boolean;
    subreddit:                       string;
    author_flair_text_color:         null | string;
    score_hidden:                    boolean;
    permalink:                       string;
    num_reports:                     null;
    link_permalink:                  string;
    report_reasons:                  null;
    link_author:                     string;
    author_flair_text:               null | string;
    link_url:                        string;
    created:                         number;
    collapsed:                       boolean;
    subreddit_name_prefixed:         string;
    controversiality:                number;
    locked:                          boolean;
    author_flair_background_color:   null | string;
    collapsed_because_crowd_control: null;
    mod_reports:                     any[];
    quarantine:                      boolean;
    subreddit_type:                  string;
    ups:                             number;
}

export type Edited = boolean | number;

export interface Gildings {
}