window.onscroll = function () { stickyScroll() };
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function stickyScroll() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}
function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
filterSelection("all")
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("column");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}
//buggy functions for back and next
var contents = ["s1", "p1", "m1", "d1"]; 
var currentlyActiveContentIndex = 0;
var scrollBackOffset = -50; //just a hack number, without this we dont see the heading it goes below the sticky navbar
function goNext(){
    currentlyActiveContentIndex++;
    if(currentlyActiveContentIndex >= contents.length){
        currentlyActiveContentIndex--;
    }else{
        document.getElementById(contents[currentlyActiveContentIndex]).scrollIntoView();
        window.scrollBy(0,scrollBackOffset);
    }
}
function goBack(){
    currentlyActiveContentIndex--;
    if(currentlyActiveContentIndex < 0){
        currentlyActiveContentIndex = 0;
    }else{
        document.getElementById(contents[currentlyActiveContentIndex]).scrollIntoView();
        window.scrollBy(0,scrollBackOffset);
    }
}