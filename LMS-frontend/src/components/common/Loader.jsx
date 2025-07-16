import React from 'react'

const Loader = ({fullscreen = true}) => {
  return <div className={`${fullscreen ? "h-[100vh]" : ""} flex justify-center items-center gap-2`}>
      <div className="animate-bounce p-4 w-4 h-4 bg-gray-900 rounded-full" style={{ animationDelay: "0ms" }} />
      <div className="animate-bounce p-4 w-4 h-4 bg-gray-900 rounded-full" style={{ animationDelay: "200ms" }} />
      <div className="animate-bounce p-4 w-4 h-4 bg-gray-900 rounded-full" style={{ animationDelay: "400ms" }} />
    </div>;
}

export default Loader
