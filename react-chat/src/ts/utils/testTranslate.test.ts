import { Translator } from './class';
import { fetchTranslation } from './translate';

describe('Translator Test', () => {
    let translator: Translator;

    beforeEach(() => {
        translator = new Translator('ru', 'en');
        jest.restoreAllMocks();
    });

    test('Integration test', async () => {

        let result;
        result = await translator.translate("Привет, мир");
        expect(/[A-Za-z]/.test(result.translatedText)).toBe(true);

        translator.changeFromLang('en');
        translator.changeToLang('ru');
        result = await translator.translate("hello, world");
        expect(/[А-Яа-я]/.test(result.translatedText)).toBe(true);
    });

    test('Cache test', async () => {
        const fetchSpy = jest.spyOn(global, 'fetch');

        fetchSpy.mockResolvedValueOnce(new Response(JSON.stringify({
            responseData: { translatedText: 'Hello, world!', match: 1},
            responseStatus: 200
        }), {status: 200}));

        const testString = "Привет, мир";
        let result;

        result = await translator.translate(testString);
        expect(result.usedCache).toBe(false);

        result = await translator.translate(testString);
        expect(result.usedCache).toBe(true);

        result = await translator.translate(testString + " что то еще");
        expect(result.usedCache).toBe(false);

        translator.changeFromLang('en');
        translator.changeToLang('ru');
        result = await translator.translate(testString);
        expect(result.usedCache).toBe(false);
    });
});
