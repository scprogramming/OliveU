export interface AuthResponse{
    message:string,
    status:number,
    token:string
}

export interface StatusOnlyRes{
    status:boolean
}

export interface CourseRes{
    courses:any
}

export interface CourseDetails{
    details:any,
    modules:any,
    lessons:any
}

export interface Lessons{
    id:any,
    module_id:any,
    title:any,
    content:any,
    content_type:any,
    course_id:any
}