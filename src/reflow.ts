export class Reflow {
    id: string = this.getNewId()
    label: string = ''
    startedOn: number = 0
    cycleStartedOn: number = 0
    cycle: number = 0
    cycleElapsed: number = 0
    totalElapsed: number = 0
    averageElapsed: number = 0

    alertAfter: number = 0

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
                <button class="delete" title="Delete timer">delete</button>
            </td>
        </tr>
    `)

    // --------------------------------------------------------------------------------------------

    constructor(label?: string, alertAfter?: string) {
        if (label) {
            this.label = label.trim()
        }
        else {
            this.label = this.id
        }

        if (alertAfter) {
        //     this.alertAfter = Math.max(parseInt(alertAfter), 0) * 1000
            this.alertAfter = this.durToSec(alertAfter)
        }

        this.worker = new Worker('./reflow-worker.js')

        this.worker.onmessage = (event) => {
            this.updateElement(
                event.data.cycleElapsed,
                event.data.totalElapsed,
                event.data.averageElapsed,
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

        let now = Date.now()
        this.startedOn = now
        this.cycleStartedOn = now
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
        // $(this.element).find('.ctrl .delete').removeClass('hidden')

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

        $(this.element).find('.cycleElapsed').removeClass('alert')
        $(this.element).find('.averageElapsed').removeClass('alert')

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
        if (this.cycle > 1) {
            $(this.element).find('.totalElapsed').html(this.secToDur(totalElapsed / 1000))
            $(this.element).find('.averageElapsed').html(this.secToDur(averageElapsed / 1000))
        }

        if (this.alertAfter == 0) return

        if (cycleElapsed > this.alertAfter) {
            $(this.element).find('.cycleElapsed').addClass('alert')
        }

        if (averageElapsed > this.alertAfter) {
            $(this.element).find('.averageElapsed').addClass('alert')
        }
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
        const d: number = Math.floor(seconds / (3600 * 24))
        const h: number = Math.floor(seconds % (3600 * 24) / 3600)
        const m: number = Math.floor(seconds % 3600 / 60)
        const s: number = Math.floor(seconds % 60)

        let elapsed: string = ''
        if (seconds >= 86400) elapsed += `${d}:`
        elapsed += `${h.toString().padStart(2, '0')}:`
        elapsed += `${m.toString().padStart(2, '0')}:`
        elapsed += `${s.toString().padStart(2, '0')}`

        return elapsed
    }

    durToSec(duration: string): number {
        const dur: string[] = duration.split(':')

        let s: number = 0

        switch (dur.length) {
            case 1:
                s += parseInt(`${dur[0]}`)
            break

            case 2:
                s += parseInt(`${dur[0]}`) * 60
                s += parseInt(`${dur[1]}`)
            break

            case 3:
                s += parseInt(`${dur[0]}`) * 3600
                s += parseInt(`${dur[1]}`) * 60
                s += parseInt(`${dur[2]}`)
            break

            case 4:
                s += parseInt(`${dur[0]}`) * 86400
                s += parseInt(`${dur[1]}`) * 3600
                s += parseInt(`${dur[2]}`) * 60
                s += parseInt(`${dur[3]}`)
            break

            default:
                s = 0
        }

        return Math.max(s * 1000, 0)
    }
}
