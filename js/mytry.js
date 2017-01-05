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