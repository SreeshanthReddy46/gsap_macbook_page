import {useMediaQuery} from "react-responsive";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {useRef} from "react";

const Highlights = () => {
    const sectionRef = useRef(null);
    const isMobile = useMediaQuery({query: '(max-width: 1024px)'});

    useGSAP(() => {
        gsap.to(['.left-column', '.right-column'], {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: isMobile ? 'bottom bottom' : 'top center',
            },
            y: 0,
            opacity: 1,
            stagger: 0.5,
            duration: 1,
            ease: 'power1.inOut',
        });
    }, {scope: sectionRef, dependencies: [isMobile]});

    return (
        <section id="highlights" ref={sectionRef}>
            <h2>There is never been a better time to upgrade.</h2>
            <h3>Here is what you get with the new Macbook Pro......</h3>

            <div className="masonry">
                <div className="left-column">
                    <div>
                        <img src="/laptop.png" alt="Laptop" />
                        <p>Fly through demanding tasks upto 13x faster..</p>
                    </div>
                    <div>
                        <img src="/sun.png" alt="Sun" />
                        <p>A stunning <br />
                            Liquid retina <br />
                            XDR display..</p>
                    </div>
                </div>
                <div className="right-column">
                    <div className="apple-gradient">
                        <img src="/ai.png" alt="AI" />
                        <p>Built for <br />
                            <span>apple intellingence..</span></p>
                    </div>
                    <div>
                        <img src="/battery.png" alt="Battery" />
                        <p><span className="green-gradient">{ ' ' } 14 more hours{ ' ' }</span>
                        battery life
                        <span className="text-dark-100">{ ' ' }(upto 24 hours total)..</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Highlights
