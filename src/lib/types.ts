export interface Voice {
    name: string;
    id: string;
}

export interface VoiceSettings {
    stability: number;
    similarity: number;
}

export interface ClientSettings {
    voice?: string;
    stability?: number;
    similarity?: number;
    channel?: string;
    quoteUser?: string;
    ignoreQuote?: boolean;
}

export interface Character {
    id: number;
    avatar: number;
    name: string;
}

export interface MessageFeed {
    id: number;
    host: boolean;
    avatar: number;
    name: string;
    timestamp: string;
    message: string;
    color: string;
}