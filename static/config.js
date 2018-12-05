var Urlprefix = ''
var MachineCode =''
if (typeof sharpForeign =='undefined') {
    Urlprefix = 'https://api.njregal.com'
    // Urlprefix = 'http://10.0.0.88:8080'
    MachineCode="001"
}else{
    var obj = sharpForeign.GetMachineBasicConfig()
    if(obj == null || obj == "") {
        Urlprefix = 'https://api.njregal.com'
        // Urlprefix = 'http://10.0.0.88:8080'
        MachineCode ="001"
    }else{
        Urlprefix = JSON.parse(obj).Url
        MachineCode =JSON.parse(obj).MachineCode
    }
}
var baseURL = Urlprefix+'/hss-restapi-oracle/'
var baseURLA = Urlprefix+'/hss-listprint-restapi/'

