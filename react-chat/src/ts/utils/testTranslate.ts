import { Translator } from './class';
import {ITranslateOptions, ITranslationResult} from "./interface";
import {fetchTranslation} from "./translate";

async function test() {
    try {
        const translator: Translator = new Translator('ru', 'en');
        await translator.translate("Привет, мир").then(res => console.log(res));
        await translator.translate("Привет, мир").then(res => console.log(res));
        translator.changeFromLang('en');
        translator.changeToLang('ru');
        await translator.translate("hello, world").then(res => console.log(res));

        const testData: ITranslateOptions  = {
            text: "Hello, world!",
            fromLanguage: "en",
            toLanguage: "ru",
        }
        await fetchTranslation(testData).then(res=> console.log(res));
        await fetchTranslation(testData).then(res=> console.log(res));

        const anotherTestData: ITranslateOptions = {
            text: "Привет, мир!",
            fromLanguage: "ru",
            toLanguage: "en",
        }
        await fetchTranslation(anotherTestData).then(res=> console.log(res));

    } catch (error) {
        console.error('Error in main.ts:', error);
    }
}

test();
