function addBlog(){
  

    var title = document.getElementById("title").value;
    var article = document.getElementById("article").value;

    var divtag = document.createElement("div")
    var h5 = document.createElement("h5")
    var ptag1 = document.createElement("p");

    var titletext = document.createTextNode(""+title);
    var ptagcontent2 = document.createTextNode(""+article);


    // var image2= document.getElementById("output")
    // var img1 = document.createElement('img');
    // img1.src = "blog1.png"
    // img1.width=100,
    // img1.height=100


    divtag.setAttribute("class","card")

 
    h5.appendChild(titletext)
    ptag1.appendChild(ptagcontent2)
 
    // divtag.appendChild(img1)
    divtag.appendChild(h5)
    divtag.appendChild(ptag1)
 
 
    document.getElementById("main").appendChild(divtag);
    reset()

}

function reset() {
    document.getElementById("title").value="";
    document.getElementById("article").value=""; 
    document.getElementById("file").value=""; 
}

function deleteInfo(count) {
    console.log("delete fun called.."+count);
    document.getElementById(count).remove();
}