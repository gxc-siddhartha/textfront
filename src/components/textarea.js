import React, { useState, useSyncExternalStore } from 'react';
import { motion } from "motion/react";
import axios from 'axios';
import Lottie from "lottie-react";     // Ensure the lottie-react package is installed
import loader from "../assets/anims/loader.json";


export default function Textarea() {
    const [text, setText] = useState("");
    const [charLength, setCharLength] = useState(0);
    const [wordLength, setWordLength] = useState(0);
    const [spaces, setSpaces] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");

    const [minRead, updateMin] = useState("");

    const calculateReadingTime = (inputText) => {
        const words = inputText.trim().split(/\s+/); // Split text by spaces
        const wordCount = words.length;
        const avgReadingSpeed = 200; // Words per minute
        const time = wordCount / avgReadingSpeed; // Time in minutes
        const timeMinutes = Math.floor(time);
        const timeSeconds = Math.round((time - timeMinutes) * 60);
        const displayTime = `${timeMinutes} min and ${timeSeconds} sec`;
        updateMin(displayTime); // Format to 2 decimal places
    };

    const convertToUpperCase = () => {

        const upperText = text.toUpperCase();
        setText(upperText);
    };

    const convertToLowerCase = () => {

        const lowerText = text.toLowerCase();
        setText(lowerText);
    };


    const handleOnType = (event) => {
        const newText = event.target.value;

        // Update the text state
        setText(newText);

        // Calculate character length
        setCharLength(newText.length);

        // Calculate word length
        const words = newText.trim().split(/\s+/); // Handles extra spaces
        setWordLength(newText.trim() === "" ? 0 : words.length);

        // Calculate spaces
        setSpaces(newText.length - newText.replaceAll(" ", "").length);

        calculateReadingTime(newText);
    };

    const getSummaryFromGemini = async (text) => {
        setSummary("");
        setLoading(true);
        const data = {
            contents: [
                {
                    parts: [
                        {
                            text: "Please provide a brief (under 150 words) summary of what this paragraph is saying and all the key points that we shouldn't miss here. The paragraph is " + text
                        }
                    ]
                }
            ]
        };

        axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA2DX1H2YgkZwJG6w1Y-Hw-1i3wz-5grd0',
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                maxBodyLength: 500
            }
        )
            .then(response => {
                console.log(response.data); // Log the response data to inspect the structure
                if (response.data && response.data.candidates && response.data.candidates.length > 0) {
                    const text = response.data.candidates[0].content.parts[0].text;
                    setSummary(text);
                } else {
                    setSummary("No summary available.");
                }
                setLoading(false);
            })
            .catch(error => {
                setSummary("Can't get an actual summary 😭!");
                console.error(error);
                setLoading(false);
            });

    };

    return (
        <>
            <div className="w-2/4 static bg-whiteSmoke rounded-xl mt-4">
                {text.length === 0 ? <div className='h-11'></div> : <div className="flex  place-content-between items-center pl-3">
                    {(text === "" || minRead === "0 min and 0 sec") ? <p></p> : <div className="flex gap-2">
                        <p className="font-bold mr-1 text-slate text-sm">Reading Time</p>
                        <p className="font-medium font-mono mr-1 text-slate text-sm text-pastelBlack">{minRead}</p>
                    </div>}


                    <div className="flex place-content-end items-center py-2 px-2 gap-2">
                        <motion.div
                            whileHover={{ scale: 1.01, }}
                            whileTap={{ scale: 0.95 }}

                            onClick={() => convertToUpperCase()} // Pass as an arrow function
                            className="flex gap-2 h-7 p-1 object-contain rounded-lg hover:bg-platinum opacity-65 hover:opacity-75 hover:cursor-pointer"
                        >
                            <p className="text-sm">Upper Case</p>
                            <img
                                src="https://img.icons8.com/material-two-tone/512/monospaced-font.png"
                                alt=""
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.01, }}
                            whileTap={{ scale: 0.95 }}

                            onClick={() => convertToLowerCase()} // Pass as an arrow function
                            className="flex gap-2 h-7 p-1 object-contain rounded-lg hover:bg-platinum opacity-65 hover:opacity-75 hover:cursor-pointer"
                        >
                            <p className="text-sm">Lower Case</p>
                            <img
                                src="https://img.icons8.com/material-outlined/512/lowercase-2.png"
                                alt=""
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.01, }}
                            whileTap={{ scale: 0.95 }}

                            onClick={() => setText("")} // Undo functionality
                            className="flex gap-2 h-7 p-1 object-contain rounded-lg hover:bg-platinum opacity-65 hover:opacity-90 hover:cursor-pointer"
                        >
                            <p className="text-sm">Clear</p>
                            <img
                                src="https://img.icons8.com/material-sharp/512/undo.png"
                                alt=""
                            />
                        </motion.div>
                    </div>
                </div>}


                <textarea
                    className="w-full
            bg-transparent
            text-base 
            text-pastelBlack
            h-32
            p-3
            focus:outline-none 

            border-t    
            border-platinum
            resize-none"
                    value={text}
                    onChange={handleOnType}
                    placeholder="Enter your paragraph"
                ></textarea>
            </div>

            <div className="w-2/4 mt-4 flex gap-3 items-center place-content-between">
                <div className="actions">
                    <p className="font-bold mr-1 text-slate text-sm">Characters</p>
                    <p className="font-medium mr-1 text-sm">{charLength}</p>
                </div>
                <div className="actions">
                    <p className="font-bold mr-1 text-slate text-sm">Words</p>
                    <p className="font-medium mr-1 text-sm">{wordLength}</p>
                </div>
                <div className="actions">
                    <p className="font-bold mr-1 text-slate text-sm">Spaces</p>
                    <p className="font-medium mr-1 text-sm">{spaces}</p>
                </div>
            </div>

            {isLoading ?
                <motion.div
                    className='flex flex-row mt-3 w-2/4 bg-whiteSmoke justify-center items-center rounded-xl  border border-platinum border-opacity-50'>
                    <Lottie animationData={loader} loop={true} className='h-10 w-10' />
                </motion.div>
                :
                <motion.div
                    whileHover={{ scale: 1.03, opacity: '90%', cursor: 'pointer' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => getSummaryFromGemini(text)}
                    className='flex flex-row mt-3 w-2/4 bg-whiteSmoke justify-center items-center py-2 rounded-xl  border border-platinum border-opacity-80'>
                    <p>Get Summary by</p>
                    <p className='font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ml-1 tracking-tight'>AI</p>
                </motion.div>
            }
            {summary.length === 0 ? <p></p> : <div className='w-2/4 flex mt-4 flex-col'>
                <h1 className='text-2xl font-bold tracking-tight mb-1'>Summary</h1>
                <hr />
                <p className='mt-1 text-pastelBlack opacity-85'>{summary}</p>
            </div>}


        </>
    );
}
