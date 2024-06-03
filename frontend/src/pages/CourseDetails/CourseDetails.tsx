// import { useEffect, useRef, useState } from "react";
// import './CourseDetails.css'

// const CourseDetails : React.FC = ()=>{

// const headings: string[] = [
//     '',
//     'Use your calendar as a todo list',
//     'Color your calendar to organize',
//     'Instantly know if someone is available',
//     'Track what you listen to when',
//     'Send scheduling links guests love',
//     'Always know what your team is up to',
//     ''
//   ];
//     const [activeIndex, setActiveIndex] = useState<number>(0);
//     const headingRefs = useRef<(HTMLDivElement | null)[]>([]);
//     const helper = useRef<(HTMLDivElement | null)>(null);
//     const [data,setData] = useState('');

//     useEffect(() => {
//       const observer = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//               const index = headingRefs.current.indexOf(entry.target as HTMLDivElement);
//               setActiveIndex(index);
//               setData(headings[index]);
//             }
//           });
//         },
//         {
//           threshold: 0.5,
//           rootMargin: "-300px 0px -300px 0px"
//         }
//       );

//       headingRefs.current.forEach((ref) => {
//         if (ref) observer.observe(ref);
//       });

//       return () => {
//         headingRefs.current.forEach((ref) => {
//           if (ref) observer.unobserve(ref);
//         });
//       };
//     }, []);

//     return (
//       <>
//         <div className="container">
//           {headings.map((heading, index) => (
//             <div
//               key={index}
//               ref={(el) => (headingRefs.current[index] = el)}
//               className={`heading ${index === activeIndex ? 'active' : ''}`}
//               style={{
//                 border: "2px solid black",
//                 padding: "30px"
//               }}
//             >
//               {heading}
//             </div>
//           ))}
//         </div>
//         <div style={{
//           border: "1px solid black",
//           height: "100px",
//           width: "400px",
//           position: "fixed",
//           bottom:"250px",
//           left:"200px"
//         }} ref={helper}>
//           {data}
//         </div>
//       </>
//     );
// }

// export default CourseDetails;

import React, { useEffect, useRef, useState } from "react";
import './CourseDetails.css';
import courseMoudluesDetails from "../../data/courseMoudluesDetails.json";
import { nanoid } from "nanoid";

const CourseDetails: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const headingRefs = useRef<(HTMLDivElement | null)[]>([]);
    const helper = useRef<HTMLDivElement | null>(null);
    const { innerHeight: height } = window;
    const newHeight = (height / 2)-70;
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = headingRefs.current.indexOf(entry.target as HTMLDivElement);
                        setActiveIndex(index);
                        console.log(courseMoudluesDetails[index]);
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: `-${newHeight}px 0px -${newHeight}px 0px`
            }
        );

        headingRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            headingRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (
        <>
            <div className="container">
                {courseMoudluesDetails.map((module, index) => (
                    <div
                        key={index}
                        ref={(el) => (headingRefs.current[index] = el)}
                        className={`heading ${index === activeIndex ? 'active' : ''}`}
                        style={{
                            border: "2px solid black",
                            padding: "30px"
                        }}
                    >
                        {module.title}
                    </div>
                ))}
            </div>
            <div
                style={{
                    border: "1px solid black",
                    height: "100px",
                    width: "400px",
                    position: "fixed",
                    bottom: `${newHeight}px`,
                    left: "200px"
                }}
                ref={helper}
            >
                <h2>bottom</h2>
                {(activeIndex && activeIndex > 0 && activeIndex < 9) ?
                    <>
                        {courseMoudluesDetails[activeIndex].heading}
                        {
                            courseMoudluesDetails[activeIndex].topics?.map((topic) =>
                                <p key={nanoid()}>+ {topic}</p>
                            )
                        }
                    </> :
                    <></>
                }
            </div>
            <div
                style={{
                    border: "1px solid black",
                    height: "100px",
                    width: "400px",
                    position: "fixed",
                    top: `${newHeight}px`,
                    left: "200px"
                }}
                ref={helper}
            >
                <h2>top</h2>
                {(activeIndex && activeIndex > 0 && activeIndex < 9) ?
                    <>
                        {courseMoudluesDetails[activeIndex].heading}
                        {
                            courseMoudluesDetails[activeIndex].topics?.map((topic) =>
                                <p key={nanoid()}>+ {topic}</p>
                            )
                        }
                    </> :
                    <></>
                }
            </div>
        </>
    );
};

export default CourseDetails;
