Description
===========
	1. This is a plugin about event queue,whatever browser you use,it can execute from start to end!
	2. There has one advantage of resize bug,we repair the bug of resize executing more times!

How to use
==========
	Introduct the js file,then you can use add or remove to add or remove listener!

Demo
==========	
### The result is 1,2,3 in every browser!
    var a = document.getElementById('a');
	add(a,'click',function(){alert(1)})
	add(a,'click',function(){alert(2)})
	add(a,'click',function(){alert(3)})
		
###	The result is 2,3 in every browser!	
	remove(a,'click',function(){alert(1)})
	
### And the remove function can use many styles and more blank,cause we delete additional blanks!such as the follwering style:	
	remove(a,'click',function(){ alert(1) } )
	remove(a,'click',function(){
		alert(1) } )
	remove(a,'click',function(){
		alert(1) 
	})	
