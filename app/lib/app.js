import { Reflow } from './reflow.js';
$(function () {
    $('.add').on('click', () => {
        const timer = new Reflow();
        timer.add('.timers');
        console.debug(timer.t);
    });
});
