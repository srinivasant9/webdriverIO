import path from 'node:path'
import { expect, describe, it, afterEach, vi } from 'vitest'

// @ts-ignore mocked (original defined in webdriver package)
import got from 'got'
import { remote } from '../../../src'

vi.mock('got')
vi.mock('@wdio/logger', () => import(path.join(process.cwd(), '__mocks__', '@wdio/logger')))

describe('click test', () => {
    it('should allow to left click on an element without passing a button type', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click()

        expect(got.mock.calls[2][0].pathname)
            .toBe('/session/foobar-123/element/some-elem-123/click')
    })

    it('should allow to left click on an element by passing a button type', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click({ button: 'left' })

        expect(got.mock.calls[2][0].pathname)
            .toBe('/session/foobar-123/actions')
        expect(got.mock.calls[2][1].json.actions[0].actions[1])
            .toStrictEqual({ type: 'pointerDown', button: 0 })
        expect(got.mock.calls[2][1].json.actions[0].actions[2])
            .toStrictEqual({ type: 'pointerUp', button: 0 })

        await elem.click({ button: 0 })

        expect(got.mock.calls[4][0].pathname)
            .toBe('/session/foobar-123/actions')
        expect(got.mock.calls[4][1].json.actions[0].actions[1])
            .toStrictEqual({ type: 'pointerDown', button: 0 })
        expect(got.mock.calls[4][1].json.actions[0].actions[2])
            .toStrictEqual({ type: 'pointerUp', button: 0 })
    })

    it('should allow to right click on an element', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click({ button: 'right' })

        expect(got.mock.calls[2][0].pathname)
            .toBe('/session/foobar-123/actions')
        expect(got.mock.calls[2][1].json.actions[0].actions[0].type)
            .toBe('pointerMove')
        expect(got.mock.calls[2][1].json.actions[0].actions[1])
            .toStrictEqual({ type: 'pointerDown', button: 2 })
        expect(got.mock.calls[2][1].json.actions[0].actions[2])
            .toStrictEqual({ type: 'pointerUp', button: 2 })

        await elem.click({ button: 2 })

        expect(got.mock.calls[4][0].pathname)
            .toBe('/session/foobar-123/actions')
        expect(got.mock.calls[4][1].json.actions[0].actions[0].type)
            .toBe('pointerMove')
        expect(got.mock.calls[4][1].json.actions[0].actions[1])
            .toStrictEqual({ type: 'pointerDown', button: 2 })
        expect(got.mock.calls[4][1].json.actions[0].actions[2])
            .toStrictEqual({ type: 'pointerUp', button: 2 })
    })

    it('should allow to middle click on an element', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click({ button: 'middle' })

        expect(got.mock.calls[2][0].pathname)
            .toBe('/session/foobar-123/actions')
        expect(got.mock.calls[2][1].json.actions[0].actions[0].type)
            .toBe('pointerMove')
        expect(got.mock.calls[2][1].json.actions[0].actions[1])
            .toStrictEqual({ type: 'pointerDown', button: 1 })
        expect(got.mock.calls[2][1].json.actions[0].actions[2])
            .toStrictEqual({ type: 'pointerUp', button: 1 })

        await elem.click({ button: 1 })

        expect(got.mock.calls[4][0].pathname)
            .toBe('/session/foobar-123/actions')
        expect(got.mock.calls[4][1].json.actions[0].actions[0].type)
            .toBe('pointerMove')
        expect(got.mock.calls[4][1].json.actions[0].actions[1])
            .toStrictEqual({ type: 'pointerDown', button: 1 })
        expect(got.mock.calls[4][1].json.actions[0].actions[2])
            .toStrictEqual({ type: 'pointerUp', button: 1 })
    })

    it('should allow to left click on an element with an offset without passing a button type', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click({ y: 30 })

        expect(got.mock.calls[2][0].pathname)
            .toBe('/session/foobar-123/actions')
        expect(got.mock.calls[2][1].json.actions[0].actions[0].type)
            .toBe('pointerMove')
        expect(got.mock.calls[2][1].json.actions[0].actions[0].x)
            .toBe(0)
        expect(got.mock.calls[2][1].json.actions[0].actions[0].y)
            .toBe(30)
        expect(got.mock.calls[2][1].json.actions[0].actions[1])
            .toStrictEqual({ type: 'pointerDown', button: 0 })
        expect(got.mock.calls[2][1].json.actions[0].actions[2])
            .toStrictEqual({ type: 'pointerUp', button: 0 })
    })

    it('should allow to right click on an element with an offset and passing a button type', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click({ button: 2, x: 40, y: 30 })

        expect(got.mock.calls[2][0].pathname)
            .toBe('/session/foobar-123/actions')
        expect(got.mock.calls[2][1].json.actions[0].actions[0].type)
            .toBe('pointerMove')
        expect(got.mock.calls[2][1].json.actions[0].actions[0].x)
            .toBe(40)
        expect(got.mock.calls[2][1].json.actions[0].actions[0].y)
            .toBe(30)
        expect(got.mock.calls[2][1].json.actions[0].actions[1])
            .toStrictEqual({ type: 'pointerDown', button: 2 })
        expect(got.mock.calls[2][1].json.actions[0].actions[2])
            .toStrictEqual({ type: 'pointerUp', button: 2 })
    })

    it('should allow to left click on an element (no w3c)', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar-noW3C'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click({ button: 'left' })

        expect(got.mock.calls[3][0].pathname)
            .toBe('/session/foobar-123/moveto')
        expect(got.mock.calls[3][1].json)
            .toStrictEqual({ element: 'some-elem-123', xoffset: 25, yoffset: 15 })
        expect(got.mock.calls[4][0].pathname)
            .toBe('/session/foobar-123/click')
        expect(got.mock.calls[4][1].json).toStrictEqual({ button: 0 })

        await elem.click({ button: 0 })

        expect(got.mock.calls[6][0].pathname)
            .toBe('/session/foobar-123/moveto')
        expect(got.mock.calls[6][1].json)
            .toStrictEqual({ element: 'some-elem-123', xoffset: 25, yoffset: 15 })
        expect(got.mock.calls[7][0].pathname)
            .toBe('/session/foobar-123/click')
        expect(got.mock.calls[7][1].json).toStrictEqual({ button: 0 })
    })

    it('should allow to right click on an element (no w3c)', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar-noW3C'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click({ button: 'right' })

        expect(got.mock.calls[3][0].pathname)
            .toBe('/session/foobar-123/moveto')
        expect(got.mock.calls[3][1].json)
            .toStrictEqual({ element: 'some-elem-123', xoffset: 25, yoffset: 15 })
        expect(got.mock.calls[4][0].pathname)
            .toBe('/session/foobar-123/click')
        expect(got.mock.calls[4][1].json)
            .toStrictEqual({ button: 2 })

        await elem.click({ button: 2 })

        expect(got.mock.calls[6][0].pathname)
            .toBe('/session/foobar-123/moveto')
        expect(got.mock.calls[6][1].json)
            .toStrictEqual({ element: 'some-elem-123', xoffset: 25, yoffset: 15 })
        expect(got.mock.calls[7][0].pathname)
            .toBe('/session/foobar-123/click')
        expect(got.mock.calls[7][1].json)
            .toStrictEqual({ button: 2 })
    })

    it('should allow to middle click on an element (no w3c)', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar-noW3C'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click({ button: 'middle' })

        expect(got.mock.calls[3][0].pathname)
            .toBe('/session/foobar-123/moveto')
        expect(got.mock.calls[3][1].json)
            .toStrictEqual({ element: 'some-elem-123', xoffset: 25, yoffset: 15 })
        expect(got.mock.calls[4][0].pathname)
            .toBe('/session/foobar-123/click')
        expect(got.mock.calls[4][1].json)
            .toStrictEqual({ button: 1 })

        await elem.click({ button: 1 })

        expect(got.mock.calls[6][0].pathname)
            .toBe('/session/foobar-123/moveto')
        expect(got.mock.calls[6][1].json)
            .toStrictEqual({ element: 'some-elem-123', xoffset: 25, yoffset: 15 })
        expect(got.mock.calls[7][0].pathname)
            .toBe('/session/foobar-123/click')
        expect(got.mock.calls[7][1].json)
            .toStrictEqual({ button: 1 })
    })

    it('should allow to left click on an element with an offset without passing a button type (no w3c)', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar-noW3C'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click({ y: 30 })

        expect(got.mock.calls[3][0].pathname)
            .toBe('/session/foobar-123/moveto')
        expect(got.mock.calls[3][1].json)
            .toStrictEqual({ element: 'some-elem-123', xoffset: 25, yoffset: 45 })
        expect(got.mock.calls[4][0].pathname)
            .toBe('/session/foobar-123/click')
        expect(got.mock.calls[4][1].json)
            .toStrictEqual({ button: 0 })
    })

    it('should allow to right click on an element with an offset and passing a button type (no w3c)', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar-noW3C'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click({ button: 2, x: 40, y: 30 })

        expect(got.mock.calls[3][0].pathname)
            .toBe('/session/foobar-123/moveto')
        expect(got.mock.calls[3][1].json)
            .toStrictEqual({ element: 'some-elem-123', xoffset: 65, yoffset: 45 })
        expect(got.mock.calls[4][0].pathname)
            .toBe('/session/foobar-123/click')
        expect(got.mock.calls[4][1].json).toStrictEqual({ button: 2 })
    })

    it('should throw an error if the passed argument is not an options object', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')

        expect(elem.click([])).rejects.toThrow('Options must be an object')
    })

    it('should throw an error if no valid coördicates are passed', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')

        expect(elem.click({ x: 'not-suppported' })).rejects.toThrow('Coordinates must be integers')
    })

    it('should throw an error if no valid button type is passed', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')

        expect(elem.click({ button: 'not-suppported' })).rejects.toThrow('Button type not supported.')
    })

    it('should ignore errors in releaseAction', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')

        await elem.click.call({
            options: {},
            isW3C: true,
            selector: 'foobar',
            elementId: 'barfoo',
            releaseActions: vi.fn().mockRejectedValue(new Error('some modal disturbs here')),
            performActions: vi.fn().mockResolvedValue({})
        }, {})
    })

    it('should not call releaseAction when skipRelease is true', async () => {
        const browser = await remote({
            baseUrl: 'http://foobar.com',
            capabilities: {
                browserName: 'foobar'
            }
        })
        const elem = await browser.$('#foo')
        await elem.click({ button: 'right' })

        expect(got.mock.calls.length)
            .toBe(4)
        expect(got.mock.calls[3][0].pathname)
            .toBe('/session/foobar-123/actions')
        expect(got.mock.calls[3][1].method)
            .toBe('DELETE')

        await elem.click({ button: 'right', skipRelease: true })

        // only post call should be made, delete call should be skipped so only one additional mock call
        expect(got.mock.calls.length)
            .toBe(5)
    })

    afterEach(() => {
        got.mockClear()
    })
})
