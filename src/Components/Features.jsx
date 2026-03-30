import {Canvas} from "@react-three/fiber";
import StudioLights from "./three/StudioLights.jsx";
import {features, featureSequence} from "../Constants/index.js";
import clsx from 'clsx';
import {Suspense, useEffect, useRef} from "react";
import {Html} from "@react-three/drei";
import {useMediaQuery} from "react-responsive";
import MacbookModel from "./models/Macbook.jsx";
import useMacbookStore from "../store/index.js";
import {useGSAP} from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const ModelScroll = ({sectionRef}) => {
    const groupRef = useRef(null);
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)'});
    const { setTexture } = useMacbookStore();

    useEffect(() =>{
        featureSequence.forEach((feature)=>{
            const v = document.createElement('video');

            Object.assign(v, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: 'auto',
                crossOrigin: 'anonymous',
            });
            v.load();
        })
    }, []);

    useGSAP(()=>{
        const modelTimeLine = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true,
            }
        });
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top center',
                end: 'bottom top',
                scrub: 1,
            }
        })
        if(groupRef.current){
            modelTimeLine.to(groupRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut' })
        }

        featureSequence.forEach(({videoPath, boxClass, delay}) => {
            timeline
                .call(() => setTexture(videoPath))
                .to(boxClass, { opacity: 1, y: 0, delay });
        });
    }, {scope: sectionRef});
    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase">Loading........</h1></Html>}>
                <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
            </Suspense>
        </group>
    )
}

const Features = () => {
    const sectionRef = useRef(null);

    return (
        <section id="features" ref={sectionRef}>
            <h2>See it all in a new light.</h2>

            <Canvas id="f-canvas" camera={{ position: [0, 0, 5], fov: 45 }}>
                <StudioLights />
                <ambientLight intensity={0.5} />
                <ModelScroll sectionRef={sectionRef} />
            </Canvas>

            <div className="absolute inset-0">
                {features.map((feature, index) => (
                    <div key={feature.id} className={clsx('box', `box${index + 1}`, feature.styles )}>
                        <img src={feature.icon} alt={feature.highlight} />
                        <p>
                            <span className="text-white" >{feature.highlight}</span>
                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Features
