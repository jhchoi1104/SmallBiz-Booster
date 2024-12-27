이제부터 리드미 파일을 제작할 것입니다. 아래는 기존에 작성해놓은 부분입니다. 더 깔끔하게 보일 수 있도록 해주세요. 그리고 요구사항에 맞게 파일을 완성시켜주세요.
그리고 중간중간에 이미지를 삽입할 것인데, 아래 이미지 경로를 위해 파일 위치와 이름을 알 수 있도록 코드를 제공해드리겠습니다.
(base) jhchoi@jhchoiui-MacBookPro-2 self-employed % ls
AI_Models	Frontend	assets		venv
Backend		README.md	test
(base) jhchoi@jhchoiui-MacBookPro-2 self-employed % cd assets/images 
(base) jhchoi@jhchoiui-MacBookPro-2 images % ls
architecture.png	goal.png		security.png
background.png		loanProductDetails.png	simulation.png
businessItemDetails.png	loanProductMain.png	skillStack.png
businessItemMain.png	manageStore.png		summary.png
community.png		mypage.png		usedAPI.png
erd.png			report1.png
example.txt		report2.png

![Summary](assets/images/summary.png)

---

## 목차

- [프로젝트 기간](#프로젝트-기간)
- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [동작 영상](#동작-영상)
- [기술 스택](#기술-스택)
- [사용 API](#사용-api)
- [시스템 아키텍처](#시스템-아키텍처)
- [ERD 설계](#ERD 설계)
- [업무 분담](#업무-분담)

---

## 프로젝트 기간

2024.09.05 ~ 2024.10.24

---

## 프로젝트 소개

![Background](assets/images/background.png)

![Goal](assets/images/goal.png)

---


주요 기능
먼저 주요 기능 목차에 들어갈 내용의 형식을 알려드리겠습니다. 이미지를 표 안에 구획을 나눠서 이미지 혹은 텍스트를 넣어주세요. 또한 맨 앞에는 h3 크기의 제목을 넣어주세요.
<h3>✸ 로그인/회원가입, 온보딩</h3>
<table>
	<tr>
    <td colspan="3" align="center">로그인/회원가입</td>
	  <td colspan="3" align="center">온보딩</td>
  </tr>
  <tr>
    <td align="center"><img width="329" src="https://github.com/user-attachments/assets/888bb6c7-ad8a-4491-9151-ea55f584a5d7"/></td>
    <td align="center"><img width="329" src="https://github.com/user-attachments/assets/617951eb-fe86-4cc4-8a09-b30ef8902bfb"/></td>
    <td align="center"><img width="329" src="https://github.com/user-attachments/assets/c988c170-0b0b-4079-93fd-d47666fc0905"/></td>
	  <td align="center"><img width="329" src="https://github.com/user-attachments/assets/bedb8433-aa46-4571-9579-d8257564e4de"/></td>
    <td align="center"><img width="329" src="https://github.com/user-attachments/assets/eed39fac-07fa-4fd2-9e64-ca79910be101"/></td>
    <td align="center"><img width="329" src="https://github.com/user-attachments/assets/b5bc2d71-93f3-4fc6-94ca-032337d69ae1"/></td>
  </tr>
  <tr>
    <td colspan="3" align="center">이메일 인증을 통한 회원가입</td>
	  <td colspan="3" align="center">마이데이터 연동 후, 한 달 수익과 지출 한도 설정</td>
  </tr>
</table>

지금부터는 내용입니다.
"- 1줄" 의미는 왼쪽에 기입한 것들이 모두 표 안에 한 행에 넣어야 한다는 의미입니다. 
(숫자/숫자)은 기입할 내용의 표 너비가 전체 너비의 숫자 분의 숫자 크기만큼 공간을 사용한다는 의미입니다.
제목은 h3 크기이고, 앞에 ✸ 이 기호를 그대로 사용해주세요.

✸ 시뮬레이션 리포트
시뮬레이션(1/3), 리포트(2/3) - 1줄
simulation 이미지(1/3), report1 이미지(1/3), report2 이미지(1/3) - 1줄
사용자 성향 분석을 위한 시뮬레이션(1/3), 시뮬레이션 결과 기반 프렌차이즈 추천 리포트(2/3) - 1줄

✸ 정보 광장
인기업종(1/2), 대출상품(1/2) - 1줄
businessItemMain 이미지(1/2), loanProductMain 이미지(1/2) - 1줄
businessItemDetails 이미지(1/2), loanProductDetails 이미지(1/2) - 1줄
요즘 뜨는 업종/상권 순위 및 상세정보 제공(1/2), 자영업에 필요한 대출상품 제공 및 추천(1/2) - 1줄

✸ 가게 관리 / 커뮤니티
가게관리(1/2)
커뮤니티(1/2)
manageStore 이미지(1/2), community 이미지(1/2) - 1줄
사용자의 업장 상황 및 주변 비교 정보 제공(1/2), 자영업자들의 정보 공유와 친목 도모를 위한 게시판(1/2) - 1줄

✸ 회원가입 및 로그인
회원가입 및 로그인(1/2), 마이페이지(1/2) - 1줄
security 이미지(1/2), mypage 이미지(1/2) - 1줄
JWT 토큰을 이용한 회원 관리(1/2), 회원 정보 CRUD(1/2) - 1줄

---------------
동작 영상 
시뮬레이션 동작 영상1, 시뮬레이션 동작 영상2 - 1줄
---------------
기술 스택
skillStack 이미지
---------------
사용 API
usedAPI 이미지
---------------
시스템 아키텍쳐
architecture 이미지
---------------
ERD 설계
erd 이미지
---------------
업무 분담










