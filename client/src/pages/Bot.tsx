'use client';

import InputArea from "@/components/inputArea";
import ChatRoom from "./chatRoom";
import { useState } from "react";
import Loading from "@/components/loadingElement";

const Bot = () => {
    const [replyAnswer, setReplyAnswer] = useState<string>("");

    const handleResult = (res: string): void => {
        setReplyAnswer(res);
    };

    return (
        <>
            <InputArea getAnswerToParent={handleResult} />

            <div className="flex flex-col items-center mt-6">
                <h1 className="text-white mt-20 text-2xl font-semibold">CHOOSE TOPIC</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-red-500 shadow-[0_3px_12px_#cc0000] text-white font-sans text-center transition-shadow duration-300 rounded-xl w-4/5 mx-auto my-6">
                <button className="flex items-center justify-between bg-white text-black border border-black rounded-md p-2 hover:bg-red-400 hover:text-white hover:border-white">
                    <p>Skin</p>
                    <img src="/cosmetics.svg" className="h-8 w-8" />
                </button>

                <button className="flex items-center justify-between bg-white text-black border border-black rounded-md p-2 hover:bg-red-400 hover:text-white hover:border-white">
                    <p>Ageing</p>
                    <img src="/skin.svg" className="h-8 w-8" />
                </button>

                <button className="flex items-center justify-between bg-white text-black border border-black rounded-md p-2 hover:bg-red-400 hover:text-white hover:border-white">
                    <p>Hair Loss</p>
                    <img src="/hair.svg" className="h-8 w-8" />
                </button>

                <button className="flex items-center justify-between bg-white text-black border border-black rounded-md p-2 hover:bg-red-400 hover:text-white hover:border-white">
                    <p>Weight Loss</p>
                    <img src="/weight.svg" className="h-8 w-8" />
                </button>

                <button className="flex items-center justify-between bg-white text-black border border-black rounded-md p-2 hover:bg-red-400 hover:text-white hover:border-white">
                    <p>Eyes Lips</p>
                    <img src="/eyes.svg" className="h-8 w-8" />
                </button>

                <button className="flex items-center justify-between bg-white text-black border border-black rounded-md p-2 hover:bg-red-400 hover:text-white hover:border-white">
                    <p>Hand & Foot</p>
                    <img src="/foot.svg" className="h-8 w-8" />
                </button>

                <button className="flex items-center justify-between bg-white text-black border border-black rounded-md p-2 hover:bg-red-400 hover:text-white hover:border-white">
                    <p>Face Feature</p>
                    <img src="/face.svg" className="h-8 w-8" />
                </button>
            </div>

            {!replyAnswer && <Loading />}
            {replyAnswer && <ChatRoom reply={replyAnswer} />}
        </>
    );
};

export default Bot;
