const exponentialDelay = async (fn, retry = 3, delay = 500) => {
    try{
        return await fn()
    } catch(err) { 
        if (retry === 0) throw err
        // Retry again with new promise
        await new Promise(r => setTimeout(r, delay)) // waiting for Delay
        return exponentialDelay(fn, retry - 1, delay * 2)
    }
}