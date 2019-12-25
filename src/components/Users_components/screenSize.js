// import React, { useLayoutEffect, useState } from 'react';

// function useWindowSize() {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener('resize', updateSize);
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
// }

// export default function ShowWindowDimensions(props) {
//   const [width, height] = useWindowSize();
//   if(width<800)
//   return "mobile"
// else
//   return "desktop";
// }