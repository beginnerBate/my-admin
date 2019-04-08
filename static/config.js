
var Urlprefix = ''
var ksdm = ''
if (typeof sharpForeign =='undefined') {
    Urlprefix = 'http://10.0.0.88:8080';
    ksdm='3201'
}else{
    var obj = sharpForeign.GetMachineBasicConfig()
    if(obj == null || obj == "") {
        Urlprefix = 'http://10.0.0.88:8080'
        ksdm='3201'
    }else{
        Urlprefix = JSON.parse(obj).Url
        ksdm= JSON.parse(obj).ksdm
    }
}
var baseURLA = Urlprefix+'/hois-webservice-fn/'