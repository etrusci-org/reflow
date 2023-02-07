import { Reflow } from "./reflow.js";
$(function () {
    console.log('R E F L O W');
    $('.add-new').on('click', () => {
        let label = $('.add-new-label').val();
        let timer = new Reflow(`${label}`);
        timer.add();
        $('.add-new-label').val('');
    });
});
