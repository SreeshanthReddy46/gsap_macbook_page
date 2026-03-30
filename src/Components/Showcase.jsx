import {useMediaQuery} from "react-responsive";
import {useGSAP} from "@gsap/react";
import gsap from 'gsap';

const Showcase = () => {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
    useGSAP(() =>{
        if (!isTablet){
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#showcase',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true,
                }
            });
            timeline.to('.mask img', {
                transform: 'scale(1.1)',
            }).to('.content', { opacity: 1, y: 0, ease: 'power1.in' });
        }
    }, [isTablet])

    return (
        <section id="showcase">
            <div className="media">
                <video src="/videos/game.mp4" loop muted autoPlay playsInline />
                <div className="mask">
                    <img src="/mask-logo.svg" alt={"Mask logo"} />
                </div>
            </div>

            <div className="content">
                <div className="wrapper">
                    <div className="lg:max-w-md">
                        <h2>Rocket chip</h2>

                        <div className="space-y-5 mt-7 pe-10">
                            <p>
                                Introducing {" "}
                                <span className="text-white">
                                    M4, the next generation of Apple silicon
                                </span>
                                .M4 powers
                            </p>
                            <p>
                                AI apps on Mac. Born to run. Mac is optimised to handle the world’s most advanced AI apps. Run image generation apps like DiffusionBee, LLM apps like Msty Studio and LM Studio, and video enhancement apps like Topaz Video.
                            </p>
                            <p>
                                AI tools in apps. Mac makes magic. With Logic Pro, you can transform vocals with AI plug-ins like MicDrop. And in Adobe Photoshop, you can make complex image modifications in seconds using the Generative Fill feature.
                            </p>
                            <p className="text-primary">
                                Learn more about apple intelligence........
                            </p>
                        </div>
                    </div>
                    <div className="max-w-3xs space-y-14">
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>4X faster</h3>
                            <p>pro rendering performance than M2</p>
                        </div>
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>1.5X faster</h3>
                            <p>CPU performance than M2</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Showcase
