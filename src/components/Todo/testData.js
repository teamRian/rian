const todoList = {
    logs: [
        {"1999-01-01 02:01:01 am" : {
            message: "TodoList만들기이(가) 준비되었습니다",
            author: "khseok"}
        },
        {"1999-01-03 02:01:01 am" : {
            message: "TodoList만들기이(가) 시작되었습니다",
            author: "khseok"}
        },
        {"1999-01-04 02:01:01 am" : {
            message: "TodoList만들기이(가) 완료되었습니다", 
            author: "khseok"}
        },
    ],
    todos: [
        {
            "id": "svcoding_CS101_1",
            "projectId": "svcoding_CS101",
            "projectname": "CS101",
            "author": "khseok",
            "player": ["khseok", "siwoo", "alexlee"],
            "index": 1,
            "title": "TodoList 만들기",
            "text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in laoreet ipsum. Nulla tempus, elit vel mattis eleifend, diam eros dignissim massa, a congue mi ligula nec massa.",
            "createdAt": "1999-01-01",
            "startdate": "1999-01-01",
            "enddate": "1999-01-03",
            "status": "completed",
            "importance": 8,
            "ratio": {
                "khseok": 20,
                "siwoo": 30,
                "alexlee": 50
            },
            "editDate": "2000-04-12 11:12:30 am",
            "editAuthor": "siwoo"
        },
        {
            "id": "svcoding_CS101_2",
            "projectId": "svcoding_CS101",
            "projectname":"CS101",
            "author":"cereburu",
            "player":["cereburu"],
            "index": 2,
            "title": "App Structure 만들기",
            "text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in laoreet ipsum. Nulla tempus, elit vel mattis eleifend.",
            "createdAt": "1999-01-02",
            "startdate": "1999-01-03",
            "enddate": "1999-01-04",
            "status": "completed",
            "importance": 4,
            "ratio": {
                "cereburu": 100
            },
            "editDate": "",
            "editAuthor": ""       
        },
        {
            "id": "svcoding_CS101_3",
            "projectId": "svcoding_CS101",
            "projectname":"CS101",
            "author":"plack",
            "player":["alexlee", "siwoo", "seungchan"],
            "index": 3,
            "title": "Webpack 구성하기",
            "text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in laoreet ipsum. Nulla tempus, elit vel mattis eleifend.",
            "createdAt": "1999-01-03",
            "startdate": "1999-01-04",
            "enddate": "",
            "status": "progress",
            "importance": 7,
            "ratio": {
                "alexlee": 50,
                "siwoo": 30,
                "seungchan": 20
            },
            "editDate": "",
            "editAuthor": ""   
        },
        {
            "id": "svcoding_CS101_4",
            "projectId": "svcoding_CS101",
            "projectname":"CS101",
            "author":"alexlee",
            "player":["alexlee"],
            "index": 4,
            "title": "Find CSS Framework",
            "text":"Find Css FrameWork",
            "createdAt": "1999-01-04",
            "startdate": "",
            "enddate": "",
            "status": "created",
            "importance": 2,
            "ratio": {
                "alexlee": 100
            },
            "editDate": "",
            "editAuthor": ""
        },
        {
            "id": "svcoding_CS101_5",
            "projectId": "svcoding_CS101",
            "projectname":"CS101",
            "author":"alexlee",
            "player":["seungchan", "siwoo"],
            "index": 5,
            "title": "서버 구현하기",
            "text":"서버 구현하기",
            "createdAt": "1999-01-05",
            "startdate": "",
            "enddate": "",
            "status": "created",
            "importance": 1,
            "ratio": {
                "seungchan": 50,
                "siwoo": 50
            },
            "editDate": "",
            "editAuthor": ""
        }
    ]
}
export default todoList;
