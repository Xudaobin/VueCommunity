// 时间格式转换函数
export function dateConversion(Condata, CondataItem) {
    for (var i = 0; i < Condata.length; i++) {
        Condata[i].CondataItem = Condata[i].CondataItem.substring(0, Condata[i].CondataItem.lastIndexOf('T'))
    }
}
export function alterr(dom, date, fun) {
    let cleId = 0
    let cls = dom.getAttribute('class')
    dom.setAttribute('class', `andOk ${cls}`)
    clearTimeout(cleId)
    cleId = setTimeout(() => {
        dom.setAttribute('class', cls)
        if (fun) {
            fun()
        }
    }, date);
}

//判断是否登录
export function IsLodin(_that, id) {
    _that.$router.push({
        path: '/login'
    })
}