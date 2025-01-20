interface IBaseTranslationResponse{
    originalText: string;
    translatedText: string;
    fromLang: string;
    toLang: string;
    match: boolean;
}

export interface ITranslationResult extends IBaseTranslationResponse{
    usedCache: boolean;
}
export interface ICacheResponse extends IBaseTranslationResponse {}

export interface ITranslateOptions {
    text: string;
    fromLanguage: string;
    toLanguage: string;
}

export interface ITranslationApiResponse {
    responseData: {
        translatedText: string;
        match?: number;
    };
    responseStatus: number;
    matches?: Array<{
        translation: string;
        quality: number;
        match: number;
    }>;
}



