
export interface Line {
    id: string | number,
    text: string
}

export interface Post {
    id: number | string,
    title: string | undefined,
    lines?: Line[]
}