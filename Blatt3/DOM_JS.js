var link = document.getElementsByTagName("a")[1];

/*Speichert in die Variable link das element mit dem tag "a" mit Index 1*/

console.log(link.attributes["href"].nodeValue);
/*Gibt Value vom href attribute aus*/

console.log(link.getAttributeNode("href").nodeValue);
/*Gibt Value vom href attribute node aus*/

console.log(link.href);
/*Gibt Value vom href node aus*/

console.log(link.attributes.length);	
/*Wie viele nodes sind im Element */

console.log(link.attributes[0].nodeType);											
/*Welcher Typ ist das nullte node von link. element node = 1, attribute node = 2, text node = 3 , comment node = 8 */

console.log(link.firstChild.nodeType);
/*Welcher Typ ist das erste Kind node von link . element node = 1, attribute node = 2, text node = 3 , comment node = 8 */

console.log(link.parentNode.nodeType);
/*Welcher Typ hat das Parent node von link. element node = 1, attribute node = 2, text node = 3 , comment node = 8 */

console.log(link.parentNode.nodeName);
/*Welchen Namen hat das Parent node von link. element node = 1, attribute node = 2, text node = 3 , comment node = 8 */

var div = document.getElementById("wiki_en");
/*Speichert in die Variable div das element mit der id "wiki_en". Gibt nur das erste element zurück*/

console.log(div.children[1].lastElementChild.previousElementSibling.src);
/*Gibt die src value vom vorangehenden letzten Kind aus*/

console.log(div.innerHTML);
/*Gibt html code von von allen Kindern aus*/

console.log(document.querySelector("#wiki_ja p").innerText);
/*Gibt den Text des p elements aus welches in einem element mit id =#wiki_ja" ist. Gibt nur das erste element zurück*/

console.log(document.querySelectorAll(".europe h2")[0].firstChild.nodeValue);
/*Gibt die Value des ersten Kindes welches ein h2 element ist mit Parent welcher die Klasse .europe hat aus*/

/*
var link = document.getElementsByTagName("a").item(2);
link.removeAttribute("target"); 
.item gibt den index an und removeAttribute("target") entfernt das target attribut
*/
