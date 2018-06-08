var CheckObject = function () {}
CheckObject.prototype = {
  checkNull: function(value) {
     if(value==''){
       console.log('null')
     }
  },
  checkPasswordEqual: function(oldValue, newValue) {
    if (oldValue == newValue) {
      return true
    }else {
      return false
    }
  }
}
export default new CheckObject()