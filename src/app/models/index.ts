export interface UserResponse {
    data: User
}

export interface ResourcesResponse {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: Resource[]
}

export interface UsersResponse {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: User[]
}

export interface Resource {
    id: number
    name: string
    year: number
    color: string
    pantone_value: string
}

export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

export interface AuthRequest {
    email: string,
    password: string,
}

export interface LoginResponse {
    token: string,
    error: string,
}

export interface SignupResponse {
    id: number,
    token: string,
    error: string,
}

