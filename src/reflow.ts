export class Reflow {
    id: string = this.getNewId()
    label: string = ''
    startedOn: number = 0
    cycleStartedOn: number = 0
    cycle: number = 0
    cycleElapsed: number = 0
    totalElapsed: number = 0
    averageElapsed: number = 0

    worker: Worker

    elementContainerSelector: string = '.timers tbody'
    element: JQuery<HTMLTableRowElement> = $(`
        <tr>
            <td class="label" title="Label">-</td>
            <td class="cycle" title="Current cycle">-</td>
            <td class="cycleElapsed" title="Elapsed time in current cycle">-</td>
            <td class="totalElapsed" title="Total time elapsed since start">-</td>
            <td class="averageElapsed" title="Average time elapsed per cycle">-</td>
            <td class="ctrl">
                <button class="start" title="Start timer">start</button>
                <button class="reset hidden" title="Start new cycle">reset</button>
                <button class="stop hidden" title="Stop timer">stop</button>
                <button class="delete hidden" title="Delete timer">delete</button>
            </td>
        </tr>
    `)

    // --------------------------------------------------------------------------------------------

    constructor(label?: string) {
        if (label) {
            this.label = label.trim()
        }
        else {
            this.label = this.id
        }

        this.worker = new Worker('./reflow-worker.js')

        this.worker.onmessage = (event) => {
            this.updateElement(
                event.data.cycleElapsed,
                event.data.totalElapsed,
                event.data.averageElapsed
            )
        }

        this.bakeElement()
    }

    // --------------------------------------------------------------------------------------------

    add(): void {
        $(this.element).appendTo(this.elementContainerSelector)
    }


    start(): void {
        $(this.element).find('.ctrl .start').remove()
        $(this.element).find('.ctrl .stop').removeClass('hidden')
        $(this.element).find('.ctrl .reset').removeClass('hidden')

        this.startedOn = Date.now()
        this.cycleStartedOn = Date.now()
        this.cycle = 1

        $(this.element).find('.cycle').text(this.cycle)

        this.worker.postMessage({
            action: 'start',
            startedOn: this.startedOn,
            cycleStartedOn: this.cycleStartedOn,
            cycle: this.cycle,
        })
    }


    stop(): void {
        $(this.element).find('.ctrl .stop').remove()
        $(this.element).find('.ctrl .reset').remove()
        $(this.element).find('.ctrl .delete').removeClass('hidden')

        this.worker.postMessage({
            action: 'stop',
        })

        this.worker.terminate()
    }


    reset(): void {
        this.avoidDoubleClick('.ctrl .reset')

        this.cycleStartedOn = Date.now()
        this.cycle += 1

        $(this.element).find('.cycle').text(this.cycle)

        this.worker.postMessage({
            action: 'reset',
            startedOn: this.startedOn,
            cycleStartedOn: this.cycleStartedOn,
            cycle: this.cycle,
        })
    }


    delete(): void {
        this.avoidDoubleClick('.ctrl .delete', true)

        $(this.element).remove()

        this.worker.postMessage({
            action: 'delete',
        })

        this.worker.terminate()

    }

    // --------------------------------------------------------------------------------------------

    updateElement(cycleElapsed: number, totalElapsed: number, averageElapsed: number): void {
        $(this.element).find('.cycleElapsed').html(this.secToDur(cycleElapsed / 1000))
        $(this.element).find('.totalElapsed').html(this.secToDur(totalElapsed / 1000))
        $(this.element).find('.averageElapsed').html(this.secToDur(averageElapsed / 1000))
    }


    getNewId(length: number = 6): string {
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
        $(this.element).find('.ctrl .reset').on('click', () => { this.reset() })
        $(this.element).find('.ctrl .stop').on('click', () => { this.stop() })
        $(this.element).find('.ctrl .delete').on('click', () => { this.delete() })

        $(this.element).find('.label').text(this.label)
    }


    avoidDoubleClick(elementSelector: string, everywhere: boolean = false, timeout: number = 750): void {
        let e: null | JQuery<HTMLElement> = null

        if (!everywhere) {
            e = $(this.element).find(elementSelector)
        }
        else {
            e = $(elementSelector)
        }

        $(e).prop('disabled', true)

        setTimeout(() => {
            if (!e) return
            $(e).prop('disabled', false)
        }, timeout)
    }


    secToDur(seconds: number): string {
        // seconds = seconds + (86400 * 3) + (3600 * 23) + (60 * 59) + 55
        // seconds = seconds + 3595
        // seconds = seconds + 55

        let d = Math.floor(seconds / (3600 * 24))
        let h = Math.floor(seconds % (3600 * 24) / 3600)
        let m = Math.floor(seconds % 3600 / 60)
        // let s = Math.floor(seconds % 60)
        let s = seconds % 60

        let elapsed = ''
        if (seconds >= 86400) elapsed += `${d}<span class="unit">d</span> `
        if (seconds >= 3600)  elapsed += `${h}<span class="unit">h</span> `
        if (seconds >= 60)    elapsed += `${m}<span class="unit">m</span> `
        elapsed += `${s.toFixed(2).padStart(5, '0')}<span class="unit">s</span>`

        return elapsed
    }



}
