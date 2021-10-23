var myapp = myapp ||{};
myapp.namespace=function(ns_string){
	var parts = ns_string.split('.'),parent = myapp, i;
	if(parts[0] === "myapp"){
		parts = parts.slice(1);
	}
	
	for (i=0;i<parts.length; i+=1){
		if(typeof parent[parts[i]] === "undefined"){
			parent[parts[i]]={};
		}
		parent = parent[parts[i]];
	}
	return parent;
};