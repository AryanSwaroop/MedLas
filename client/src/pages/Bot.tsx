'use client';

import InputArea from "@/components/inputArea";
import ChatRoom from "./chatRoom";
import { useState } from "react";
import Loading from "@/components/loadingElement";
import clsx from "clsx";

const Bot = () => {

    const classOfProblems = "text-black font-semibold mb-1 text-sm";
    const classOfButtons = "flex shadow-sm shadow-black m-auto items-center flex-col justify-center bg-white text-black  border-black rounded-full w-20 h-20 p-2 hover:bg-amber-100 hover:text-white hover:border-white";

    const [replyAnswer, setReplyAnswer] = useState<string>("");

    const handleResult = (res: string): void => {
        setReplyAnswer(res);
    };

    return (
        <>
            <InputArea getAnswerToParent={handleResult} />

            <div className="mt-20 grid grid-cols-2 gap-4 p-4 bg-amber-800 shadow-sm shadow-amber-800 text-white font-sans text-center rounded-xl w-4/5 mx-auto">
                <button className={clsx(classOfButtons)}>
                    <p className={clsx(classOfProblems)}>Skin</p>
                    <img src="/Newcosmetics.svg" className="h-8 w-8" />
                </button>

                <button className={clsx(classOfButtons)}>                   
                    <p className={clsx(classOfProblems)}>Clean</p>
                    <img src="/Newskin.svg" className="h-8 w-8" />
                </button>

                <button className={clsx(classOfButtons)}>
                    <p className={clsx(classOfProblems)}>Hair</p>
                    <img src="/Newhair.svg" className="h-8 w-8" />
                </button>

                <button className={clsx(classOfButtons)}>
                    <p className={clsx(classOfProblems)}>Body</p>
                    <img src="/Newweight.svg" className="h-8 w-8" />
                </button>

                <button className={clsx(classOfButtons)}>
                    <p className={clsx(classOfProblems)}>Eyes</p>
                    <img src="/Neweyes.svg" className="h-8 w-8" />
                </button>

                <button className={clsx(classOfButtons)}>
                    <p className={clsx(classOfProblems)}>Foot</p>
                    <img src="/Newfoot.svg" className="h-8 w-8" />
                </button>

                <button className={clsx(classOfButtons)}>
                    <p className={clsx(classOfProblems)}>Face</p>
                    <img src="/face.svg" className="h-8 w-8" />
                </button>

                <button className={clsx(classOfButtons)}>
                    <p className={clsx(classOfProblems)}>Aging</p>
                    <img src="/aging.svg" className="h-8 w-8" />
                </button>
            </div>

            {!replyAnswer && <Loading />}
            {replyAnswer && <ChatRoom reply={replyAnswer} />}
        </>
    );
};

export default Bot;
