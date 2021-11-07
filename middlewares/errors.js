class ConflictError extends Error {
    constructor(message) {
      super(message)
      this.status = 409
    }
  }
  
  class UnauthorizedError extends TypeError {
    constructor(message) {
      super(message)
      this.status = 401
    }
  }
  

  
  const errorHandler = (error, req, res, next) => {
    if (ConflictError || UnauthorizedError ) {
      return res.status(error.status).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }

  module.exports = {
    ConflictError,
    UnauthorizedError,
    errorHandler
  }