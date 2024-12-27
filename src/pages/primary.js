import React, { createContext, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './key.css';
import TArea from '../components/textarea';
import Title from '../components/title';
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
export const ParentDivContext = createContext();

export default function PrimaryPage() {
    const navigate = useNavigate();
    const { key: api_key } = useParams();
    const masterContainerRef = useRef(null); // Create a ref for the container
    useEffect(() => {
        // Initial animation (page fade-in)
        gsap.fromTo(masterContainerRef.current, { opacity: 0, y: 0, filter: "blur(20px)" }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", filter: "blur(0px)" });
    }, []);



    return (
        <ParentDivContext.Provider value={masterContainerRef}>
            {/* Primary Container */}
            <div
                ref={masterContainerRef} // Attach the ref
                className="h-screen w-screen bg-white flex flex-col justify-center items-center"
                id="master-container"
            >

                <Title />
                <TArea apiKey={api_key} />
            </div>

            <div id="ts-container" className='flex flex-col h-screen w-screen justify-center items-center'>
                <div className="flex opacity-75">
                    <h1 class="text-4xl font-extrabold tracking-tight">Text</h1>
                    <h1 class="text-4xl font-medium tracking-tight">Front</h1>
                </div>
                <p className='w-2/5 text-center mt-2 opacity-60'>Sorry! we currently only support desktops and laptops. 😭</p>
            </div>
        </ParentDivContext.Provider>
    )
}




