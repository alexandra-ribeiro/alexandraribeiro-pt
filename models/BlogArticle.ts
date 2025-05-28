export interface BlogArticle {
  _id?: string
  title: string
  slug: string
  description: string
  content: string
  date: string
  image: string
  published: boolean
  language: string
  createdAt?: Date
  updatedAt?: Date
}
