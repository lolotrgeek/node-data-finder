function validate(data) {
    if(!data) return false
    if(typeof data === 'object' && data.keys().length === 0) return false
    if(Array.isArray(data) && data.length === 0) return false
    
}

module.exports = { validate}