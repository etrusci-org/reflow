export class Reflow {
    constructor(label) {
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
            <td class="label"></td>
            <td class="cycle"></td>
            <td class="cycleElapsed"></td>
            <td class="totalElapsed"></td>
            <td class="averageElapsed"></td>
            <td class="ctrl">
                <button class="start">start</button>
                <button class="reset hidden">reset</button>
                <button class="stop">stop</button>
                <button class="delete hidden">delete</button>
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
        this.worker = new Worker('./reflow-worker.js');
        this.worker.onmessage = (event) => {
            this.updateElement(event.data.cycleElapsed, event.data.totalElapsed, event.data.averageElapsed);
        };
        this.bakeElement();
    }
    add() {
        $(this.element).appendTo(this.elementContainerSelector);
    }
    start() {
        $(this.element).find('.ctrl .start').remove();
        $(this.element).find('.ctrl .reset').removeClass('hidden');
        this.startedOn = Date.now();
        this.cycleStartedOn = Date.now();
        this.cycle = 1;
        $(this.element).find('.cycle').text(this.cycle);
        this.worker.postMessage({
            action: 'start',
            startedOn: this.startedOn,
            cycleStartedOn: this.cycleStartedOn,
            cycle: this.cycle,
        });
    }
    stop() {
        this.avoidDoubleClick('.ctrl .stop');
        $(this.element).find('.ctrl .reset').remove();
        $(this.element).find('.ctrl .stop').remove();
        $(this.element).find('.ctrl .delete').removeClass('hidden');
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
        this.worker.postMessage({
            action: 'reset',
            startedOn: this.startedOn,
            cycleStartedOn: this.cycleStartedOn,
            cycle: this.cycle,
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
    updateElement(cycleElapsed, totalElapsed, averageElapsed) {
        $(this.element).find('.cycleElapsed').html(this.secToDur(cycleElapsed / 1000));
        $(this.element).find('.totalElapsed').html(this.secToDur(totalElapsed / 1000));
        $(this.element).find('.averageElapsed').html(this.secToDur(averageElapsed / 1000));
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
    secToDur(seconds) {
        let d = Math.floor(seconds / (3600 * 24));
        let h = Math.floor(seconds % (3600 * 24) / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = seconds % 60;
        let elapsed = '';
        if (seconds >= 86400)
            elapsed += `${d}<span class="unit">d</span> `;
        if (seconds >= 3600)
            elapsed += `${h}<span class="unit">h</span> `;
        if (seconds >= 60)
            elapsed += `${m}<span class="unit">m</span> `;
        elapsed += `${s.toFixed(2).padStart(5, '0')}<span class="unit">s</span>`;
        return elapsed;
    }
}
