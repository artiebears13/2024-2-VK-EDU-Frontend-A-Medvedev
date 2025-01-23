
import { ITranslateOptions, ITranslationApiResponse, ITranslationResult } from './interface';

const translationCache: Map<string, string> = new Map<string, string>();

function createTranslationUrl(options: ITranslateOptions): string {
    const fromLang = options.fromLanguage;
    const toLang = options.toLanguage;
    const encodedText = encodeURIComponent(options.text);

    return `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${fromLang}|${toLang}`;
}

export async function fetchTranslation(options: ITranslateOptions): Promise<ITranslationResult> {
    const fromLang: string = options.fromLanguage;
    const toLang: string = options.toLanguage;
    const text: string = options.text.trim();
    if (!text) {
        return null;
    }

    const cacheKey: string = `${fromLang}:${toLang}:${text}`;

    if (translationCache.has(cacheKey)) {
        return {
            originalText: text,
            translatedText: translationCache.get(cacheKey)!,
            fromLang,
            toLang,
            usedCache: true,
            match: true
        };
    }

    const url: string = createTranslationUrl(options);

    const response: Response = await fetch(url);

    if (!response.ok) {
        console.error(`Fetch error: ${response.status} ${response.statusText}`);
    }

    const data: ITranslationApiResponse = await response.json();
    if (data.responseStatus)
    if (!data.responseData?.translatedText) {
        console.error('API did not return translatedText');
    }

    const resultText: string = data.responseData.translatedText;
    translationCache.set(cacheKey, resultText);

    return {
        originalText: text,
        translatedText: resultText,
        fromLang,
        toLang,
        usedCache: false,
        match: true
    };
}
