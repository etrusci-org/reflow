export class Reflow {
    constructor(label, alertAfter) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.getNewId()
        });
        Object.defineProperty(this, "label", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "startedOn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "cycleStartedOn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "cycle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "cycleElapsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "totalElapsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "averageElapsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "alertAfter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "worker", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "elementContainerSelector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'div.timers'
        });
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: $(`
        <div class="timer">
            <div class="label" title="Identifier of this timer">-</div>
            <div class="cycle" title="Current cycle">-</div>
            <div class="cycleElapsed" title="Elapsed time in current cycle">-</div>
            <div class="alertAfter hidden" title="Maximum target time for each cycle"></div>
            <div class="totalElapsed" title="Total time elapsed since start">-</div>
            <div class="averageElapsed" title="Average time elapsed per cycle">-</div>
            <div class="ctrl">
                <button class="start" title="Start timer">!</button>
                <button class="reset hidden" title="Start new cycle">+</button>
                <button class="stop hidden" title="Stop timer">·</button>
                <button class="delete" title="Delete timer">×</button>
            </div>
        </div>
    `)
        });
        if (label) {
            this.label = label.trim();
        }
        else {
            this.label = this.id;
        }
        if (alertAfter) {
            this.alertAfter = this.durToMillisec(alertAfter);
        }
        this.worker = new Worker('./reflow-worker.js');
        this.worker.onmessage = (event) => {
            this.updateElement(event.data.cycleElapsed, event.data.totalElapsed, event.data.averageElapsed, event.data.overdueCycle, event.data.overdueAverage);
        };
        this.bakeElement();
    }
    add() {
        $(this.element).appendTo(this.elementContainerSelector);
    }
    start() {
        this.avoidDoubleClick('.ctrl button');
        $(this.element).find('.ctrl .start').remove();
        $(this.element).find('.ctrl .reset').removeClass('hidden');
        $(this.element).find('.ctrl .stop').removeClass('hidden');
        let now = Date.now();
        this.startedOn = now;
        this.cycleStartedOn = now;
        this.cycle = 1;
        $(this.element).find('.cycle').text(this.cycle);
        this.worker.postMessage({
            action: 'start',
            startedOn: this.startedOn,
            cycleStartedOn: this.cycleStartedOn,
            cycle: this.cycle,
            alertAfter: this.alertAfter,
        });
    }
    reset() {
        this.avoidDoubleClick('.ctrl .reset');
        this.cycleStartedOn = Date.now();
        this.cycle += 1;
        $(this.element).find('.cycle').text(this.cycle);
        $(this.element).find('.cycleElapsed').removeClass('alert');
        $(this.element).find('.averageElapsed').removeClass('alert');
        this.worker.postMessage({
            action: 'reset',
            startedOn: this.startedOn,
            cycleStartedOn: this.cycleStartedOn,
            cycle: this.cycle,
            alertAfter: this.alertAfter,
        });
    }
    stop() {
        this.avoidDoubleClick('.ctrl button');
        $(this.element).find('.ctrl .reset').remove();
        $(this.element).find('.ctrl .stop').remove();
        this.worker.postMessage({
            action: 'stop',
        });
        this.worker.terminate();
    }
    delete() {
        this.avoidDoubleClick('.ctrl button', true);
        $(this.element).remove();
        this.worker.postMessage({
            action: 'delete',
        });
        this.worker.terminate();
    }
    updateElement(cycleElapsed, totalElapsed, averageElapsed, overdueCycle, overdueAverage) {
        $(this.element).find('.cycleElapsed').html(this.MillisecToDur(cycleElapsed, true));
        $(this.element).find('.totalElapsed').html(this.MillisecToDur(totalElapsed));
        if (this.cycle > 1) {
            $(this.element).find('.averageElapsed').html(this.MillisecToDur(averageElapsed));
        }
        if (overdueCycle)
            $(this.element).find('.cycleElapsed').addClass('alert');
        if (overdueAverage)
            $(this.element).find('.averageElapsed').addClass('alert');
    }
    getNewId(length = 6) {
        let chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
        let id = '';
        length = Math.min(length, chars.length);
        while (id.length < length) {
            id += chars.splice(Math.floor(Math.random() * chars.length), 1);
        }
        return id;
    }
    bakeElement() {
        $(this.element).find('.ctrl .start').on('click', () => { this.start(); });
        $(this.element).find('.ctrl .reset').on('click', () => { this.reset(); });
        $(this.element).find('.ctrl .stop').on('click', () => { this.stop(); });
        $(this.element).find('.ctrl .delete').on('click', () => { this.delete(); });
        $(this.element).find('.label').text(this.label);
        if (this.alertAfter > 0) {
            $(this.element).find('.alertAfter')
                .text(`(${this.MillisecToDur(this.alertAfter, false)})`)
                .removeClass('hidden');
        }
    }
    avoidDoubleClick(elementSelector, everywhere = false, timeout = 750) {
        let e = null;
        if (!everywhere) {
            e = $(this.element).find(elementSelector);
        }
        else {
            e = $(elementSelector);
        }
        $(e).prop('disabled', true);
        setTimeout(() => {
            if (!e)
                return;
            $(e).prop('disabled', false);
        }, timeout);
    }
    MillisecToDur(milliseconds, fixedPoint = false) {
        const seconds = milliseconds / 1000;
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor(seconds % (3600 * 24) / 3600);
        const m = Math.floor(seconds % 3600 / 60);
        const s = (!fixedPoint) ? Math.floor(seconds % 60) : seconds % 60;
        let elapsed = '';
        if (seconds >= 86400)
            elapsed += `${d}:`;
        if (seconds >= 3600)
            elapsed += `${h}:`;
        if (seconds >= 60)
            elapsed += `${m.toFixed(0).padStart(2, '0')}:`;
        elapsed += (!fixedPoint) ? `${s.toFixed(0).padStart(2, '0')}` : `${s.toFixed(2).padStart(5, '0')}`;
        return elapsed;
    }
    durToMillisec(duration) {
        const dur = duration.split(' ');
        let s = 0;
        dur.forEach(v => {
            const re = new RegExp(/(\d+)([dhms]{1})/, 'gi');
            const rem = re.exec(v);
            if (!rem ||
                !rem[1] ||
                !rem[2])
                return 0;
            switch (rem[2]) {
                case 'd':
                    s += parseInt(rem[1]) * 86400;
                    break;
                case 'h':
                    s += parseInt(rem[1]) * 3600;
                    break;
                case 'm':
                    s += parseInt(rem[1]) * 60;
                    break;
                case 's':
                    s += parseInt(rem[1]);
                    break;
            }
        });
        return s * 1000;
    }
}
