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