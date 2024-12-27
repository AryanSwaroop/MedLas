'use client';

import InputArea from "@/components/inputArea";
import styles from '../app/page.module.css';
import ChatRoom from "./chatRoom";
import { useState } from "react";
import Loading from "@/components/loadingElement";

const Bot = () => {

    const [replyAnswer , setReplyAnswer] = useState<string>("");

    const handleResult = (res : string) : void => {
        setReplyAnswer(res);
    }

    return (
        <>
        <InputArea getAnswerToParent={handleResult}/>
    
        <div className={styles.preBuildQuestions}>

            <div className={styles.buildTopics}>
                <button className={styles.TopicParts}>
                <p>Skin</p>
                </button>

                <button className={styles.TopicParts}>
                <p>Ageing</p>
                </button>

                <button className={styles.TopicParts}>
                <p>Hair Loss</p>
                </button>
            </div>

            <div className={styles.buildTopics}>
                <button className={styles.TopicParts}>
                <p>Weight Loss</p>
                </button>

                <button className={styles.TopicParts}>
                <p>Eyes Lips</p>
                </button>

                <button className={styles.TopicParts}>
                <p>Hand & Foot</p>
                </button>
            </div>

            <div className={styles.buildTopics}>
                <button className={styles.TopicParts}>
                <p>Face Feature</p>
                </button>
            </div>

        </div>

        <h1 className={styles.TextForm}>
            CHOOSE YOUR TOPIC
        </h1>
        {!replyAnswer && <Loading/>}
        { replyAnswer &&
        <ChatRoom reply={replyAnswer}/>}
        </>
    );
}

export default Bot;