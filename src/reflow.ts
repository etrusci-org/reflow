export class Reflow {
    id: string = this.getNewId()
    createdOn: number = Date.now()
    label: string = ''

    element: JQuery<HTMLTableRowElement> = $(`
        <tr>
            <td class="id"></td>
            <td class="createdOn"></td>
            <td class="label"></td>
            <td class="ctrl">
                <button class="start">start</button>
                <button class="pause">pause</button>
                <button class="reset">reset</button>
                <button class="delete">delete</button>
            </td>
        </tr>
    `)

    // --------------------------------------------------------------------------------------------

    constructor(label?: string) {
        if (label) {
            this.label = label.trim()
        }

        this.bakeElement()
    }

    // --------------------------------------------------------------------------------------------

    add(): void {
        $(this.element).appendTo('.timers')
    }


    start(): void {
        this.avoidDoubleClick('.ctrl .start')
    }


    pause(): void {
        this.avoidDoubleClick('.ctrl .pause')
    }


    reset(): void {
        this.avoidDoubleClick('.ctrl .reset')
    }


    delete(): void {
        this.avoidDoubleClick('.ctrl .delete', true)
        $(this.element).remove()
    }

    // --------------------------------------------------------------------------------------------

    getNewId(length: number = 8): string {
        let chars: string[] = 'abcdefghkmnprstuvwxyz23456789'.split('')
        let id: string = ''

        length = Math.min(length, chars.length)

        while (id.length < length) {
            id += chars.splice(Math.floor(Math.random() * chars.length), 1)
        }

        return id
    }


    bakeElement(): void {
        $(this.element).find('.ctrl .start').on('click', () => { this.start() })
        $(this.element).find('.ctrl .pause').on('click', () => { this.pause() })
        $(this.element).find('.ctrl .reset').on('click', () => { this.reset() })
        $(this.element).find('.ctrl .delete').on('click', () => { this.delete() })

        $(this.element).find('.id').text(this.id)
        $(this.element).find('.createdOn').text(this.createdOn)
        $(this.element).find('.label').text(this.label)
    }


    avoidDoubleClick(elementSelector: string, everywhere: boolean = false, timeout: number = 500): void {
        if (!everywhere) {
            $(this.element).find(elementSelector).prop('disabled', true)
            setTimeout(() => {
                $(this.element).find(elementSelector).prop('disabled', false)
            }, timeout)
        }
        else {
            $(elementSelector).prop('disabled', true)
            setTimeout(() => {
                $(elementSelector).prop('disabled', false)
            }, timeout)
        }

    }
}
