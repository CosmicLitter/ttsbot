export interface Voice {
    id: string;
    name: string;
}

export interface VoiceSettings {
    voice: string;
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
    rReading?: boolean;
    rReadingChance?: number;
    prompt?: string;
    respond?: boolean;
    apiKeys?: {
        openAi?: string;
        elevenLabs?: string;
    }
    usersVoice?: {
        voiceWhitelist?: ViewerSettings[];
    }
    voiceLibrary?: Voice[];
}

export interface Character {
    id: number;
    name: string;
    prompt: string;
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

export interface ViewerSettings {
    viewerName: string;
    voiceSettings: VoiceSettings;
}