import {ITranslationResult, ITranslateOptions} from "./interface";

export type TranslationFunction = (options: ITranslateOptions) => Promise<ITranslationResult>;