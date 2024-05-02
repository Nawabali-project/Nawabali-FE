<img src="https://capsule-render.vercel.app/api?type=waving&color=0:85daff,100:6799fe&height=180&text=동네방네&animation=&fontColor=ffffff&fontSize=70" />

![동네방네 브로셔이미지_2](https://github.com/Nawabali-project/Nawabali-FE/assets/80045891/04580244-b863-4ccc-a356-f513ba0c5a50)

* 🔗 사이트: https://www.dongnaebangnae.com/
* 📆 개발 기간: 2024.03.26 ~ 2024.05.06 (총 6주)
* 🌱 기획 의도: 줄어든 동네 주민들과의 유대감 회복 + 동네에 대한 애정 증가


<br><br>
## 🧑🏻‍💻👩🏻‍💻 FE 팀원
<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/inhachoi">최경일</a><br />
        <img src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/387265705_688108082998779_5231387308078165349_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=VqkETrfmL_EQ7kNvgEz6-fE&edm=AGXveE0BAAAA&ccb=7-5&oh=00_AfAokniF-Ao9PXx3EFNym1c8mseIwhiJYnrkuLYkRZ5aaA&oe=66382C92&_nc_sid=cf751b" width="200px;" alt=""/><br />
         돈가스 좋아해요? <br />
        </td>
      <td align="center">
        <a href="https://github.com/1roo">하나래</a><br />
        <img src="https://scontent-ssn1-1.cdninstagram.com/v/t51.12442-15/69368022_980938318926608_4714438118412745851_n.jpg?stp=c0.398.1024.1024a_dst-jpg_e35_s150x150&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=YjyM_2KJLjcQ7kNvgGYoJvc&edm=AGXveE0BAAAA&ccb=7-5&oh=00_AfANWQdR07IR3pkt-AVZfkHDuHN0o4KrN9koCeWCXOnnyw&oe=66343A24&_nc_sid=cf751b" width="200px;" alt=""/><br />
         아침 먹고 자는 여자 <br />
        </td>
    </tr>
  </tbody>
</table>


<br><br>
## 🛠 Architecture
![ServiceArchitecture - Page 1 (1)](https://github.com/Nawabali-project/Nawabali-FE/assets/80045891/544a2684-a5ff-4759-8617-1f3c8de7ea36)


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
  <img src="https://img.shields.io/badge/GitHub%20Actions-232F3E?style=for-the-badge&logo=GitHubActions&logoColor=2088FF"/>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <br>
</div>

<br><br>
## 🔎 주요기능

<details>
<summary>🌟 간단한 로그인 및 회원가입</summary>
* 로컬 로그인 / 회원가입 (이메일 인증기능)
* 소셜 로그인 (kakao)
</details>
  
🌟 꾸며진 전체 지도 한눈에 확인
* 지도 API 연동 (kakao)
* 게시물 작성시 해당위치에 게시물이 놓아짐
* 지역 / 카테고리 별로 이동 및 분류 가능

🌟 리스트로 나열된 게시글 한눈에 확인
* 지역 / 카테고리 별로 분류 가능

🌟 게시물 CRUD
* 게시물 작성은 본인 동네에만 작성 가능

🌟 댓글 CRUD
* 댓글을 통해 사람들과 소통

🌟 주민추천 / 좋아요 / 북마크 기능
* 주민추천은 게시물이 작성된 동네의 주민만 클릭 가능
* 좋아요는 외부주민도 클릭 가능
* 북마크를 통해 맘에드는 게시물 저장해두기

🌟 상대적인 동네별 활동점수 확인을 통해 경쟁유도
* 서울시 25개 구를 경계선으로 나누고 클릭시 점수를 쉽게 확인할 수 있게함
* '구'별 주민추천 수 + 게시물 수로 점수 측정
* 점수가 상대적으로 높은 지역일수록 색을 진하게 표시
* 해당 구에 가장 많은 게시물 카테고리가 사진으로 뜸

🌟 인기글들을 편하게 보라고 모아준 동네뉴스 페이지
* 자동 및 수동으로 동적으로 동작하는 화면으로 편하게 확인
* 지역별로 일주일간 사람들이 가장 많이 찾은 게시글들 확인
* 본인 지역의 인기 게시글 확인
* 다른 지역의 인기 게시글 확인
* 카테고리별로 인기많은 동네와 해당 게시글 확인

🌟 마이페이지에서 레벨 확인 및 간편한 정보관리
* 프로필 사진에 레벨에 따른 귀여운 모자 표시 (주민 / 토박이 / 터줏대감 )
* 다양한 개인정보 수정 가능 ( 닉네임, 거주지역, 프로필 사진 ...)
* 내가 쓴 게시물과 북마크해둔 게시물 확인 가능

🌟 유저와 실시간 통신
* 1:1 실시간으로 익명의 유저와 소통

🌟 빠르고 간편한 검색
* 게시물 내용으로 빠른 검색 가능
  

<br><br>
## ⤴️ 성능 개선 (Lighthouse)

* #### 2024-04-24
![스크린샷 2024-05-01 235123](https://github.com/Nawabali-project/Nawabali-FE/assets/80045891/5f937f8d-3b2d-44ad-9be0-ec1b61fce0e9)

* #### 개선 사항
  * 동적 import로 첫 로딩시간 개선 (React.lazy)
  * 이미지 최적화로 속도 개선 (사이즈 조정 및 압축 / CLS / Lazy Loading / Pre Loading )

* #### 2024-05-01
![스크린샷 2024-05-01 235255](https://github.com/Nawabali-project/Nawabali-FE/assets/80045891/6086b80d-3303-4223-858f-c9256937e268)



<img src="https://capsule-render.vercel.app/api?type=waving&color=0:85daff,180:6799fe&height=100&section=footer" />
