# Project_buildingCommunityLogin
# 개인 프로젝트 'BUildingCommunity를 Build 하자'
웹사이트 주소: http://jdoubleeyun.shop (서버 내림)   
### 건물의 건의사항을 BuildingCommunity에 Build 해보세요!

## 기술스택 및 프레임워크
👨‍💻안지윤

💻프론트엔드
- html (typleaf)
- css
- javascript(jquery) 
  
💻백엔드
- java(Spring boot)

## Structure   
![image](https://user-images.githubusercontent.com/82137367/142790103-ceca64b9-2104-4604-9b6b-1fd7fd1d62eb.png)

## 주요 API 리스트
기능|URL|METHOD|REQUEST|RESPONSE
----|---|---|---|---|
회원가입|/user/signup|GET| |signup.html(Form Page)|
회원가입|/user/signup|POST|username,password,email|redirect:/user/login|
로그인|/user/login|GET| |login.html(Form Page)|
로그인|/user/login|POST|username,password|성공시:redirect:api/boards  실패시:redirect:/user/login?error|
회원 로그아웃|/user/logout|GET| |redirect:user/login|
게시글 등록|/api/boards|POST|title, contents|로그인 회원만 가능 index.html|
게시글 목록 조회|/api/boards|GET|username, title|모든 회원가능 index.html|
게시글 상세 조회|/api/boards/{id}|GET|modifieddate, createddate, username, title, contents|comment.html|
댓글 작성|/api/boards/{id}|POST|commments|로그인 회원만 가능/ comment.html 비로그인시, redirect:/user/login|
게시글의 댓글 목록 조회|/api/boards/{id}|GET|modifieddate, createddate, username, comments|모든 회원 가능 comment.html|
댓글 수정|/api/boards/{id}/edit/{id}|PUT||로그인 본인의 댓글만 접근 가능|
댓글 삭제|/api/boards/{id}/delete/{id}|DELETE|reviewname,reviewdesc|로그인 본인의 댓글만 접근 가능|

## 주요 페이지별 기능
1. 회원가입 페이지
   1. SpringSecurity Authenticaiton filter(username, password) 로 토큰 생성 후  DB에 저장
   2. SecurityContext에 회원가입 사용자 토큰 저장
2. 로그인 페이지
   1. SpringSecurity Authentucation filter로 SecurityContext에 사용자 SessionID 존재 확인
   2. 유효성 검증시, 메인페이지로 이동 유효성 검증실패시, 로그인페이지 redirect
   3. 카카오 소셜 로그인 기능 추가
3. 게시판 페이지
   1. 해당 건물에 게시된 게시글 전체 조회 가능
   2. 비로그인 상태에서 조회 가능
   3. 최신 게시글로 정렬
4. 댓글 페이지
   1. 클릭한 게시글의 상세한 내용 조회 가능
   2. 해당 게시글에 대한 댓글목록들을 모아서 조회가능
   3. 로그인한 사용자를 기준으로 본인 작성 댓글 수정, 삭제 가능
   4. 비로그인시, 댓글 작성 불가능. login page 로 redirect
