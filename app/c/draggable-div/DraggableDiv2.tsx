'use client';
import { useRef, useState, MouseEvent, useEffect } from "react";

export default function DraggableDiv2() {
  const [isDragging, setIsDragging] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const offsetX = useRef<number>(0);
  const offsetY = useRef<number>(0);
  const [lastX, setLastX] = useState<number>(0);
  const [lastY, setLastY] = useState<number>(0);

  function handleMouseMove(e: MouseEvent){
    if (!isDragging || !divRef.current) return;
    const left = e.clientX - offsetX.current;
    const top = e.clientY - offsetY.current;

    const maxX = window.innerWidth - divRef.current.clientWidth;
    const maxY = window.innerHeight - divRef.current.clientHeight;

    const clampedLeft = Math.min(Math.max(0, left), maxX);
    const clampedTop = Math.min(Math.max(0, top), maxY);

    setLastX(clampedLeft);
    setLastY(clampedTop);
  };
  
  useEffect(() => {

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      divRef.current.style.cursor = 'default';
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      divRef.current.style.cursor = 'move';
    };
  }, [isDragging]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (divRef.current) {
      offsetX.current = e.clientX - divRef.current.getBoundingClientRect().left;
      offsetY.current = e.clientY - divRef.current.getBoundingClientRect().top;
    }
  };

  return (
    <div
      ref={divRef}
      className={`absolute w-32 h-32 bg-green-400 text-white flex justify-center items-center p-5 rounded-lg select-none ${isDragging ? "cursor-move" : "cursor-default"}`}
      onMouseDown={handleMouseDown}
      style={{
        left: `${lastX}px`,
        top: `${lastY}px`,
      }}
    >
      DraggableDiv2
    </div>
  );
}
