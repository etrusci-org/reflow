export class Reflow {
    constructor(label) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.getNewId()
        });
        Object.defineProperty(this, "createdOn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Date.now()
        });
        Object.defineProperty(this, "label", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: $(`
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
        });
        if (label) {
            this.label = label.trim();
        }
        this.bakeElement();
    }
    add() {
        $(this.element).appendTo('.timers');
    }
    start() {
        this.avoidDoubleClick('.ctrl .start');
    }
    pause() {
        this.avoidDoubleClick('.ctrl .pause');
    }
    reset() {
        this.avoidDoubleClick('.ctrl .reset');
    }
    delete() {
        this.avoidDoubleClick('.ctrl .delete', true);
        $(this.element).remove();
    }
    getNewId(length = 8) {
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
        $(this.element).find('.ctrl .pause').on('click', () => { this.pause(); });
        $(this.element).find('.ctrl .reset').on('click', () => { this.reset(); });
        $(this.element).find('.ctrl .delete').on('click', () => { this.delete(); });
        $(this.element).find('.id').text(this.id);
        $(this.element).find('.createdOn').text(this.createdOn);
        $(this.element).find('.label').text(this.label);
    }
    avoidDoubleClick(elementSelector, everywhere = false, timeout = 500) {
        if (!everywhere) {
            $(this.element).find(elementSelector).prop('disabled', true);
            setTimeout(() => {
                $(this.element).find(elementSelector).prop('disabled', false);
            }, timeout);
        }
        else {
            $(elementSelector).prop('disabled', true);
            setTimeout(() => {
                $(elementSelector).prop('disabled', false);
            }, timeout);
        }
    }
}
