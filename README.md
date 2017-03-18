# Project Rian

Connect the team  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Install node packages
Open our project by following commands

```
npm install
npm start
```


## Directory and Little Introduction

**Index**
 리덕스 스토어 프로파이더와 웹팩 2 핫로딩을 불러온다 

**Root**
 데브와 프로덕션의 분기점
 데브에는 리덕스 데브툴스가 포함 되어있다

**Rian**
헤더, 네브, 메인 컨텐츠로 구성되어있는 메인 컨테이너
로그인이 되어 있지 않다면 여기서 로그인 컴퍼넌트를 보여준다 
React Dnd를 앱 전체적으로 연결해준다

**Header**
헤더가 마운트되면 프로젝트들의 필요한 정보들만 불러온다 (타이틀, 썸네일)
리안 로고와 프로젝트 추가, 유저정보 등 을 담고 있다

**Navigation**
네비게이션 및 서브 컨텐츠를 담고 있는 컨테이너

**MainContent**
리안의 각종 기능들을 담고 있는 메인 컨텐트 컨테이너

**Calendar**
관련있는 *Plan* 들을 보여주는 컴포넌트
Flexbox를 활용해 responsive, clean 레이아웃
현재 보여지고 있는 영역에서는 리얼타임 데이터를 추구한다
드래그 앤 드롭 기능으로 일정 추가가 가능할 예정
- FlexCalendarHeader <br>
날짜 이동을 담당하고 요일들을 고정으로 보여준다
- FlexCalendarBody <br>
지금 보여지는 MonthDays의 데이터를 만들어내고
Monthly/ Weekly로 나눠준다
- FlexMonth <br>
  MonthDays를 활용해 월 달력을 만들어준다
- FlexWeek <br>
  MonthDays를 활용해 주 달력을 만들어주고 FlexSmallBricks들을 만들어낸다



## Running the tests

Run mocha tests

```
npm run mocha
```

### Break down into end to end tests

Test

### And coding style tests

Eslint

## Deployment

```
npm run build
npm run start:server
```

## Built With

* [React](https://facebook.github.io/react/) - Web framework
* [Redux](http://redux.js.org/) - JS Library
* [Express](http://expressjs.com/) - Node server framework
* [MongoDB](https://www.mongodb.com/) - Database
* [Mongoose](http://mongoosejs.com/) - MongoDB object modeling
* [Webpack v2](https://webpack.js.org/) - Bundler
* [Socket.io](http://socket.io/) - Realtime application
* [Mocha](https://mochajs.org/) - Testing framework

## Directory and Introduction


## Contributing


## Versioning


## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
