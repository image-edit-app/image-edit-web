// export default function CategoryCardComponent({img}) {
//     return (
//          <div className="w-56 h-56 bg-white rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
//             <img
//                 src={img}
//                 className="object-cover w-full h-full"
//             />
//         </div>
//     );
// }
// export default function CategoryCardComponent({ img }) {
//   return (
//     <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square bg-white rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
//       <img
//         src={img}
//         className="object-cover w-full h-full"
//       />
//     </div>
//   );
// }
export default function CategoryCardComponent({ img }) {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <img
        src={img}
        alt="Template"
        className="object-cover w-full h-48"  // fixed height instead of aspect-square
      />
    </div>
  );
}
