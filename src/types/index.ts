
export interface Line {
    id: string | number,
    text: string
}

export interface Post {
    id: number | string,
    title: string | undefined,
    lines?: Line[]
}

export interface User {
    id: string | number,
    uid: string | number,
    username: string,
    email: string,
    password: string,
    avatar: string,
    created: string,
    posts: Post[],
    admin: boolean
}