// import React from 'react';

// declare global {
//   interface Window {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     daum: any;
//   }
// }

// interface IAddr {
//   address: string;
//   zonecode: string;
// }

// const KaKaoAddr: React.FC = () => {
//   const onClickAddr = () => {
//     new window.daum.Postcode({
//       oncomplete: function (data: IAddr) {
//         const addrInput = document.getElementById('addr') as HTMLInputElement;
//         const zipNoInput = document.getElementById('zipNo') as HTMLInputElement;

//         if (addrInput && zipNoInput) {
//           addrInput.value = data.address;
//           zipNoInput.value = data.zonecode;
//           const addrDetailInput = document.getElementById('addrDetail');
//           if (addrDetailInput) addrDetailInput.focus();
//         }
//       },
//     }).open();
//   };

//   return (
//     <>
//       <div>우리 동네 주소</div>
//       <div>
//         <input
//           id="addr"
//           type="text"
//           readOnly
//           onClick={onClickAddr}
//           placeholder="주소 검색하기"
//         />
//         <button onClick={onClickAddr}>검색</button>
//       </div>

//       <input id="zipNo" type="text" readOnly placeholder="우편번호" />
//     </>
//   );
// };

// export default KaKaoAddr;
