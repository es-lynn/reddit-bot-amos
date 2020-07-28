export type Post = {
  id: string
  kind: 't1' | 't3'
  url: string
  author: string
  thread_id: string
  parent_id?: string
  title: string
  body: string
  date: Date
}
