import {Fragment, useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import {performanceImages, performanceImgPositions} from "../Constants/index.js";

const Performance = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const paragraph = section?.querySelector(".content p");
        const mm = gsap.matchMedia();

        if (!section || !paragraph) {
            return undefined;
        }

        gsap.fromTo(paragraph, {
            autoAlpha: 0,
            y: 40,
        }, {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "top 45%",
                scrub: true,
                invalidateOnRefresh: true,
            },
        });

        mm.add("(min-width: 1025px)", () => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "bottom 35%",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });

            performanceImgPositions
                .filter(({id}) => id !== "p5")
                .forEach(({id, left, right, bottom, transform}) => {
                    timeline.to(`.${id}`, {
                        ...(left !== undefined ? {left: `${left}%`} : {}),
                        ...(right !== undefined ? {right: `${right}%`} : {}),
                        ...(bottom !== undefined ? {bottom: `${bottom}%`} : {}),
                        ...(transform ? {transform} : {}),
                        ease: "none",
                    }, 0);
                });
        });

        return () => {
            mm.revert();
            ScrollTrigger.refresh();
        };
    }, {scope: sectionRef});

    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphic performance. Game On</h2>
            <div className="wrapper">
                {performanceImages.map(({id, src}) => (
                    <img key={id} className={id} src={src} alt={id} />
                ))}
            </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with responsiveness that keeps up with your imagination. Each chip in the M5 family features a GPU with enhanced shader cores and a third-generation ray‑tracing engine, <Fragment></Fragment>
                    <span className="text-white" >so 3D modelling is crisper and clearer than ever. </span>And Dynamic Caching optimises on-chip memory to significantly increase GPU utilisation — driving huge performance boosts for pro apps and games.
                </p>
            </div>
        </section>
    )
}
export default Performance
