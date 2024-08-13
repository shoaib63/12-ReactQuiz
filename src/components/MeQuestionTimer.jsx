import { useEffect } from "react";
import { useState } from "react"

export default function MeQuestionTimer({timeout , onTimeout , mode}) { 

    const [remainingTime , setRemainingTime] = useState(timeout); 

    useEffect(()=>{
        const timer =setTimeout(onTimeout , timeout);
        return ()=>{clearTimeout(timer);}
    },[timeout, onTimeout]);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setRemainingTime(pver => pver - 100);
        } , 100);

        return()=>{
            clearInterval(interval);
        }
    }, []);


    return(
        <progress
            id="question-time"
            max={timeout}
            value={remainingTime}
            className={mode}
        />
    )
}