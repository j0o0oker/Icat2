
(function(window){
	// Vue.directive('focus', {
	// 	inserted: function(el, binding) {
	// 		el.focus();
	// 	}
	// });
    /*------------------------------------公共方法----------------------------------------*/


    /**
     * toast提示
     *
     * @param {string} msg 提示语
     */
	var c = {};
    c.toast = function(msg) {
        if (typeof api === 'undefined') {
            console.warn(msg);
            return;
        }
        if(!msg){
            return;
        }

        api.toast({
            msg: msg,
            duration: 3000,
            location: 'bottom'
        });
	};
	/**
     * alert提示
     *
     * @param {string} msg 提示语
     */
    c.alert = function(msg) {
        if (typeof api === 'undefined') {
            console.warn(msg);
            return;
        }
        if(!msg){
            return;
        }

        api.alert({
			msg: msg,
		});
	};
	
	c.isObject = function(obj){
		return typeof obj === 'object' && obj.constructor === {}.constructor;
	};

    c.isFunction = function( obj ) {
        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.
        return typeof obj === "function" && typeof obj.nodeType !== "number";
	};
	
	c.openWin = function(url,param,title,name) {//打开全屏窗口
		var getWinName = function(url){
			if(!url){
				return;
			}
			var winname = url;
			var idx = winname.lastIndexOf('.');
			if(idx > 0){
				winname = winname.substring(0,idx);
			}
			var slash = url.lastIndexOf('/');
			if(slash >= 0){
				winname = winname.substring(slash+1);
			}
			return winname;
		};

		var len = arguments.length;
		if(len <= 0 || !url){
			return;
		}
		if($c.isObject(param)){
			if(title){
				param.toptitle = title;
			}
			api.openWin({
				name: name || getWinName(url),
				url: url,
				bgColor: '#fff',
				allowEdit:true,
				bounces: false,
				rect: {
					x: 0,
					y: 0,
				},
				pageParam: param
			});
		}
		else{
			api.openWin({
				name: name || getWinName(url),
				url: url,
				bgColor: '#fff',
				bounces: false,
				rect: {
					x: 0,
					y: 0,
				}
			});
		}
	};

	c.openWinNav = function(url,param,title,name) {//打开导航条窗口
		var getWinName = function(url){
			if(!url){
				return;
			}
			var winname = url;
			var idx = winname.lastIndexOf('.');
			if(idx > 0){
				winname = winname.substring(0,idx);
			}
			var slash = url.lastIndexOf('/');
			if(slash >= 0){
				winname = winname.substring(slash+1);
			}
			return winname;
		};

		var len = arguments.length;
		if(len <= 0 || !url){
			return;
		}
		var httpReg = /^(http|https):\/\/.+/i;

		if(httpReg.test(url)){
			title = arguments[1];
			api.openWin({
				name: 'outerlink',
				url: '../html/common/outerlink.html',
				title: title,
				bgColor: '#fff',
				bounces: false,
				rect: {
					x: 0,
					y: 0,
				},
				pageParam: {
					url: url,
					title: title
				}
			});
		}
		else{
			if(typeof arguments[1] == "string" ){
				api.openTabLayout({
					name: arguments[2] || getWinName(url),
					url: url,
					title: arguments[1],
					hideNavigationBar: false,
					bgColor: '#fff',
					allowEdit: true,
					navigationBar: {//默认值 tabBar 是54  , navigationBar是45
						background: '#fff',
						shadow: '#eee',
						color: '#000',
						// hideBackButton:false,
						leftButtons: [{
							// text:''
							iconPath: 'widget://image/common/back_nav2.png'
						}]
					}
				});
			}
			else{
				if(param.rightIcon){
					api.openTabLayout({
						name: name || getWinName(url),
						url: url,
						title: title,
						hideNavigationBar: false,
						bgColor: '#fff',
						allowEdit: true,
						navigationBar: {//默认值 tabBar 是54  , navigationBar是45
							background: '#fff',
							shadow: '#eee',
							color: '#000',
							// hideBackButton:false,
							leftButtons: [{
								// text:''
								iconPath: 'widget://image/common/back_nav2.png'
							}],
							rightButtons:[{
								iconPath: 'widget://'+param.rightIcon
							}]
						},
						pageParam: param
					});
				}
				else{
					api.openTabLayout({
						name: name || getWinName(url),
						url: url,
						title: title,
						hideNavigationBar: false,
						bgColor: '#fff',
						allowEdit: true,
						navigationBar: {//默认值 tabBar 是54  , navigationBar是45
							background: '#fff',
							shadow: '#eee',
							color: '#000',
							// hideBackButton:false,
							leftButtons: [{
								// text:''
								iconPath: 'widget://image/common/back_nav2.png'
							}]
						},
						pageParam: param
					});
				}
			}
		}
	};

    window.$c = c;
})(window);


