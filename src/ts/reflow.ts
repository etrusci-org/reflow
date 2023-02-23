import { eHTML, ePastHTML } from './reflow-ui.js'
import { a1Bin } from './reflow-audio.js'




export class Reflow {
    e: JQuery<HTMLDivElement>
    w: Worker
    t: {
        label: string
        firstStartedOn: number
        cycleStartedOn: number
        cycle: number
        elapsedCycle: number
        elapsedTotal: number
        elapsedAverage: number
        targetTime: number
        volume: number
        isOverdueCycle: boolean
        isOverdueAverage: boolean
    }
    a: HTMLAudioElement


    constructor() {
        this.e = $(eHTML)

        this.w = new Worker('./lib/reflow-worker.js')
        this.w.onmessage = (event) => {
            this.onWorkerMessage(event.data)
        }

        this.a = new Audio(`data:audio/mpeg;base64,${a1Bin}`)

        this.t = {
            label: this.getRandomLabel(),
            firstStartedOn: 0,
            cycleStartedOn: 0,
            cycle: 0,
            elapsedCycle: 0,
            elapsedTotal: 0,
            elapsedAverage: 0,
            targetTime: 0,
            volume: 0.5,
            isOverdueCycle: false,
            isOverdueAverage: false,
        }

        $(this.e).find('.ctrl .start').on('click', () => { this.start() })
        $(this.e).find('.ctrl .reset').on('click', () => { this.reset() })
        $(this.e).find('.ctrl .stop').on('click', () => { this.stop() })
        $(this.e).find('.ctrl .delete').on('click', () => { this.delete() })
        $(this.e).find('.ctrl .targetTime').on('input', () => { this.changeTargetTime() })
        $(this.e).find('.ctrl .volume').on('input', () => { this.changeVolume() })

        $(this.e).find('.ctrl .reset').hide()
        $(this.e).find('.ctrl .stop').hide()
        $(this.e).find('.ctrl .volume').hide()

        $(this.e).find('.label').val(this.t.label)
    }


    add(targetSelector: string = '.timers'): void {
        $(this.e).appendTo(targetSelector)
    }

    // --------------------------------------------------------------------------------------------

    start(): void {
        this.avoidDoubleClick('.ctrl button')

        $(this.e).find('.ctrl .start').remove()
        $(this.e).find('.ctrl .reset').show()
        $(this.e).find('.ctrl .stop').show()
        $(this.e).find('.ctrl .targetTime').remove()

        const tnow = Date.now()

        this.t.firstStartedOn = tnow
        this.t.cycleStartedOn = tnow
        this.t.cycle = 1

        if (this.t.targetTime == 0) {
            this.t.volume = 0
        }

        this.w.postMessage({
            action: 'start',
            ...this.t,
        })
    }


    reset(): void {
        this.avoidDoubleClick('.ctrl button')

        let ePast: JQuery<HTMLDivElement> = $(ePastHTML)
        $(ePast).find('.cycle').text(this.t.cycle)
        $(ePast).find('.elapsedCycle').text(this.msToDur(this.t.elapsedCycle))
        $(ePast).find('.elapsedTotal').text(this.msToDur(this.t.elapsedTotal))
        $(ePast).find('.elapsedAverage').text(this.msToDur(this.t.elapsedAverage))
        $(ePast).insertAfter($(this.e).find('.now'))

        this.t.cycleStartedOn = Date.now()
        this.t.cycle += 1

        this.w.postMessage({
            action: 'reset',
            ...this.t,
        })
    }


    stop(): void {
        this.avoidDoubleClick('.ctrl button')

        $(this.e).find('.ctrl .reset').remove()
        $(this.e).find('.ctrl .stop').remove()
        $(this.e).find('.ctrl .volume').remove()

        this.w.postMessage({
            action: 'stop',
        })

        this.w.terminate()
    }


    delete(): void {
        this.avoidDoubleClick('.ctrl button', true)

        this.w.postMessage({
            action: 'delete',
        })

        this.w.terminate()

        $(this.e).remove()
    }


    changeTargetTime(): void {
        const newTargetTime = $(this.e).find('.ctrl .targetTime').val()

        if (newTargetTime && typeof(newTargetTime) === 'string') {
            this.t.targetTime = this.durToMs(newTargetTime)

            if (this.t.targetTime > 0) {
                $(this.e).find('.now .targetTime').text(this.msToDur(this.t.targetTime))
                $(this.e).find('.ctrl .volume').show()
            }
            else {
                $(this.e).find('.now .targetTime').text('-')
                $(this.e).find('.ctrl .volume').hide()
            }
        }
        else {
            $(this.e).find('.ctrl .volume').hide()
        }

        console.log(this.t.targetTime)
    }


    changeVolume(): void {
        const newVol = $(this.e).find('.ctrl .volume').val()

        if (newVol && typeof(newVol) === 'string') {
            this.t.volume = parseFloat(newVol)
            this.a.volume = this.t.volume
        }

        console.log(this.t.volume)
    }

    // --------------------------------------------------------------------------------------------

    onWorkerMessage(d: any): void {
        this.t.cycle = d.cycle
        this.t.elapsedCycle = d.elapsedCycle
        this.t.elapsedTotal = d.elapsedTotal
        this.t.elapsedAverage = d.elapsedAverage
        this.t.isOverdueCycle = d.isOverdueCycle
        this.t.isOverdueAverage = d.isOverdueAverage

        console.table(this.t)

        $(this.e).find('.now .cycle').text(this.t.cycle)
        $(this.e).find('.now .elapsedCycle').text(this.msToDur(this.t.elapsedCycle))
        $(this.e).find('.now .elapsedTotal').text(this.msToDur(this.t.elapsedTotal))
        $(this.e).find('.now .elapsedAverage').text(this.msToDur(this.t.elapsedAverage))

        if (this.t.isOverdueCycle) {
            $(this.e).find('.now .elapsedCycle').addClass('overdue')
        }
        else {
            $(this.e).find('.now .elapsedCycle').removeClass('overdue')
        }

        if (this.t.isOverdueAverage) {
            $(this.e).find('.now .elapsedAverage').addClass('overdue')
        }
        else {
            $(this.e).find('.now .elapsedAverage').removeClass('overdue')
        }

        if (
            this.t.isOverdueCycle &&
            this.t.volume > 0 &&
            this.a.paused
        ) {
            this.a.play()
        }
    }

    // --------------------------------------------------------------------------------------------

    avoidDoubleClick(elementSelector: string, everywhere: boolean = false, timeout: number = 750): void {
        let e: null | JQuery<HTMLElement> = null

        if (!everywhere) {
            e = $(this.e).find(elementSelector)
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


    getRandomLabel(length: number = 6): string {
        let chars: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
        let id: string = ''

        length = Math.min(length, chars.length)

        while (id.length < length) {
            id += chars.splice(Math.floor(Math.random() * chars.length), 1)
        }

        return id
    }


    msToDur(milliseconds: number, fixedPoint: boolean = false): string {
        const seconds = milliseconds / 1000
        const d: number = Math.floor(seconds / (3600 * 24))
        const h: number = Math.floor(seconds % (3600 * 24) / 3600)
        const m: number = Math.floor(seconds % 3600 / 60)
        const s: number = (!fixedPoint) ? Math.floor(seconds % 60) : seconds % 60

        let elapsed: string = ''
        if (seconds >= 86400) elapsed += `${d}d `
        if (seconds >= 3600) elapsed += `${h}h `
        if (seconds >= 60) elapsed += `${m}m `
        elapsed +=  (!fixedPoint) ? `${s.toFixed(0)}s` : `${s.toFixed(2)}s`

        return elapsed
    }

    durToMs(duration: string): number {
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
