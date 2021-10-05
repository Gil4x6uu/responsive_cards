export default function createJsonResponse (result, data, error, code = 201) {

  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: code,
    data: {
      "result": result,
      "error": error,
      "data":data
    }
  }
}
