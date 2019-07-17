(function(){

	var lazyLoad={};
	var isblock = true;//初始可见块为可见
	var timer=1;//加载计数
	var $block;//可见块

	window.lazyLoad=lazyLoad;//暴露对象
	//监听滑动
	$("body").on('scroll',function(){
		//如果不可见
		if(!isblock){
		    return
		}
		//判断可见块是否可见
		if(lazyLoad.isVisible($block)){  
		    lazyLoad.init($block)//开始加载
		}
	});

	//是否可见
	lazyLoad.isVisible=function($element){
		    var winHight = $(window).height(),//屏幕高度
			    distanceTop = $element.offset().top;//可见块与距离顶部
		//判断元素是否进入视野
	    if(distanceTop <= winHight){  
	    	console.log("开始加载");
	    	return true
	    }else{
	    	return false
	    }
	}

	//开始加载
	lazyLoad.init=function(input){
		$block=input;

		//获取数据
		lazyLoad.getdata(function(datalist){
			isblock=true;
			//遍历数据
			$.each(datalist,function(index,history){
				// 拿到的数据进行拼接
				var $node = lazyLoad.addNode(history)   
		        $('.history-container').append($node)
			});
		});
		$block.css("visibility","visible");
		isblock=false;
	};

	//数据请求
	lazyLoad.getdata=function(callback){
		$.ajax({
            	url:"https://cors-anywhere.herokuapp.com/http://yyyxuan.cn/lay-eggs/js/test.php",
            	type: "POST",
            	data:"time="+timer,
            	}).done(function(ret){
            			//转化json
		            	var json=$.parseJSON(ret);
		            	if (json==null) {
		            		$block.css("visibility","visible");
		            		$block.text("到底了");
		            		return;
		            	}
		            	else{$block.css("visibility","hidden");}
						callback(json.data);
						timer++;
        			});
	};

	lazyLoad.addNode=function(dataitems){
		var cardnode = '<div class="card-container">'+
					'<div class="card-title">'+
						'<p>历史信息</p>'+
					'</div>'+
					'<div class="card-content">'+
						'<div class="card-from">'+
							'<span>时间</span>'+
							'<div class="off" id="num">'+
								'<input id="time" type="text" placeholder="'+dataitems.time+'" readonly />'+
							'</div>'+					
						'</div>'+
						'<div class="card-from">'+
							'<span>分配给</span>'+
							'<div class="off" id="num">'+
								'<input id="time" type="text" placeholder="'+dataitems.name+'" readonly />'+
							'</div>'+		
						'</div>'+
						'<div class="card-from">'+
							'<span>品种</span>'+
							'<div class="off" id="num">'+
								'<input id="time" type="text" placeholder="'+dataitems.pz+'" readonly />'+
							'</div>'+					
						'</div>'+
						'<div class="card-from">'+
							'<span>数量</span>'+
							'<div class="off" id="num">'+
								'<input id="tel" type="number" placeholder="'+dataitems.num+'"  required/>'+
							'</div>	'+				
						'</div>'+
						'<div class="card-from">'+
							'<span>总额</span>'+
							'<div class="off" id="num">'+
								'<input id="tel" type="number" placeholder="'+dataitems.money+'"  required/>'+
							'</div>	'+				
						'</div>'+
					'</div>'+
				'</div>';
		return $(cardnode);
	};

	
})();

