import path from 'node:path'
import { expect, describe, it, vi, beforeEach } from 'vitest'

// @ts-ignore mocked (original defined in webdriver package)
import got from 'got'
import { remote } from '../../../src'

vi.mock('got')
vi.mock('@wdio/logger', () => import(path.join(process.cwd(), '__mocks__', '@wdio/logger')))

describe('waitForDisplayed', () => {
    const timeout = 1000
    let browser: any

    beforeEach(async () => {
        got.mockClear()

        browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
    })

    it('should call waitUntil', async () => {
        const cb = vi.fn()
        const tmpElem = await browser.$('#foo')
        const elem = {
            selector: '#foo',
            waitForDisplayed: tmpElem.waitForDisplayed,
            elementId: 123,
            waitUntil: vi.fn().mockImplementation(cb),
            options : { waitforInterval: 5, waitforTimeout: timeout }
        }

        await elem.waitForDisplayed({ timeout })
        expect(cb).toBeCalled()
        expect(elem.waitUntil.mock.calls).toMatchSnapshot()
    })

    it('should call isDisplayed and return true immediately if true', async () => {
        const elem = await browser.$('#foo')
        const result = await elem.waitForDisplayed({ timeout })

        expect(result).toBe(true)
        expect(got.mock.calls[2][0].pathname)
            .toBe('/session/foobar-123/element/some-elem-123/displayed')
    })

    it('should call isDisplayed and return true if eventually true', async () => {
        const tmpElem = await browser.$('#foo')
        const elem = {
            selector: '#foo',
            waitForDisplayed: tmpElem.waitForDisplayed,
            elementId: 123,
            waitUntil: tmpElem.waitUntil,
            isDisplayed: vi.fn()
                .mockImplementationOnce(() => false)
                .mockImplementationOnce(() => false)
                .mockImplementationOnce(() => true),
            options: { waitforTimeout: 50, waitforInterval: 5 },
        }

        const result = await elem.waitForDisplayed({ timeout })
        expect(result).toBe(true)
    })

    it('should call isDisplayed and return false', async () => {
        // @ts-ignore uses expect-webdriverio
        expect.assertions(1)
        const tmpElem = await browser.$('#foo')
        const elem = {
            selector: '#foo',
            waitForDisplayed: tmpElem.waitForDisplayed,
            elementId: 123,
            waitUntil: tmpElem.waitUntil,
            isDisplayed: vi.fn(() => false),
            options: { waitforTimeout: 500, waitforInterval: 50 },
        }

        try {
            await elem.waitForDisplayed({ timeout })
        } catch (err: any) {
            expect(err.message).toBe(`element ("#foo") still not displayed after ${timeout}ms`)
        }
    })

    it('should not call isDisplayed and return false if never found', async () => {
        const tmpElem = await browser.$('#foo')
        const elem: any = {
            selector: '#foo',
            parent: { $: vi.fn(() => { return elem}) },
            waitForDisplayed: tmpElem.waitForDisplayed,
            waitUntil: tmpElem.waitUntil,
            isDisplayed: tmpElem.isDisplayed,
            options: { waitforTimeout: 500, waitforInterval: 50 },
        }

        try {
            await elem.waitForDisplayed({ timeout })
        } catch (err: any) {
            expect(err.message).toBe(`element ("#foo") still not displayed after ${timeout}ms`)
        }
    })

    it('should do reverse', async () => {
        const cb = vi.fn()
        const tmpElem = await browser.$('#foo')
        const elem = {
            selector: '#foo',
            waitForDisplayed: tmpElem.waitForDisplayed,
            elementId: 123,
            waitUntil: vi.fn().mockImplementation(cb),
            isDisplayed: vi.fn(() => true),
            options: { waitforTimeout: 500, waitforInterval: 50 },
        }

        await elem.waitForDisplayed({ reverse: true })
        expect(elem.waitUntil.mock.calls).toMatchSnapshot()
    })

    it('should call isDisplayed and return false with custom error', async () => {
        // @ts-ignore uses expect-webdriverio
        expect.assertions(1)
        const tmpElem = await browser.$('#foo')
        const elem = {
            selector: '#foo',
            waitForDisplayed: tmpElem.waitForDisplayed,
            elementId: 123,
            waitUntil: tmpElem.waitUntil,
            isDisplayed: vi.fn(() => false),
            options: { waitforTimeout: 500 },
        }

        try {
            await elem.waitForDisplayed({ timeout, timeoutMsg: 'Element foo never displayed' })
        } catch (err: any) {
            expect(err.message).toBe('Element foo never displayed')
        }
    })
})
