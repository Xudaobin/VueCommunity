// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
        loading: require("./common/img/logo.png")
    })
    /* eslint-disable no-new */
new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        render: h => h(App)
    })
    // 节流函数
    // 	var throttle = function(fn, delay, mustRunDelay){
    //  var timer = null;
    //  var t_start;
    //  return function(){
    //  	var context = this, args = arguments, t_curr = +new Date();

//  	// 清除定时器
//  	clearTimeout(timer);

//  	// 函数初始化判断
//  	if(!t_start){
//  		t_start = t_curr;
//  	}

//  	// 超时（指定的时间间隔）判断
//  	if(t_curr - t_start >= mustRunDelay){
//  		fn.apply(context, args);
//  		t_start = t_curr;
//  	}
//  	else {
//  		timer = setTimeout(function(){
//  			fn.apply(context, args);
//  		}, delay);
//  	}
//  };
// };