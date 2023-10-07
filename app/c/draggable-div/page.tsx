import React from "react";
// import DraggableDiv from "./DraggableDiv";
import DraggableDiv2 from "./DraggableDiv2";

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-4">Draggable Div Example</h1>
      {/* <DraggableDiv /> */}
      <DraggableDiv2 />
    </div>
  );
}
