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

        <div className={styles.TopicContainer}>
        <h1 className={styles.TextForm}>
            CHOOSE TOPIC
        </h1>
        </div>
    
        <div className={styles.preBuildQuestions}>

                <button className={styles.TopicParts}>
                <p>Skin</p>
                <img src="/cosmetics.svg" className={styles.svgStyles}/>
                </button>

                <button className={styles.TopicParts}>
                <p>Ageing</p>
                <img src="/skin.svg" className={styles.svgStyles}/>
                </button>

                <button className={styles.TopicParts}>
                <p>Hair Loss</p>
                <img src="/hair.svg" className={styles.svgStyles}/>
                </button>
            
                <button className={styles.TopicParts}>
                <p>Weight Loss</p>
                <img src="/weight.svg" className={styles.svgStyles}/>
                </button>

                <button className={styles.TopicParts}>
                <p>Eyes Lips</p>
                <img src="/eyes.svg" className={styles.svgStyles}/>
                </button>

                <button className={styles.TopicParts}>
                <p>Hand & Foot</p>
                <img src="/foot.svg" className={styles.svgStyles}/>
                </button>
  
                <button className={styles.TopicParts}>
                <p>Face Feature</p>
                <img src="/face.svg" className={styles.svgStyles}/>
                </button>

        </div>


        {!replyAnswer && <Loading/>}
        { replyAnswer && 
        <ChatRoom reply={replyAnswer}/>}
        </>
    );
}

export default Bot;