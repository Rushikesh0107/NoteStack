class ApiResponse {
    constructor(
        statsuCode,
        data,
        message = "Success",
    ) {
        this.statusCode = statsuCode,
        this.data = data,
        this.message = message,
        this.success = true
    }
}

export { ApiResponse }