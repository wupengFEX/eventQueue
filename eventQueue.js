(function(win){
	var trimLeft = /(\{|\(|\[|\]|\)|\})(\u3000|\s|\t)+/;		
	var space = /(\u3000|\s|\t)*\n(\u3000|\s|\t)*/g;		
	var whitespace = /(^\u3000|\s|\t)(\u3000|\s|\t)*/gi;
	var Event = {
		resizeTimer : null,
		map : {},
		addQueue : function(el,type,fn,useCapture,init){
			if(!el.map || !el.map[type]){
				if(!el.map) el.map = {};
				el.map[type] = [];				
				init();
			}
			el.map[type].push(fn);
		},
		_fire : function(type,el,e){		
			var queue = el.map[type] || [];
			for(var i in queue){
				queue[i](e);
			}
		},
		findFun : function(fn,queue){			
			for(var i in queue){				
				var fn = fn.toString().replace(space,'').replace(whitespace,' ').replace(trimLeft,'$1');
				var qu = queue[i].toString().replace(space,'').replace(whitespace,' ').replace(trimLeft,'$1');				
				if(fn == qu) return i;
			}
			return false;
		},
		removeFn : function(el,type,fn,useCapture,last){
			var queue = el.map[type];
			if(queue.length > 0){
				var index = Event.findFun(fn,queue);
				if(index) queue.splice(index,1);
			}
		},
		_addEventListener : function(el,type,fn,useCapture){			
			return Event.addQueue(el,type,fn,useCapture,function(){					
				el.addEventListener(type,function(e){				
					Event._fire(type,el,e);					
				},useCapture);
			})
		},
		_attachEvent : function(el,type,fn,useCapture){
			return Event.addQueue(el,type,fn,useCapture,function(){			
				el.attachEvent('on' + type,function(e){					
					Event._fire(type,el,e);
				});
			})
		},
		add : function(){
			return document.addEventListener ? function(el,type,fn,useCapture){				
				var useCap = useCapture ? useCapture : false;
				if(type == 'resize'){
					return Event.addQueue(el,type,fn,useCap,function(){
						el.addEventListener(type,function(e){													
							if(Event.resizeTimer) clearTimeout(Event.resizeTimer);
							Event.resizeTimer = setTimeout(function(){									
								Event._fire(type,el,e);
							},50);								
						},useCap);
					})
					return true;
				}				
				Event._addEventListener(el,type,fn,useCap);
			} : function(el,type,fn,useCapture){
				var useCap = useCapture ? useCapture : false;
				if(type == 'resize'){//解决resize事件多次执行的bug						
	                		return Event.addQueue(el,type,fn,useCap,function(){
						el.attachEvent('on' + type,function(e){							
							if(Event.resizeTimer) clearTimeout(Event.resizeTimer);
							Event.resizeTimer = setTimeout(function(){
								Event._fire(type,el,e);
							},50);
						});
					})           
	           		return true;
	       		}		       		
	       		Event._attachEvent(el,type,fn,useCap);
			}			
		}(),
		remove : function(el,type,fn,useCapture){			
			return document.attachEvent ? function(el,type,fn){
				var useCap = useCap ? useCap : false;
				return function(el,type,fn,useCap){
					Event.removeFn(el,type,fn,useCap,function(fn){
						el.detachEvent('on' + type,fn);
					});
				}(el,type,fn)
			} : function(el,type,fn){
				var useCap = useCap ? useCap : false;
				return function(el,type,fn,useCap){
					Event.removeFn(el,type,fn,useCap,function(fn){
						el.removeEventListener(type,fn,useCap);
					});
				}(el,type,fn)
			}
		}()
	}
	win.add = Event.add;	
	win.remove = Event.remove;	
})(window)
