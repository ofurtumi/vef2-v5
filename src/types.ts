export interface IEventOverview {
    id: number;
    name: string;
    slug: string;
    description?: string;
    created: string;
    updated: string;
}

export interface IEventArray {
    items: Array<IEventOverview>;
    limit: number;
    offset: number;
}

export interface IComment {
    id: number;
    username: string;
    name: string;
    comment?: string;
}

export interface IEventSingle {
    id: number;
    name: string;
    slug: string;
    description?: string;
    creatorId?: number;
    created: string;
    updated: string;
    registrations?: Array<IComment>
}