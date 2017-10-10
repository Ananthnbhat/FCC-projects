 var entry = '';
 var answer = '';
 var curr = '';
 var re = /[0-9]/;

 function myFunc(obj) {
     var re = /[0-9]/g;
     var reg = /^(\+|-|\*|\/|=|>|<|>=|<=|&|\||%|!|\^|\(|\))$/g;
     var arr = [];
     var i = 0;
     var entry = obj.value;
     console.log(entry);
     if (entry.match(re)) {
         arr[i++] += entry;

         document.getElementById("display").innerHTML += entry;
     } else if (entry.match(reg)) document.getElementById("display").innerHTML += entry;
     else document.getElementById("display").innerHTML += 'entry' + alert(arr[i]);
 }