import { Reflow } from "./reflow.js"


$(function () {
    console.log('R E F L O W')


    $('.add-new').on('click', () => {
        let label = $('.add-new-label').val()
        let alertAfter = $('.add-new-alertAfter').val()
        let alertAudioVolume = $('.add-new-alertAudioVolume').val()

        if (typeof(label) !== 'string') return
        if (typeof(alertAfter) !== 'string') return
        if (typeof(alertAudioVolume) !== 'string') return

        let timer = new Reflow(label, alertAfter, alertAudioVolume)
        timer.add()

        $('.add-new-label').val('')
        $('.add-new-alertAfter').val('')
        $('.timers').removeClass('hidden')
    })


    $('.import-set').on('click', () => {
        let code = $('.import-set-code').val()

        if (!code || typeof(code) !== 'string') return

        code.split('\n').forEach(v => {
            if (v) {
                let tc = v.split(':')
                let timer = new Reflow((tc[0]) ? tc[0] : '', (tc[1]) ? tc[1] : '', (tc[2]) ? tc[2] : '')
                timer.add()
            }
        })

        $('.import-set-code').val('')
        $('.timers').removeClass('hidden')
    })


    $('.add-new-alertAfter').on('keyup', () => {
        if ($('.add-new-alertAfter').val()) {
            $('.add-new-alertOpt').removeClass('hidden')
        }
        else {
            $('.add-new-alertOpt').addClass('hidden')
        }
    })


    $('.add-new-alertAudioVolume').on('change', () => {
        let vol = $('.add-new-alertAudioVolume').val()
        if (!vol || typeof(vol) !== 'string') return
        vol = parseFloat(vol).toFixed(1)
        $('.add-new-alertAudioVolumeValue').text(vol)
    })
})
