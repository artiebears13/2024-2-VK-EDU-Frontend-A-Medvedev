/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
    expect(convertBytesToHuman(-1)).toBe(false)
    expect(convertBytesToHuman(-0.0001)).toBe(false)

    expect(convertBytesToHuman(true)).toBe(false)

    expect(convertBytesToHuman('zero')).toBe(false)
    expect(convertBytesToHuman('5')).toBe(false)

});

test('Возвращает корректное значение для чисел', () => {
    expect(convertBytesToHuman(5)).toBe('5 B')
    expect(convertBytesToHuman(123123123)).toBe('117.42 MB')

    expect(convertBytesToHuman(1023)).toBe('1023 B')
    expect(convertBytesToHuman(1024)).toBe('1 KB')
    expect(convertBytesToHuman(1025)).toBe('1 KB')

    expect(convertBytesToHuman(1024 * 1024 * 1024 * 1.5)).toBe('1.5 GB')
    expect(convertBytesToHuman(1024 * 1024 * 1024 * 1024 * 1.27)).toBe('1.27 TB')
    expect(convertBytesToHuman(1024 * 1024 * 1024 * 1024 * 1024 * 1.99)).toBe('1.99 PB')


});

test('Возвращает корректное округленное значение', () => {
    expect(convertBytesToHuman(1024 * 1024 * 1024 * 1024 * 1024 * 1.945)).toBe('1.95 PB')
    expect(convertBytesToHuman(1.05)).toBe('1.05 B')
    expect(convertBytesToHuman(1.005)).toBe('1.01 B')
});

