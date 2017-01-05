var chess=document.getElementById('chess');
var context=chess.getContext("2d");
context.strokeStyle="#BFBFBF";
drawpath();
var alchess=[];
var wins=[];//赢法数组
var mywin=[];//5子胜利数组
var computerwin=[];
var count=0;
var over=false;

for(var i=0;i<15;i++)
{
	wins[i]=[];
	for(var j=0;j<15;j++)
	wins[i][j]=[];
}

for(var i=0;i<15;i++)//同行赢的可能
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i][j+k][count]= true;
		}
		count++;
	}
}

for(var i=0;i<11;i++)//同列赢的可能
{
	for(var j=0;j<15;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j][count]=true;
		}
		count++;
	}
}
for(var i=0;i<11;i++)//斜列赢的可能
{
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
for(var i=0;i<11;i++)//斜列赢的可能
{
	for(var j=14;j>3;j--)
	{
		for(var k=0;k<5;k++)
		{
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
// console.log(count);显示赢的次数；

for(var i=0;i<count;i++)
{
	mywin[i]=0;
	computerwin[i]=0;
}

var piece=true;//设定初始为黑棋
for (var i=0;i<15;i++)//初始化数组
{
	alchess[i]=[];
	for(var j=0;j<15;j++)
	{
		alchess[i][j]=0;
	}
}

chess.onclick=function(e)
{
	if(over)
		return;
	if(!piece)
	{
		return;
	}
     	var x=e.offsetX;
     	var y=e.offsetY;
     	var xx=Math.floor(x/30);
     	var yy=Math.floor(y/30);
     	
     	if(	alchess[xx][yy]==0)
    	{ 	onepiece(xx,yy,piece);
     		alchess[xx][yy]=1;//防止重复
     		if(piece==true)//判断黑棋赢
     		{
	     			for (var i=0;i<count;i++)
	     		{
	     			if(wins[xx][yy][i])
	     			{
	     				mywin[i]++;//+1
	     				computerwin[i]=6;//计算机在这个点没有赢得可能，直接赋大于5的数
	     				if(mywin[i]==5)
	     				{	window.alert("黑棋赢了");
	     					over=true;
	     				}
	     			}
	     		}
     		}
     		// if(piece==false)//判断白棋赢
     		// {
	     	// 		for (var i=0;i<count;i++)
	     	// 	{
	     	// 		if(wins[xx][yy][i])
	     	// 		{
	     	// 			mywin[i]=6;
	     	// 			computerwin[i]++;
	     	// 			if(computerwin[i]==5)
	     	// 			{	window.alert("白棋赢了");
	     	// 				over=true;
	     	// 			}
	     	// 		}
	     	// 	}
     		// }
     		
     		if(!over)
     		{	piece=!piece;
     			computerAI();

     		}
     	}	
     	
}

var computerAI=function()
{
	var myscore=[];
	var computerscore=[];
	var max=0;
	var u=0,v=0;
	for(var i=0;i<15;i++)//给积分数组初始化
	{
		myscore[i]=[];
		computerscore[i]=[];
		for(var j=0;j<15;j++)
		{
			myscore[i][j]=0;
			 computerscore[i][j]=0;
		}
	}


	for(var i=0;i<15;i++)//打分排序
	{
		for(var j=0;j<15;j++)//遍历整个棋盘
		{
			if(alchess[i][j]==0)//如果此处没有落子则计算机要考虑打分排序
			{
				for(var k=0;k<count;k++)//遍历整个赢法数组
				{
					if(wins[i][j][k])//找到这个点的赢法数组
					{
						if(mywin[k]==1)//阻止人赢的前提下，给mysocre打分
						{
							myscore[i][j]+=200;
						}else if(mywin[k]==2){
							myscore[i][j]+=400;
						}else if(mywin[k]==3){
							myscore[i][j]+=2000;
						}else if(mywin[k]==4){
							myscore[i][j]+=10000;
						}

						if(computerwin[k]==1)//计算机赢的前提下打分
						{
								computerscore[i][j]+=320;
							}else if(mywin[k]==2){
								computerscore[i][j]+=520;
							}else if(mywin[k]==3){
								computerscore[i][j]+=4400;
							}else if(mywin[k]==4){
								computerscore[i][j]+=40000;
								}
						
					}
				}
			// if(myscore[i][j]>max)//对分数进行排序
			// 	{
			// 		max=myscore[i][j];
			// 		u=i;v=j;
			// 	}else if(myscore[i][j]==max)
			// 		{
			// 			if(computerscore[i][j]>computerscore[u][v])
			// 			{
			// 				u=i;v=j;
			// 			}
			// 		}	
			// if(computerscore[i][j]>max)//对分数进行排序
			// 	{
			// 		max=computerscore[i][j];
			// 		u=i;v=j;
			// 	}else if(computerscore[i][j]==max)
			// 	{
			// 		if(myscore[i][j]>myscore[u][v])
			// 		{
			// 			u=i;v=j;
			// 		}
			// 	}	
			var t=Math.max(myscore[i][j],computerscore[i][j]);
				if(t>=max) {max=t;u=i;v=j;}
			}
		}

	}
	onepiece(u,v,piece);
	alchess[u][v]=1;
	if(piece==false)//判断白棋赢
     		{
	     			for (var i=0;i<count;i++)
	     		{
	     			if(wins[u][v][i])
	     			{
	     				mywin[i]=6;
	     				computerwin[i]++;
	     				if(computerwin[i]==5)
	     				{	window.alert("电脑赢了");
	     					over=true;
	     				}
	     			}
	     		}
     		}
     		if(!over)
     			piece=!piece;
}

function onepiece(i,j,t)//
{	
	var gradient = context.createRadialGradient(15+30*i+2, 15+30*j-2, 13, 15+30*i+2 ,15+30*j-2, 0);
     gradient.addColorStop  (0, "#0A0A0A");
     gradient.addColorStop  (1, "#636766");
    
	// context.fillStyle='black';
	context.beginPath();
	context.arc(15+30*i,15+30*j,13,0,2*Math.PI);
	context.closePath();
	if(t==false)
		// context.fillStyle='white';
	{
		gradient='white';
     	}
     	context.fillStyle = gradient;
	context.fill();
}

function drawpath()
{
	for(var i=0;i<15;i++)
	{
		context.moveTo(15+30*i,15);
		context.lineTo(15+30*i,435);
		context.stroke();

		context.moveTo(15,15+30*i);
		context.lineTo(435,15+30*i);
		context.stroke();

	}
}

