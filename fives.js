var from,to;
var info,players;
var arr;
var indexFrom;
var indexTo;
var result;
var body;
var p,colors;
var z=0;
var header=["خليك بالبيت","quedarse en casa","остаться дома","evde kal","stai acasă","rester à la maison","stare a casa","집에있어 라","家にいる","呆在家里","Μείνε σπίτι","stay home"];
class node {
  constructor(){
  this.left=null;
  this.right=null;
  this.up=null;
  this.down=null;
  }
}
window.addEventListener("load",start);
function start() {
  result=new Array(2);
  result[0]=0;
  result[1]=0;
  players=new Array(2);
  players[0]=document.getElementById("0");
  players[1]=document.getElementById("1");
  body=document.getElementById("body");
  info=document.getElementById("header");
  setInterval(function(){
    if(z<header.length) {
    info.innerHTML='<img src="2.png" alt="" width="40px" height="40px">'+header[z]+'<img src="2.png" alt="" width="40px" height="40px">';
    z++;
    }
    if(z>=header.length)
    z=0;
  }, 3500);
  arr=new Array(15);
  var indexFrom=new Array(2);
  var indexTo=new Array(2);
  for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(20);
      for(var j=0;j<20;j++) {
        arr[i][j]=new node();
      }
  }
  p=0;
  colors=["#FFFF33","#FF007F"];
  for(var i=1;i<=15;i++) {
    for(var j=1;j<=20;j++) {
      var circle = document.createElement("img");
      circle.src="5.png";
      circle.setAttribute("id",20*(i-1)+j);
      circle.setAttribute("class","circle");
      circle.setAttribute("style","left:"+(35*(j+1)+20*j)+"px;top:"+(10*(i+1)+20*i)+"px;");
      circle.addEventListener("mousedown",function() {
        event.preventDefault();
        from=parseInt(event.target.getAttribute("id"));
        indexFrom[0]=parseInt(event.target.style.left);
        indexFrom[1]=parseInt(event.target.style.top);
      });
      circle.addEventListener("mouseup",function() {
        to=parseInt(event.target.getAttribute("id"));
        indexTo[0]=parseInt(event.target.style.left);
        indexTo[1]=parseInt(event.target.style.top);
        var x1=parseInt(from/20);
        var x2=parseInt(to/20);
        var y1=parseInt(from%20-1);
        var y2=parseInt(to%20-1);
        if(x1==x2 && y2-y1==1) {
          //right left
            if(arr[x1][y1].right==null) {
          arr[x1][y1].right=p;
          arr[x2][y2].left=p;
          drawLine(indexFrom,indexTo);
          isWin(x1,x2,y1,y2);
          players[0].innerHTML="player1:"+result[0];
          players[1].innerHTML="player2:"+result[1];
          p=p==0?1:0;
        }
      } else if(x1==x2 && y1-y2==1) {
            if(arr[x1][y1].left==null) {
          arr[x1][y1].left=p;
          arr[x2][y2].right=p;
          drawLine(indexFrom,indexTo);
          isWin(x1,x2,y1,y2);
          players[0].innerHTML="player1:"+result[0];
          players[1].innerHTML="player2:"+result[1];
          p=p==0?1:0;
        }
        }
        if(y1==y2 && x1-x2==1) {
          if(arr[x1][y1].up==null) {
          arr[x1][y1].up=p;
          arr[x2][y2].down=p;
          drawLine(indexFrom,indexTo);
          isWin(x1,x2,y1,y2);
          players[0].innerHTML="player1:"+result[0];
          players[1].innerHTML="player2:"+result[1];
          p=p==0?1:0;
        }
      } else if(y1==y2 && x2-x1==1) {
            if(arr[x1][y1].down==null) {
          arr[x1][y1].down=p;
          arr[x2][y2].up=p;
          drawLine(indexFrom,indexTo);
          isWin(x1,x2,y1,y2);
          players[0].innerHTML="player1:"+result[0];
          players[1].innerHTML="player2:"+result[1];
          p=p==0?1:0;}
        } else {

        }
      });
      body.appendChild(circle);
    }
  }
}
function drawLine(indexFrom,indexTo) {
  var c = document.createElement("canvas");
  c.setAttribute("width","1250px");
  c.setAttribute("height","490px");
  c.setAttribute("style","block:none;position:absolute;");
  var ctx = c.getContext("2d");
  ctx.strokeStyle =colors[p];
  ctx.moveTo(indexFrom[0]+8, indexFrom[1]+8);
  ctx.lineTo(indexTo[0]+8, indexTo[1]+8);
  ctx.stroke();
  body.appendChild(c);
}
function isWin(x1,x2,y1,y2) {
  if(x1==x2) {
    if(y1<y2) {
    if(arr[x1][y1].up==p && x1-1>=0 && arr[x1-1][y1].right==p && y1+1<20 && arr[x1-1][y1+1].down==p) {
    result[p]+=1;
    }
    else if(arr[x1][y1].down==p && x1+1<20 && arr[x1+1][y1].right==p && y1+1<20 && arr[x1+1][y1+1].up==p) {
    result[p]+=1;
    }
  }
    else {
      if(arr[x1][y1].down==p && x1+1<20 && arr[x1+1][y1].left==p && y1-1>=0 && arr[x1+1][y1-1].up==p) {
      result[p]+=1;
}
      else if(arr[x1][y1].up==p && x1-1>=0 && arr[x1-1][y1].left==p && y1-1>=0 && arr[x1-1][y1-1].down==p) {
      result[p]+=1;
}
    }

  }
  else if(y1==y2) {
    if(x1<x2){
    if(arr[x1][y1].left==p && y1-1>=0 && arr[x1][y1-1].down==p && x1+1<20 && arr[x1+1][y1-1].right==p) {
    console.log("plus one point to player"+p);
    result[p]+=1;
}
    else if(arr[x1][y1].right==p && y1+1<20 && arr[x1][y1+1].down==p && x1+1<20 &&arr[x1+1][y1+1].left==p) {
    console.log("plus one point to player"+p);
    result[p]+=1;
}
  }
  else {
    if(arr[x1][y1].right==p && y1+1<20 && arr[x1][y1+1].up==p && x1-1>=0 && arr[x1-1][y1+1].left==p) {
    console.log("plus one point to player"+p);
    result[p]+=1;
}
    else if(arr[x1][y1].left==p && y1-1>=0 && arr[x1][y1-1].up==p && x1-1>=0 && arr[x1-1][y1-1].right==p) {
    console.log("plus one point to player"+p);
    result[p]+=1;
}
  }
  }
}
