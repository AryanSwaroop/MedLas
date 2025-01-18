'use client';

import InputArea from "@/components/inputArea";
import ChatRoom from "./chatRoom";
import { useState } from "react";
import Loading from "@/components/loadingElement";
import clsx from "clsx";
import data from "@/app/data";

const Bot = () => {

    const classOfProblems = "text-black font-semibold mb-1 text-sm";
    const classOfButtons = "flex shadow-md shadow-amber-900 m-auto items-center flex-col justify-center bg-white text-black rounded-md w-28 h-22 p-2 hover:bg-amber-100 hover:text-white hover:border-white";

    const [replyAnswer, setReplyAnswer] = useState<string>("");

    const handleResult = (res: string): void => {
        setReplyAnswer(res);
    };

    const handlePreLoaded = (type : string): void => {
        setReplyAnswer("");
        
        setTimeout(async () => {
            if (type && data.hasOwnProperty(type)) {
            const reply = data[type];
            setReplyAnswer(await reply.body);
            }
        }, 1000 );

  }

    return (
        <>
            <InputArea getAnswerToParent={handleResult} />

            <div className="mt-24 grid grid-cols-2 gap-4 p-4 bg-amber-100 text-white font-sans text-center rounded-xl w-4/5 mx-auto">
                <button aria-placeholder="skin" className={clsx(classOfButtons)} onClick={(e) => handlePreLoaded(e.currentTarget.getAttribute("aria-placeholder") || "")} >
                    <div className="p-2 bg-amber-100 m-1 w-fit rounded-full">
                    <img src="/Newcosmetics.svg" className="co h-6 w-6" />
                    </div>
                    <p className={clsx(classOfProblems)}>Skin</p>
                </button>

                <button aria-placeholder="hair" className={clsx(classOfButtons)} onClick={(e) => handlePreLoaded(e.currentTarget.getAttribute("aria-placeholder") || "")} >  
                    <div className="p-2 bg-amber-100 m-1 w-fit rounded-full">
                    <img src="/Newhair.svg" className="h-6 w-6" />
                    </div>
                    <p className={clsx(classOfProblems)}>Hair</p>
                </button>

                <button aria-placeholder="body" className={clsx(classOfButtons)} onClick={(e) => handlePreLoaded(e.currentTarget.getAttribute("aria-placeholder") || "")} >
                    <div className="p-2 bg-amber-100 m-1 w-fit rounded-full">
                    <img src="/Newweight.svg" className="h-6 w-6" />
                    </div>
                    <p className={clsx(classOfProblems)}>Body</p>
                </button>

                <button aria-placeholder="eyes" className={clsx(classOfButtons)} onClick={(e) => handlePreLoaded(e.currentTarget.getAttribute("aria-placeholder") || "")} >
                    <div className="p-2 bg-amber-100 m-1 w-fit rounded-full">
                    <img src="/Neweyes.svg" className="h-6 w-6" />
                    </div>
                    <p className={clsx(classOfProblems)}>Eyes</p>
                </button>

                <button aria-placeholder="foot" className={clsx(classOfButtons)} onClick={(e) => handlePreLoaded(e.currentTarget.getAttribute("aria-placeholder") || "")} >
                    <div className="p-2 bg-amber-100 m-1 w-fit rounded-full">
                    <img src="/Newfoot.svg" className="h-6 w-6" />
                    </div>
                    <p className={clsx(classOfProblems)}>Foot</p>
                </button>

                <button aria-placeholder="aging" className={clsx(classOfButtons)} onClick={(e) => handlePreLoaded(e.currentTarget.getAttribute("aria-placeholder") || "")} >
                    <div className="p-2 bg-amber-100 m-1 w-fit rounded-full">
                    <img src="/aging.svg" className="h-6 w-6" />
                    </div>
                    <p className={clsx(classOfProblems)}>Aging</p>
                </button>
            </div>

            {!replyAnswer && <Loading />}
            {replyAnswer && <ChatRoom reply={replyAnswer} />}
        </>
    );
};

export default Bot;
