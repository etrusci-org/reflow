import { Reflow } from "./reflow.js";
$(function () {
    console.log('R E F L O W');
    $('.add-new').on('click', () => {
        let label = $('.add-new-label').val();
        let alertAfter = $('.add-new-alertAfter').val();
        let alertAudioVolume = $('.add-new-alertAudioVolume').val();
        if (typeof (label) !== 'string')
            return;
        if (typeof (alertAfter) !== 'string')
            return;
        if (typeof (alertAudioVolume) !== 'string')
            return;
        let timer = new Reflow(label, alertAfter, alertAudioVolume);
        console.log(timer);
        timer.add();
        $('.add-new-label').val('');
        $('.add-new-alertAfter').val('');
        $('.timers').removeClass('hidden');
    });
    $('.import-set').on('click', () => {
        let code = $('.import-set-code').val();
        if (!code || typeof (code) !== 'string')
            return;
        code.split('\n').forEach(v => {
            if (v) {
                let tc = v.split(':');
                let timer = new Reflow((tc[0]) ? tc[0] : '', (tc[1]) ? tc[1] : '');
                console.log(timer);
                timer.add();
            }
        });
        $('.import-set-code').val('');
        $('.timers').removeClass('hidden');
    });
});
