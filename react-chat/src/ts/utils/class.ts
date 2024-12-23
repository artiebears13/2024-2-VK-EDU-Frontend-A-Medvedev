import {ICacheResponse, ITranslationApiResponse, ITranslationResult} from './interface';
import { fetchTranslation } from './translate';

export class Translator {
    private readonly _base_url: string = 'https://api.mymemory.translated.net/get?q=';
    private _fromLang: string = 'en';
    private _toLang: string = 'ru';
    private _translationCache: Map<string, string> = new Map<string, string>();

    constructor(fromLang: string, toLang: string) {
        this._fromLang = fromLang;
        this._toLang = toLang;
    }

    public async translate(text: string): Promise<ITranslationResult> {
        const checkInCacheResult: ICacheResponse = this.checkInCache(text);
        // console.log({ checkInCacheResult });
        if (checkInCacheResult.match) {
            return {
                ...checkInCacheResult,
                usedCache: true,
            }
        }
        try{
            return await this.fetchTranslation(text);
        }
        catch(error: unknown){
            return {
                originalText: text,
                translatedText: text,
                fromLang: this._fromLang,
                toLang: this._toLang,
                match: false,
                usedCache: false
            }
        }
    }

    public changeFromLang(lang: string): void {
        this._fromLang = lang;
    }

    public changeToLang(lang: string): void {
        this._toLang = lang;
    }

    private createTranslationUrl(text: string): string {
        return `${this._base_url}${encodeURIComponent(text)}&langpair=${this._fromLang}|${this._toLang}`;
    }

    private checkInCache(text: string): ICacheResponse {
        const cacheKey: string = `${this._fromLang}:${this._toLang}:${text}`;
        const translatedText: string = this._translationCache.get(cacheKey) || text;
        console.log({cache: this._translationCache, key: cacheKey,has: this._translationCache.has(cacheKey)});
        if (this._translationCache.has(cacheKey)){
            return {
                originalText: text,
                translatedText,
                match: true,
                fromLang: this._fromLang,
                toLang: this._toLang,
            }
        }
        return {
            originalText: text,
            match: false,
            fromLang: this._fromLang,
            toLang: this._toLang,
            translatedText: '',
        }

    }

    private async fetchTranslation(text: string): Promise<ITranslationResult> {
        const url: string = this.createTranslationUrl(text);
        console.log({url});

        const response: Response = await fetch(url);
        if (!response.ok){
            throw new Error(`Fetch error: ${response.statusText}`);
        }
        const responseData: ITranslationApiResponse = await response.json();
        if (!responseData.responseData.translatedText){
            throw new Error("Api did not return translation");
        }

        this._translationCache.set(
            `${this._fromLang}:${this._toLang}:${text}`,
            responseData.responseData.translatedText
        );
        return {
            originalText: text,
            translatedText: responseData.responseData.translatedText,
            fromLang: this._fromLang,
            toLang: this._toLang,
            usedCache: false,
            match: true,
        };
    }


}
