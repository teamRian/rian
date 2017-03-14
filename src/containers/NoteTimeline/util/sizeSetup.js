export default function sizeSetup(length, wholeScrollsize, boxsize, viewpointsize, howManyatOnce, waypointStandard, viewpointsize, waypointStandard, waypointList){
    console.log('Size!!!!!!!!!!!!!!!!!!!!')
     //1: 스크롤창 전체 길이를 설정.
    this.wholeScrollsize = this.boxsize*length //박스의 총 갯수가 전체 스크롤 뷰의 길이가 아니겠는가?
    //2: 스크롤 뷰포인트 길이를 잰다.
    this.viewpointsize = window.innerHeight - 52 //(52는 상단 네브바의 길이)
    //3: 뷰포인트에 넣었을 때, 꽉 차는 갯수는? Math.floor(this.viewpointsize/this.boxsize)+1 
    this.howManyatOnce = Math.floor(this.viewpointsize/this.boxsize)+1
    //4: waypoint는 뷰포인트 길이의 3/1지점쯤
    this.waypointStandard = Math.floor((this.viewpointsize/3)/this.boxsize)*this.boxsize
    for(var i = 0; i*this.waypointStandard < this.wholeScrollsize; i++) {
      this.waypointList.push(this.waypointStandard*i)
    }
    // console.log("this.wholeScrollsize", this.wholeScrollsize)
    // console.log("this.viewpointsize", this.viewpointsize)
    // console.log("this.howManyatOnce", this.howManyatOnce)
    // console.log("this.waypointStandard", this.waypointStandard)
    //console.log("this.waypointList", this.waypointList)
   
  }