import { useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors"
import React, { useCallback } from 'react'

const Live = () => {
    const others = useOthers();
    const [{cursor},updateMyPresence] = useMyPresence() as any;

    const handlePonterMove = useCallback((event:React.PointerEvent)=>{
        event.preventDefault();
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({cursor:{x,y}});

    },[])

    const handlePointerLeave = useCallback((event:React.PointerEvent)=>{
        event.preventDefault();
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({cursor:null, message:null});

    },[])

    const handlePointerDown = useCallback((event:React.PointerEvent)=>{
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        updateMyPresence({cursor:{x,y}});

    },[])

  return (
    <div
        onPointerMove={handlePonterMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        
        className="h-[100vh] w-full flex justify-center items-center text-center"

    >
        <h1 className=" text-5xl">hi</h1>
        <LiveCursors others = {others}/>
    </div>
  )
}

export default Live