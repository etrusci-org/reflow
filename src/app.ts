import { Reflow } from "./reflow.js"


$(function () {
    console.log('R E F L O W')

    $('.add-new').on('click', () => {
        let label = $('.add-new-label').val()
        let alertAfter = $('.add-new-alertAfter').val()
        let timer = new Reflow(`${label}`, `${alertAfter}`)
        console.log(timer)
        timer.add()
        $('.add-new-label').val('')
        $('.add-new-alertAfter').val('')
        $('.timers').removeClass('hidden')
    })
})
