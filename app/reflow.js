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
            value: '.timers tbody'
        });
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: $(`
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
        $(this.element).find('.ctrl .start').remove();
        $(this.element).find('.ctrl .stop').removeClass('hidden');
        $(this.element).find('.ctrl .reset').removeClass('hidden');
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
    stop() {
        $(this.element).find('.ctrl .stop').remove();
        $(this.element).find('.ctrl .reset').remove();
        this.worker.postMessage({
            action: 'stop',
        });
        this.worker.terminate();
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
    delete() {
        this.avoidDoubleClick('.ctrl .delete', true);
        $(this.element).remove();
        this.worker.postMessage({
            action: 'delete',
        });
        this.worker.terminate();
    }
    updateElement(cycleElapsed, totalElapsed, averageElapsed, overdueCycle, overdueAverage) {
        $(this.element).find('.cycleElapsed').html(this.MillisecToDur(cycleElapsed));
        if (this.cycle > 1) {
            $(this.element).find('.totalElapsed').html(this.MillisecToDur(totalElapsed));
            $(this.element).find('.averageElapsed').html(this.MillisecToDur(averageElapsed));
        }
        if (overdueCycle)
            $(this.element).find('.cycleElapsed').addClass('alert');
        if (overdueAverage)
            $(this.element).find('.averageElapsed').addClass('alert');
    }
    getNewId(length = 6) {
        let chars = 'abcdefghkmnprstuvwxyz23456789'.split('');
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
    MillisecToDur(milliseconds) {
        const d = Math.floor((milliseconds / 1000) / (3600 * 24));
        const h = Math.floor((milliseconds / 1000) % (3600 * 24) / 3600);
        const m = Math.floor((milliseconds / 1000) % 3600 / 60);
        const s = Math.floor((milliseconds / 1000) % 60);
        let elapsed = '';
        if (milliseconds >= 86400)
            elapsed += `${d}:`;
        elapsed += `${h.toString().padStart(2, '0')}:`;
        elapsed += `${m.toString().padStart(2, '0')}:`;
        elapsed += `${s.toString().padStart(2, '0')}`;
        return elapsed;
    }
    durToMillisec(duration) {
        const dur = duration.split(':');
        let s = 0;
        switch (dur.length) {
            case 1:
                s += parseInt(`${dur[0]}`);
                break;
            case 2:
                s += parseInt(`${dur[0]}`) * 60;
                s += parseInt(`${dur[1]}`);
                break;
            case 3:
                s += parseInt(`${dur[0]}`) * 3600;
                s += parseInt(`${dur[1]}`) * 60;
                s += parseInt(`${dur[2]}`);
                break;
            case 4:
                s += parseInt(`${dur[0]}`) * 86400;
                s += parseInt(`${dur[1]}`) * 3600;
                s += parseInt(`${dur[2]}`) * 60;
                s += parseInt(`${dur[3]}`);
                break;
            default:
                s = 0;
        }
        return Math.max(s * 1000, 0);
    }
}
