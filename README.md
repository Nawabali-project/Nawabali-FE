<img src="https://capsule-render.vercel.app/api?type=waving&color=0:85daff,100:6799fe&height=100" />

![동네방네 썸네일 시안2](https://github.com/Nawabali-project/Nawabali-FE/assets/80045891/a0a3aa24-c2a2-46f9-872a-b66258c6d6ce)

# 🏡 동네방네 🏡
"동네방네" 에서 우리의 동네를 소개해요!

**”동네 방네”는 줄어든 동네에 대한 애정, 주민들과의 유대감을 증대시키기 위한 서비스입니다.**

동네방네는 **"동네를 꾸며간다”** 에 중점을 두었습니다. 요즘은 인스타 피드, 싸이월드 같이 본인의 무언가를 꾸미고 싶어하는 트렌드입니다. 이를 이용하여 자신의 **동네에 주민** 들만 알 수 있는 히든 맛집, 카페, 사진 스팟 등을 지도에 드랍하여 본인 동네가 점점 꾸며지는 모습을 볼 수 있고 신빙성 있는 정보를 얻을 수 있습니다. 또한 소통을 통해본인 동네의 애정, 주민들과의 유대감을 키울 수 있습니다. 다른 지역 동네들과 비교를 통해 경쟁할 수 도 있습니다. 

* 📆 개발 기간: 2024.03.26 ~ 2024.05.06 (총 6주)
* 🔗 배포 주소
> **개발 버전** : [https://dongnaebangnae.vercel.app/](https://dongnaebangnae.vercel.app/) <br>
> **서비스 서버** : [https://www.dongnaebangnae.com/](https://www.dongnaebangnae.com/)<br>



<br><br>
## 🧑🏻‍💻👩🏻‍💻 FE 팀원
| **최경일(팀장)** | **하나래** |
| :------: |  :------: |
| [<img src="https://avatars.githubusercontent.com/u/80045891?s=400&u=621eb447ca2a6cfff4542f203245b89588f29d66&v=4" height=150 width=150> <br/> @inhachoi](https://github.com/inhachoi) | [<img src="https://avatars.githubusercontent.com/u/133945249?v=4" height=150 width=150> <br/> @1roo](https://github.com/1roo) |


| 이름    | 역할    | 깃허브    |
| -----    | -----    | -----    |
| 최경일    | 게시물 CRUD, 댓글 CRUD, 무한스크롤, 주민추천/좋아요/북마크 기능, 카카오 지도 API 연동 (커스텀 오버레이 / 폴리곤 / 키워드 장소검색 목록 표시 / 지도에 마커 찍기 / 내 위치로 이동), 장소 및 카테고리별 필터링, 이미지 최적화(webp 변환, lazy loading), 스켈레톤 UI, 최적화 작업(라이트 하우스 기반) | https://github.com/inhachoi | 
| 하나래    | 마이페이지, 프로필 편집, 실시간 채팅 및 알림, 역 무한스크롤, 검색(debounce), 로그인 및 회원가입(로컬/소셜), 뉴스페이지, | https://github.com/1roo |




<br><br>
## 🛠 Architecture
* #### 전체
![unnamed](https://github.com/Nawabali-project/Nawabali-FE/assets/80045891/6eba048d-a713-4574-82f6-25e68319b121)
<br>
* #### FE
![front](https://github.com/Nawabali-project/Nawabali-FE/assets/80045891/d47032a5-765c-4027-8d27-c96f0e5e20a3)



<br><br>
## 🍀 기술 스택
<div align='left'>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <br>
  <img src="https://img.shields.io/badge/socket.io--client-007CE2?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-%23593d88.svg?style=for-the-badge&logoColor=000000">
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <br>
</div>

<br><br>


## 📌 기술적 의사결정
| 📌 사용 기술 | 📖 기술 설명 |
| --- | --- |
| React | - 컴포넌트 단위 개발을 통 반복되는 것들을 재사용하여 생산성과 유지보수성이 높다. <br>- 가상돔을 활용하여 데이터가 변할 때마다 화면을 새로 띄우는게 아니라, 필요한 부분만 업데이트 해줘서 서비스의 성능과 반응성이 높다. <br>- 데이터가 부모에서 자식으로 전달되기 때문에(데이터 흐름이 한 방향으로 고정되어 있기 때문에) 상태 흐름 예측에 쉽고 디버깅이 쉽다. |
| Typescript | - 기존 JS는 동적 타입 언어로 변수 타입 선언을 안해도 되는 유연성이 있지만, 런타임에서의 오류 발생 가능성이 높았다. (사이트 에러, 콘솔창 에러) <br>- TS는 정적 타입 시스템으로, 컴파일 시점에 타입체크를 통해 오류를 방지하여 프로그램의 안정성을 높일 수 있다. (실행전에 에러 미리 알려줌) <br>- 프로젝트 규모가 커질수록 효과적이다. <br>- api 결과 부분에 타입을 지정해서 유지보수에 도움이 된다. |
| Vite | - CRA와 같은 다른 프론트엔드 빌드 도구보다 훨씬 빠르면서 현재 트렌드이다. <br>- Vite는 ESBuild를 이용하여 첫 실행만 전체 번들링하고, 이후에는 변경된 부분만 새로 번들링하기 때문에 10~100배 빠르다. |
| React Query (tanstack-query) | 1. 서버상태를 비동기적으로 가져오고, 캐싱, 지속적 동기화, 업데이트하는 작업을 단순화한다. <br>2. 데이터 패칭 중 로딩, 에러 등의 상태를 쉽게 관리하게 해주는 기능을 제공한다. |
| StyledComponent | - 스타일 적용을 css파일로 따로 하는게 아니라, 컴포넌트에 바로 삽입하는 방법 <br>- React, Vue, Angular와 같이 재활용 가능한 컴포넌트 기반 개발 방법이 트렌드이다. 저희도 React를 사용하고 있기때문에 채택하게 되었다.|
| ReactRouter | 리액트에서 주소에 따른 컴포넌트 렌더링을 관리하기 위한 라이브러리이다. |
| Kakao Api | - 카카오 로그인을 이용하여 통일성 맞추고자 채택 <br>- 참고하기 좋은 자료가 네이버보다 카카오가 더 많아서 선택. |
| Axios | - Axios는 요청을 보낼 때 자동으로 JSON 데이터를 문자열로 변환 → 안하면 수동 변환 <br>- 요청과 응답을 가로채어 추가적인 로직을 적용할 수 있는 인터셉터 기능 제공 |
| Zustand | 전역으로 관리할 상태가 로그인 여부, SSE알림 구독 여부밖에 없기 때문에 간단하게 전역상태를 쉽게 설정하고 사용할 수 있어서 채택 |
| WebSocket | HTTP는 단방향 통신으로 클라이언트가 요청을 보내는 경우만 응답할 수 있어 실시간으로 서로 원할때 데이터를 주고 받을 수 있는 WebSocket을 적용 |
| SSE (Server-Sent Events) | 단방향 통신만 필요한 알림의 경우, 웹소켓보다 더 경량화되어 쉽게 구현할 수 있고 서버 간의 데이터의 단순한 전달이 목적이므로 SSE 적용 |
| Vercel | 원하는 레포랑 연결만 하면 CI/CD를 알아서 구축해주고, vercel.app 기본 배포 외에도 도메인을 따로 연결할 수 있는 등 개발자 친화적이여서 채택 |


<br><br>

## 주요 기능

## ✅ 회원가입 / 로그인

### 📌 일반 회원가입 / 로그인(Spring Security)

|일반 회원가입|일반 로그인|
|:--:|:--:|
|![image](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/91d96185-9181-4de0-a945-1dac97ec0987)|![image](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/62d0d4d3-e0ef-4c76-908f-ae412e52b1ef)|

- 유효성 검증과 약관 동의가 포함된 회원가입을 할 수 있습니다.
- Spring Security로 사용자의 개인정보 보안성에 중점을 둔 로그인을 할 수 있습니다.

### 📌 일반 회원가입 시 이메일 인증

![이메일인증_저화질3gif](https://github.com/Nawabali-project/Nawabali-BE/assets/157681548/14f170b3-de06-401c-96a3-b64c9b20561a)
- 실제 사용 중인 이메일인지 인증 메일을 발송하고, 인증 코드를 발급하여 메일을 인증할 수 있습니다.
    
### 📌 소셜 로그인(Kakao)
![image](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/cc8abf0d-0769-4bac-9551-785fcc012839)
- 사용자의 접근성에 중점을 둔 소셜 로그인(Kakao)을 할 수 있습니다.
    
## ✅ 지도에서 게시물 조회    
![지도 조회](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/34bb5cd9-555c-46c4-b455-75c8d542b28a)
- 지도에서 게시물들을 한 눈에 볼 수 있습니다.
- 카테고리별로 게시물들을 필터링 할 수 있습니다.

  
## ✅ 리스트에서 게시물 조회    
![리스트 조회](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/e245888c-490a-4e03-b8d1-4986f64465af)
- 리스트에서 무한스크롤로 게시물들을 최신 등록 순으로 조회할 수 있습니다.
- 카테고리별로 게시물들을 필터링 할 수 있습니다.

### ✅ 카테고리 별 조회
**🍛 맛집 카테고리**
<img width="1396" alt="맛집 카테고리" src="https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/a81ad662-f238-4d61-9449-eb8f03f01fe5">
**📸 사진스팟 카테고리**
<img width="1391" alt="사진카테고리" src="https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/ed76c127-53e2-4d4b-82ca-7bc65948dd14">
**☕️ 카페 카테고리**
<img width="1395" alt="카페카테고리" src="https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/3f5ca749-9e1d-45d4-8ced-04214659c9f4"> 

## ✅ 게시물 작성
![게시물작성](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/86481de8-47a7-4d7b-a601-4fff4ad49d00)   
- 자신의 동네에 있는 장소를 입력하여 게시물을 등록할 수 있습니다.
- 검색으로 나와있지 않은 장소라면 사용자가 직접 핀으로 지정하여 내가 알리고 싶은 장소를 게시할 수 있습니다.
- 사진은 최대 5장까지 등록할 수 있습니다.



## ✅ 동네별 활동 점수    
![image](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/95ed6af9-7c9c-4fae-af46-a558135c54ae)
- **동네의 총 게시물 수 + 주민추천 수**가 합산된 점수를 한 눈에 볼 수 있습니다.
- 활동점수가 높은 동네일 수록 지도에 색상이 진하게 표시됩니다.


## ✅ 동네 소식
![동네 소식_5](https://github.com/Nawabali-project/Nawabali-BE/assets/157681548/51a80338-94f4-4de2-9b32-4bbf0868b54e)
|우리동네 인기글은?|여러동네의 인기들은?|카테고리별로 인기동네는?|
|:--:|:--:|:--:|
|![image](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/b7cff42b-ec6f-4379-a98b-a70a47e93859)|![image](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/4c64ec9f-d0ce-4795-abe4-447ecb868ca2)|![image](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/bf8f085b-a8f8-4695-a9bb-263742dc170e)|
    
- 동네소식에서 우리동네 인기글이 무엇일지 볼 수 있습니다.
- 동네소식에서 다른 여러동네들의 좋아요가 많은 인기글들을 볼 수 있습니다.
- 카테고리별로 인기있는 동네들을 볼 수 있습니다.



## ✅ 마이페이지
![프로필편집gif](https://github.com/Nawabali-project/Nawabali-BE/assets/157681548/a3d1ee19-9dbd-47fa-abaf-c3988913feef)
![회원정보변경짤](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/760e16b3-b3dc-44f7-a9c5-9d1c176b2d33)

- 마이페이지에서 회원 정보를 변경할 수 있습니다.
- 프로필 사진, 닉네임, 나의 지역을 변경할 수 있습니다.

![00마이페이지 _ 등록한 게시물 확인](https://github.com/Nawabali-project/Nawabali-BE/assets/157681548/675f6f3d-9bb0-45a4-b48a-8a434c64a190)
![본인게시물확인짤](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/f39b2b0b-85b2-4ca6-8e75-42d8b7ee871d)

- 마이페이지에서 내가 등록한 게시물들을 확인할 수 있습니다.

![북마크](https://github.com/Nawabali-project/Nawabali-BE/assets/157681548/85842426-1704-49a8-a8cc-4890a0e10e27)
![본인의 북마크짤](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/032dd71f-a49d-421f-b9bb-d3cebce953df)
- 마이페이지에서 내가 등록한 북마크된 게시물들을 볼 수 있습니다.

![본인등급확인짤](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/570cd66e-0d58-4494-86f9-530dc2a0cfe1)
- 마이페이지에서 나의 등급을 확인할 수 있습니다.
- 등급은 좋아요를 받은 수와 게시글 수를 기준으로 **"주민,토박이,터줏대감"** 으로 구분됩니다.

## ✅ 실시간 채팅/알림 기능

![채팅검색기능_1](https://github.com/Nawabali-project/Nawabali-BE/assets/157681548/c6cfc20b-0f15-49c0-8d29-32069b408b2e)
![알림짤](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/f3495696-4fa7-485c-a9fe-4791c814ce10)
- 채팅방이나 채팅메세지를 통한 검색이 가능합니다.

![채팅방 생성gif](https://github.com/Nawabali-project/Nawabali-BE/assets/157681548/015ca82d-64d5-4506-a4d4-48acec17a7da)
- 상대의 이름을 검색하여 채팅방을 생성 할 수 있습니다.

![채팅보내기_1](https://github.com/Nawabali-project/Nawabali-BE/assets/157681548/0f535f2f-efa4-44d2-b73a-20cd95968402)
![알림짤](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/a20de69c-9bba-4a81-a7c7-01ac8ba4c115)
- 1:1 대화를 할 수 있습니다.

![채팅알림](https://github.com/Nawabali-project/Nawabali-BE/assets/157681548/627afa58-a336-4168-b726-fff822b495fc)
![알림짤](https://github.com/Nawabali-project/Nawabali-BE/assets/105621255/f961b00c-b847-41a2-8d95-a8bcd19a6e8b)
- 메세지가 오면 상단에 알림으로 표시되어 어떤 페이지에 있어도 메세지가 왔음을 알 수 있습니다. 채팅을 확인하면 알림이 사라지게 됩니다.

<br>

  

<br><br>
## ⤴️ 성능 개선 (Lighthouse)

* #### 2024-04-24
![스크린샷 2024-05-01 235123](https://github.com/Nawabali-project/Nawabali-FE/assets/80045891/5f937f8d-3b2d-44ad-9be0-ec1b61fce0e9)

* #### 개선 사항
  * 동적 import로 첫 로딩시간 개선 (React.lazy)
  * 이미지 최적화로 속도 개선 (사이즈 조정 및 압축 / CLS / Lazy Loading / webp는 성능개선만 확인해보고 주석처리 )
  * meta 데이터 설정, console 제거 등 권장사항 준수

* #### 2024-05-05
![스크린샷 2024-05-06 220746](https://github.com/Nawabali-project/Nawabali-FE/assets/80045891/eef39892-3bbb-4344-b5cb-6cd24fc05fc9)




<img src="https://capsule-render.vercel.app/api?type=waving&color=0:85daff,180:6799fe&height=100&section=footer" />
