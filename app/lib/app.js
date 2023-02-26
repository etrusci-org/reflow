import { Reflow } from './reflow.js';
$(function () {
    $('.add').on('click', (event) => {
        event.preventDefault();
        const timer = new Reflow();
        timer.add('.timers');
    });
});
