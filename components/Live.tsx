import { useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors"
import React, { use, useCallback, useState,useEffect } from 'react'
import CursorChat from "./cursor/CursorChat";
import { CursorMode } from "@/types/type";

const Live = () => {
    const others = useOthers();
    const [{cursor},updateMyPresence] = useMyPresence() as any;

    const [cursorState, setCursorState] = useState({
        mode:CursorMode.Hidden
    });

    const handlePonterMove = useCallback((event:React.PointerEvent)=>{
        event.preventDefault();
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({cursor:{x,y}});

    },[])

    const handlePointerLeave = useCallback((event:React.PointerEvent)=>{
        setCursorState({mode:CursorMode.Hidden});
        updateMyPresence({cursor:null, message:null});

    },[])

    const handlePointerDown = useCallback((event:React.PointerEvent)=>{
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({cursor:{x,y}});

    },[])

    useEffect(()=>{
        const onKeyUp = (event:KeyboardEvent) => {
            if(event.key === '/'){
                setCursorState({
                    mode:CursorMode.Chat,
                    previousMessage: null,
                    message:''
                
                })
            }
            else if(event.key === 'Escape'){
                updateMyPresence({message:null});
                setCursorState({mode:CursorMode.Hidden});
            }
        }

        const onKeyDown = (event:KeyboardEvent) => {
            if(event.key === '/'){
                event.preventDefault();
                
            }
        }

        window.addEventListener('keyup',onKeyUp);
        window.addEventListener('keydown',onKeyDown);

        return () => {
            window.removeEventListener('keyup',onKeyUp);
            window.removeEventListener('keydown',onKeyDown);
        }

    },[updateMyPresence])

  return (
    <div
        onPointerMove={handlePonterMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        
        className="h-[100vh] w-full flex justify-center items-center text-center"

    >
        <h1 className=" text-5xl">hi</h1>
        {cursor && (
            <CursorChat
                cursor={cursor} 
                cursorState={cursorState}
                setCursorState={setCursorState}
                updateMyPresence={updateMyPresence}
             /> 

        )}
        <LiveCursors others = {others}/>

    </div>
  )
}

export default Live