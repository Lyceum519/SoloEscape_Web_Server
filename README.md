# SoloEscape_Web_Server
SoloEscape Server using Express

## Table of contents

- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Etc](#etc)

## Tech Stack

* 언어 및 프레임워크 : JavaScript, Node.js - Express.js

  1. Single-page_application 제작에서 Node.js가 가지는 유리한 점.

  2. AngularJS 등의 자바스크립트 MVC 프레임워크와 결합하면 클라이언트와 서버의 코드를 매끄럽게 이어지게 개발가능. 

  3. 웹앱 뿐 아니라 채팅처럼 실시간으로 커뮤니케이션이 일어나는 기능을 가장 손쉽게 구현할 수 있는 방법인 socket.io도 Node.js에 기반함.
(타 언어도 socket.io를 지원하지만 Node.js에서 가장 사용하기 쉽다.)

* 데이터베이스 : RDBMS or NoSql(단순데이터 저장은 MySql + 부분적으로 MongoDB(위치정보), Redis(캐싱)?)

  * MySQL
    1. 관리가 비교적 쉽다?
  
    2. 부족한 부분
    
       +caching
  
       +readonly replication (http://jo.centis1504.net/?p=710)
     
       +database sharding

  * MongoDB
    1. 위치정보를 다루기 쉽다.
    
    2. 스키마와 인덱스의 자유도가 높다.
    
    3. Node.js와 궁합이 좋다.

* 이미지 서버

* 캐싱

* 작업큐 (적용할 곳이 있을까?)
  * http://queues.io

https://stackshare.io/

## Directory Structure

<pre>
(예시)
SoloEscape_Web_Server/

├── package.json

├── bin

│   └──

├── public

│   └── images

│   └── javascripts

│   └── stylesheets

├── routes

│   └── index.js

│   └── users.js

├── app.js

└── views

    └── error.jade
    └── index.jade
    └── layout.jade
</pre>


##Etc
