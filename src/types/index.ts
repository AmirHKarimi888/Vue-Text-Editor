export interface DocTextLine {
    id: string | number,
    content: string | number,
    style?: string[]
}

export interface Doc {
    id: string | number,
    title: string,
    text: DocTextLine[],
    style?: string[]
}

export interface AreYouSureModalInfo {
    message: string,
    function: any
}