 var entry = '';
 var answer = '';
 var curr = '';
 var re = /[0-9]/;

 function myFunc(obj) {
     var re = /[0-9]/;
     entry = obj.value;
     console.log(entry);
     if (entry === 0 || entry === 2 || entry === 2 || entry === 3 || entry === 4 || entry === 5 || entry === 6 || entry === 7 || entry === 8 || entry === 9)
         document.getElementById("display").innerHTML += entry;

 }