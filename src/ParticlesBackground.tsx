import './App.css';
import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // Slim bundle includes polygon shape and links

function ParticlesBackground() {
    const [init, setInit] = useState(false);

    // Initialize particles engine
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine); // Make sure slim or full is loaded
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        console.log("Particles container loaded", container);
    }, []);

    // Define the Polygon Preset Configuration using useMemo
    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: "#f3f4f5",
                    // value: "rgb(18, 20, 19)", // A darker background often looks good
                },
            },
            fpsLimit: 150,
            interactivity: {
                events: {
                    onClick: {
                        // enable: true, // Keep click interaction if desired
                        mode: "push",
                    },
                    onHover: {
                        // enable: true, // Keep hover interaction if desired
                        mode: "repulse", // Repulse particles on hover
                    },
                    resize: {
                      enable: true
                    }
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 150, // Smaller repulse distance
                        duration: 0.4,
                    },
                    // Bubble mode removed as it's not the primary goal now
                },
            },
            particles: {
                color: {
                  // value: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#F6AE2D", "#FFFFFF"],
                //   value: "black",
                    value: "#2e2f30", // Color of the polygons
                    // value: particleColor,  // rgb(58, 58, 58)
                },
                // collisions: {
                //   enable: true,
                //   mode: "bounce"
                // },
                move: {
                    direction: "none",
                    enable: true,     // Enable particle movement
                    outModes: {
                        default: "out",
                    },
                    // random: true,    // Randomize movement direction
                    speed: 1,        // Slow floating speed
                    straight: false, // Particles move in non-straight lines
                },
                number: {
                    density: {
                        enable: true,
                        area: 2000,
                        // area: 1600,     // Adjust density based on canvas size
                    },
                    value: 6,         // Number of polygons
                },
                opacity: {
                  value: {min: 0.04, max: 0.06 }, // <<< Low and variable opacity
                    // value: 0.5,       // Base opacity of polygons
                },
                shape: {
                    // type: "polygon",
                    type: "circle",  // <<< --- Key change: Use polygon shape
                    options: {
                        polygon: {
                           sides: 5    // <<< --- Number of sides (e.g., 5 for pentagons)
                           // You can also use 'nb_sides' depending on exact version/config style
                        }
                    }
                     /* // Alternative older configuration style for sides:
                     */
                     /* // Optional: Add a stroke (outline) to the polygons
                     stroke: {
                         width: 1,
                         color: {
                             value: "#ffffff"
                         }
                     }
                     */
                },
                size: {
                    value: { min: 150, max: 220 }, // Size range for polygons
                    // animation: {
                    //     enable: true,
                    //     // speed: 50,
                    //     // minimumValue: 2000,
                    //     sync: true, // makes all particles pulse in sync for calm vibe
                    //   }
                    // random: true, // Deprecated, use value: {min, max} instead
                },
            },
            detectRetina: true,
        }),
        [], // Memoize options
    );

    if (!init) {
        return null; // Wait for initialization
    }

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options} // Pass the polygon options
        />
    )
}

export default ParticlesBackground
