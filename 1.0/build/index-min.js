/*!build time : 2013-12-25 6:13:28 PM*/
KISSY.add("gallery/imgProxy/1.0/index",function(a,b){function c(c){var d='<object data="__swfUrl" type="application/x-shockwave-flash" id="imgproxyMovie" name="imgproxyMovie" width="100%" height="100%"><param name="allowScriptAccess" value="always"><param name="flashvars" value=""><param name="wmode" value="transparent"><param name="movie" value="__swfUrl"></object>',e=b(d.replace(/__swfUrl/g,g));c=b.one("#"+c),c.append(e),f=a.UA.ie&&a.UA.ie<=9?window.imgproxyMovie:e.getDOMNode()}function d(){h||(h=!0,e=b("<div></div>").attr("id","imgproxy").css({height:1,position:"absolute",top:0,width:1}),b.one("body").append(e),c("imgproxy"))}var e,f,g="http://a.tbcdn.cn/s/kissy/gallery/imgProxy/1.0/ImgProxy.swf",h=!1,i=!1,j=0,k=[],l={};return window.imgproxy={load:function(a,b,c){if(!i)return k.push(Array.prototype.slice.call(arguments)),d(),void 0;var e=j++;this._callbacks(e,!0,b,c),f.load(e,a)},_callbacks:function(a,b,c,d){l[a]={single:b,success:c,error:d}},_onLoad:function(){var a;if(i=!0,k.length)for(a=0;a<k.length;a++)window.imgproxy.load.apply(this,k[a]);k=null},_onSuccess:function(a,b){var c=l[a].success;c&&c("data:image/png;base64,"+b),l[a].single&&delete l[a]},_onError:function(a,b){var c=l[a].error;c&&c(b),l[a].single&&delete l[a]}},window.imgproxy},{requires:["node","base"]});