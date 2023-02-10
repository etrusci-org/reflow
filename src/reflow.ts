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
            this.alertAfter = this.durToMillisec(alertAfter)
        }

        this.worker = new Worker('./reflow-worker.js')

        this.worker.onmessage = (event) => {
            this.updateElement(
                event.data.cycleElapsed,
                event.data.totalElapsed,
                event.data.averageElapsed,
                event.data.overdueCycle,
                event.data.overdueAverage,
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
            alertAfter: this.alertAfter,
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
            alertAfter: this.alertAfter,
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

    updateElement(cycleElapsed: number, totalElapsed: number, averageElapsed: number, overdueCycle: boolean, overdueAverage: boolean): void {
        $(this.element).find('.cycleElapsed').html(this.MillisecToDur(cycleElapsed))
        if (this.cycle > 1) {
            $(this.element).find('.totalElapsed').html(this.MillisecToDur(totalElapsed))
            $(this.element).find('.averageElapsed').html(this.MillisecToDur(averageElapsed))
        }
        if (overdueCycle) $(this.element).find('.cycleElapsed').addClass('alert')
        if (overdueAverage) $(this.element).find('.averageElapsed').addClass('alert')
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


    MillisecToDur(milliseconds: number): string {
        const seconds = milliseconds / 1000
        const d: number = Math.floor(seconds / (3600 * 24))
        const h: number = Math.floor(seconds % (3600 * 24) / 3600)
        const m: number = Math.floor(seconds % 3600 / 60)
        const s: number = Math.floor(seconds % 60)

        let elapsed: string = ''
        if (seconds >= 86400) elapsed += `${d}:`
        elapsed += `${h}:`
        elapsed += `${m.toString().padStart(2, '0')}:`
        elapsed += `${s.toString().padStart(2, '0')}`

        return elapsed
    }


    durToMillisec(duration: string): number {
        const dur: string[] = duration.split(' ')
        let s: number = 0

        dur.forEach(v => {
            const re: RegExp = new RegExp(/(\d+)([dhms]{1})/, 'gi')
            const rem: RegExpExecArray | null = re.exec(v)

            if (
                !rem ||
                !rem[1] ||
                !rem[2]
            ) return 0

            switch (rem[2]) {
                case 'd':
                    s += parseInt(rem[1]) * 86400
                break

                case 'h':
                    s += parseInt(rem[1]) * 3600
                break

                case 'm':
                    s += parseInt(rem[1]) * 60
                break

                case 's':
                    s += parseInt(rem[1])
                break
            }
        })

        return s * 1000
    }
}
