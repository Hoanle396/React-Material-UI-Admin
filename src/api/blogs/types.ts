import { IUser } from '../auth'

export interface IBlogs{
    id: number,
    name: string,
    slugs: string,
    image: string,
    description: string,
    createAt: string,
    updateAt: string,
    createdBy: IUser,
    comments: IComment[]
}
export interface IComment{
    id: 1,
    text: string,
    createAt: string
    updateAt: string
    createBy: IUser
}

export interface IPayloadCreateBlogs{
  name: string,
  slugs?: string,
  image: string,
  description: string
}

export interface IFormCreateBlogs{
  name: string,
  slugs?: string,
  image: File,
  description: string
}

export interface IPayloadComment{
    text:string
}

export interface IPaginateData{
    skip?: number
    take?:number
}

export interface IListBlogs{
    rows: IBlogs[]
    count:number
}