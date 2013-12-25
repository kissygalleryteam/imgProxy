/*
combined files : 

gallery/imgProxy/1.0/index

*/
/**
 * @fileoverview 
 * @author 加里 茅晓锋<xiaofeng.mxf@taobao.com>
 * @module imgProxy
 * mod from https://github.com/thatguystone/imgproxy
 **/
KISSY.add('gallery/imgProxy/1.0/index',function (S, Node,Base) {

    var SWF_FILE =  "http://a.tbcdn.cn/s/kissy/gallery/drawingPad/2.0/ImgProxy.swf";
    var objWrapper, //the swf used for remote loading
        loading = false,
        ready   = false,
        id = 0,
        waiting = [],
        callbacks = {},
        flashObj;
    
    function createSwf(idOrEl, vars) {

        var swfTpl ='<object data="__swfUrl" type="application/x-shockwave-flash" id="imgproxy" width="100%" height="100%">'+
                        '<param name="allowScriptAccess" value="always">'+
                        '<param name="flashvars" value="">'+
                        '<param name="wmode" value="transparent">'+
                        '<param name="movie" value="__swfUrl">'+
                    '</object>';

        var swfNode = Node(swfTpl.replace(/__swfUrl/g,SWF_FILE));

        idOrEl = Node.one('#' + idOrEl);
        idOrEl.append(swfNode);
        flashObj = swfNode.getDOMNode();
    }
    
    function loadSwf() {
        if (loading) {
            return;
        }
        loading = true;
        
        objWrapper = Node('<div></div>')
            .attr('id', 'imgproxy')
            .css({
                height: 1,
                position: 'absolute',
                top: 0,
                width: 1
            });
        
        Node.one('body').append(objWrapper);
        
        createSwf('imgproxy');
    }
    
    window.imgproxy = {
        load: function(url, successCallback, failCallback) {
            if (!ready) {
                waiting.push(Array.prototype.slice.call(arguments));
                loadSwf();
                return;
            }
            
            var localId = id++;
            
            this._callbacks(localId, true, successCallback, failCallback);
            flashObj.load(localId,url);
        },
        
        _callbacks: function(id, single, successCallback, failCallback) {
            callbacks[id] = {
                single: single,
                success: successCallback,
                error: failCallback
            };
        },
        
        _onLoad: function() {
            var i;
            
            ready = true;
            
            if (waiting.length) {
                for (i = 0; i < waiting.length; i++) {
                    window.imgproxy.load.apply(this, waiting[i]);
                }
            }
            
            waiting = null;
        },
        _onSuccess: function(id, img) {
            var fn = callbacks[id].success;
            if (fn) {
                fn('data:image/png;base64,' + img);
            }
            
            if (callbacks[id].single) {
                delete callbacks[id];
            }
        },
        _onError: function(id, error) {
            var fn = callbacks[id].error;
            if (fn) {
                fn(error);
            }
            
            if (callbacks[id].single) {
                delete callbacks[id];
            }
        }
    };

    return window.imgproxy; 


}, {requires:['node', 'base']});




