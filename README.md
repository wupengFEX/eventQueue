# Description
	## This is a plugin about event queue,whatever browser you use,it can execute from start to end!
	## There has one advantage of resize bug,we repair the bug of resize executing more times!

#How to use
	Introduct the js file,then you can user add or remove to add or remove listener!

#Demo
	var a = document.getElementById('a');
	add(a,'click',function(){alert(1)})
	add(a,'click',function(){alert(2)})
	add(a,'click',function(){alert(3)})
	The result is 1,2,3 in every browser!

	remove(a,'click',function(){alert(1)})
	The result is 2,3 in every browser!	
	
	And the remove function can use many styles and more blank,cause we delete additional blank!such you can user the follwering style:
	remove(a,'click',function(){ alert(1) } )
	remove(a,'click',function(){
		alert(1) } )
	remove(a,'click',function(){
		alert(1) 
	})

