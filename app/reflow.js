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
        Object.defineProperty(this, "roundStartedOn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "round", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "roundElapsed", {
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
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: $(`
        <tr>
            <!-- <td class="id"></td> -->
            <td class="label"></td>
            <!-- <td class="startedOn"></td> -->
            <!-- <td class="roundStartedOn"></td> -->
            <td class="round"></td>
            <td class="roundElapsed"></td>
            <td class="totalElapsed"></td>
            <td class="averageElapsed"></td>
            <td class="ctrl">
                <button class="start">start</button>
                <button class="reset hidden">reset</button>
                <button class="stop hidden">stop</button>
                <button class="delete">delete</button>
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
            this.updateElement(event.data.roundElapsed, event.data.totalElapsed, event.data.averageElapsed);
        };
        this.bakeElement();
    }
    add() {
        $(this.element).appendTo('.timers');
    }
    start() {
        this.avoidDoubleClick('.ctrl button');
        $(this.element).find('.ctrl .start').remove();
        $(this.element).find('.ctrl .reset').removeClass('hidden');
        $(this.element).find('.ctrl .stop').removeClass('hidden');
        this.startedOn = Date.now();
        this.roundStartedOn = Date.now();
        this.round = 1;
        $(this.element).find('.round').text(this.round);
        this.worker.postMessage({
            action: 'start',
            startedOn: this.startedOn,
            roundStartedOn: this.roundStartedOn,
            round: this.round,
        });
    }
    stop() {
        this.avoidDoubleClick('.ctrl button');
        $(this.element).find('.ctrl .start').remove();
        $(this.element).find('.ctrl .reset').remove();
        $(this.element).find('.ctrl .stop').remove();
        this.worker.postMessage({
            action: 'stop',
        });
        this.worker.terminate();
    }
    reset() {
        this.avoidDoubleClick('.ctrl .reset');
        this.roundStartedOn = Date.now();
        this.round += 1;
        $(this.element).find('.round').text(this.round);
        this.worker.postMessage({
            action: 'reset',
            startedOn: this.startedOn,
            roundStartedOn: this.roundStartedOn,
            round: this.round,
        });
    }
    delete() {
        this.avoidDoubleClick('.ctrl button', true);
        $(this.element).remove();
        this.worker.postMessage({
            action: 'delete',
        });
        this.worker.terminate();
    }
    updateElement(roundElapsed, totalElapsed, averageElapsed) {
        $(this.element).find('.roundElapsed').html(this.secToDur(roundElapsed / 1000));
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
        let s = Math.floor(seconds % 60);
        let elapsed = '';
        if (seconds >= 86400)
            elapsed += `${d}<span class="unit">d</span> `;
        if (seconds >= 3600)
            elapsed += `${h}<span class="unit">h</span> `;
        if (seconds >= 60)
            elapsed += `${m}<span class="unit">m</span> `;
        elapsed += `${s}<span class="unit">s</span>`;
        return elapsed;
    }
}
