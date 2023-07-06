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