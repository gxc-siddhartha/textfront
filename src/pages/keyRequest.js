import React, { useEffect, useRef, useState } from 'react';
import './key.css';
import { motion } from 'motion/react';
import { useNavigate } from "react-router-dom";
import { gsap } from 'gsap'; // Import GSAP for animation


export default function KeyRequestPage() {
    const navigate = useNavigate();
    const pageRef = useRef(null);

    const [api_key, updateApi] = useState("");

    // Animation function for page transition
    const handleNavigate = () => {
        if (!(api_key === "" || api_key.length < 30)) {
            gsap.to(pageRef.current, {
                opacity: 0,
                y: 0,
                filter: "blur(10px)",
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    navigate(`/primary/${api_key}`); // Append api_key directly to the route
                    console.log(`/primary/${api_key}`);
                },
            });
        } else {
            alert("Enter a valid API Key");
        }
    };


    const handleApiKeyText = (event) => {
        updateApi(event.target.value);
    }

    useEffect(() => {
        // Initial animation (page fade-in)
        gsap.fromTo(pageRef.current, { opacity: 0, y: -50, filter: "blur(10px)" }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", filter: "blur(0px)" });
    }, []);

    return (
        <div ref={pageRef} className="h-screen w-screen flex items-center justify-center">
            <div className="flex opacity-75 flex-col items-center">
                <h1 className="text-4xl font-extrabold tracking-tight">Authentication</h1>
                <p className='text-center mt-2 opacity-60 w-2/3'>
                    Please provide your ChatGPT API key so we can verify your access to the model in use.
                </p>
                <input value={api_key} onChange={handleApiKeyText} className='mt-3 w-2/3 bg-whiteSmoke rounded-xl border border-frenchGrey border-opacity-20 focus:outline-none p-3' type='text' />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 px-4 py-3 bg-black text-white rounded-xl text-sm"
                    type="button"
                    value={api_key}
                    onClick={handleNavigate} // Trigger the GSAP animation and route change
                >
                    Verify
                </motion.button>
            </div>
        </div>
    );
}
