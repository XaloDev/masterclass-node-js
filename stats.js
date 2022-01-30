const os = require('os')
const { freemem, totalmem } = os
const log = require('./logger')

setInterval(() => {
    const using = parseInt(totalmem() / 1024 / 1024) - parseInt(freemem() / 1024 / 1024)
    const free = parseInt(freemem() / 1024 / 1024)
    const total = parseInt(totalmem() / 1024 / 1024)
    const percents = parseInt(using / total * 100)
    
    const stats = {  
        free: `${free} MB`,
        using: `${using} MB`,
        total: `${total} MB`,
        usage: `${percents}%`
    }
    
    console.clear()
    console.log("=== PC STATS ===")
    console.table(stats)

    log(`${JSON.stringify(stats)}\n`)

}, 1000)



