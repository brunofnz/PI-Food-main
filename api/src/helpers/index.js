const messageApi = (status, msg, data) => {
    if(status) return { status, msg, data }
    return { status, msg }
}

module.exports = {
    messageApi
}