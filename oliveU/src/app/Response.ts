export interface AuthResponse{
    message:string,
    status:number,
    token:string
}

export interface StatusOnlyRes{
    status:boolean
}

export interface StatusMessageRes{
    status:any,
    message:any
}

export interface CourseRes{
    courses:any
}

export interface ArticleRes{
    articles:any
}

export interface CourseDetails{
    details:any,
    modules:any,
    lessons:any
}

export interface ArticleDetails{
    title:any,
    content:any,
    description:any,
    thumbnail:any
}

export interface EnrollRes{
    status:any,
    message:any,
    value:boolean
}

export interface Lessons{
    id:any,
    module_id:any,
    title:any,
    content:any,
    content_type:any,
    course_id:any
}

export interface UserDetailRes{
    status:any,
    message:any,
    user_details:any,
    user_id:any,
    email:any
}