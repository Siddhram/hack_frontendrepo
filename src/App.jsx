import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const navigate=useNavigate();

  return (
    <>
       <section class="py-10 bg-white sm:py-16 lg:py-10">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Al That Fights Misinformation</h2>
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Detect fake news, manipulated photos, and deepfake videos in seconds</p>
        </div>

        <div class="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-x-16 gap-y-12">
                <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
  <a href="#" title="" class="block">
    <img
      class="object-cover w-full h-48 rounded-t-lg"
      src="https://images.unsplash.com/photo-1709285671842-cc2a67ac0a1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZha2UlMjBuZXd6fGVufDB8fDB8fHww"
      alt="Blog Image"
    />
  </a>
  <div class="p-6 text-center">
    <p class="text-lg font-bold text-gray-800">
Fact Checker    </p>
    <p class="mt-4 font-semibold text-sm text-gray-600">
      verify the Authenticity of written content
    </p>
    <div class="mt-6">
      <button
onClick={()=>{
  navigate("/news")
}}          class="inline-block px-6 py-2 text-sm font-medium text-white bg-sky-500 rounded-full shadow hover:bg-sky-600 transition-colors duration-300"
      >
        Get Started
      </button>
    </div>
  </div>
</div>

               <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
  <a href="#" title="" class="block">
    <img
      class="object-cover w-full h-48 rounded-t-lg"
      src="https://plus.unsplash.com/premium_photo-1707487484371-b2e87ec211b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZha2UlMjBpbWFnZSUyMGFsZXJ0fGVufDB8fDB8fHww"
      alt="Blog Image"
    />
  </a>
  <div class="p-6 text-center">
    <p class="text-lg font-bold text-gray-800">
      Image Inspector
    </p>
    <p class="mt-4 text-sm font-semibold text-gray-600">
      Detect Tempered or manipulated images
    </p>
    <div class="mt-6">
      <button
onClick={()=>{
  navigate("/images")
}}          class="inline-block px-6 py-2 text-sm font-medium text-white bg-sky-500 rounded-full shadow hover:bg-sky-600 transition-colors duration-300"
      >
        Start Analysis
      </button>
    </div>
  </div>
</div>

       {/*  */}
       <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
  <a href="#" title="" class="block">
    <img
      class="object-cover w-full h-48 rounded-t-lg"
      src="https://images.unsplash.com/photo-1499162789000-cd6061f57622?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZha2UlMjB2aWRlbyUyMGFsZXJ0fGVufDB8fDB8fHww"
      alt="Blog Image"
    />
  </a>
  <div class="p-6 text-center">
    <p class="text-lg font-bold text-gray-800">
      Deepfake Detector
    </p>
    <p class="mt-4 text-sm font-semibold text-gray-600">
      Identify and expose fake or altered videos
    </p>
    <div class="mt-6">
      <button
onClick={()=>{
  navigate("/videos")
}}        class="inline-block px-6 py-2 text-sm font-medium text-white bg-sky-500 rounded-full shadow hover:bg-sky-600 transition-colors duration-300"
      >
        Analyze Now
      </button>
    </div>
  </div>
</div>

       {/*  */}
<div class="max-w-sm mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
  <a href="#" title="" class="block">
    <img
      class="object-cover w-full h-48 rounded-t-lg"
      src="https://plus.unsplash.com/premium_photo-1707487484371-b2e87ec211b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZha2UlMjBpbWFnZSUyMGFsZXJ0fGVufDB8fDB8fHww"
      alt="Blog Image"
    />
  </a>
  <div class="p-6 text-center">
    <p class="text-lg font-bold text-gray-800">
Transcript analysis    </p>
    <p class="mt-4 text-sm font-semibold text-gray-600">
      Detect Tempered or manipulated images
    </p>
    <div class="mt-6">
      <button
onClick={()=>{
  navigate("/transcript")
}}          class="inline-block px-6 py-2 text-sm font-medium text-white bg-sky-500 rounded-full shadow hover:bg-sky-600 transition-colors duration-300"
      >
        Transcript Analysis
      </button>
    </div>
  </div>
</div>

        </div>
    </div>
    {/* <div className="relative m-16">
  <div
    className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 rounded-full bg-blue-500 shadow-lg flex items-center justify-center cursor-pointer"
   >
    <img
      src="https://plus.unsplash.com/premium_photo-1708939062088-3e624bc6615d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFrZSUyMG5ld3pzJTIwZGV0ZWN0aW9ufGVufDB8fDB8fHww" // Replace with your image URL
      alt="Button Icon"
      className="w-10 h-10 rounded-full"
    />
  </div>
</div> */}

<div className="relative m-10 mb-15">
  {/* Circular Button */}
  <a href={'http://fact-shield.vercel.app'} >
<div
    className="absolute top-1/2 right-4 transform -translate-y-1/2 w-18 h-18 rounded-full bg-blue-500 shadow-lg flex items-center justify-center cursor-pointer"
  >
    <img
      src="https://plus.unsplash.com/premium_photo-1708939062088-3e624bc6615d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFrZSUyMG5ld3pzJTIwZGV0ZWN0aW9ufGVufDB8fDB8fHww" // Replace with your image URL
      alt="Button Icon"
      className="w-14 h-14 rounded-full"
    />
  </div>
  </a>
  
</div>

</section>
{/* https://plus.unsplash.com/premium_photo-1708939062088-3e624bc6615d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFrZSUyMG5ld3pzJTIwZGV0ZWN0aW9ufGVufDB8fDB8fHww */}


    </>
  )
}

export default App
