exports.handler = async (event) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify("Hello from Lambda and Github, hi!"),
    }
    return response
  }