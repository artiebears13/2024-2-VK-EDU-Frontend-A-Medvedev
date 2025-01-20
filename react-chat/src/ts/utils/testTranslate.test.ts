import { Translator } from './class';
import { fetchTranslation } from './translate';

describe('Translator Integration Test', () => {
    let translator: Translator;

    beforeEach(() => {
        translator = new Translator('ru', 'en');
    });

    test('Check latin symbols in translation', async () => {
        const result = await translator.translate("Привет, мир");
        expect(/[A-Za-z]/.test(result.translatedText)).toBe(true);
    });

    test('Test cache', async () => {
        await translator.translate("Привет, мир");
        const result = await translator.translate("Привет, мир");
        expect(result.usedCache).toBe(true);
    });

    test('Test Cyrillic symbols in translation', async () => {
        translator.changeFromLang('en');
        translator.changeToLang('ru');
        const result = await translator.translate("hello, world");
        expect(/[А-Яа-я]/.test(result.translatedText)).toBe(true);
    });

    test('Test cache', async () => {
        const testData = {
            text: "Hello, world!",
            fromLanguage: "en",
            toLanguage: "ru",
        };
        await fetchTranslation(testData);
        const result = await fetchTranslation(testData);
        expect(result.usedCache).toBe(true);
    });

});
