/**
 * @param {*} statuscode has to be set manually
 * @param {*} feedback has to be set manually
 * @param {*} isSuccess defaults to false, must be overridden if true
 * @param {*} payload defaults to null
 * This factory method standardises the feedback from this API
 */
function createFeedback(statuscode, feedback, isSuccess=false,payload=null){
  return {
      statuscode,
      feedback,
      isSuccess,
      payload
  }
}

module.exports = createFeedback;