import React from "react";
import Hero from "../Hero/Hero";
import FeatureCard from "../FeatureCard/FeatureCard";
import Chatbot from "../chatbot/Chatbot";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      color: "hover:shadow-[0_0_26px_20px_rgba(219,234,254,1)]",
      btntext: "Get Started",
      title: "Fact Checker",
      description: "Verify the authenticity of written content",
      image: "/src/assets/text.jpg",
      onClick: () => navigate("/news"), // Navigate to "news"
    },
    {
      color: "hover:shadow-[0_0_26px_20px_rgba(220,252,231,1)]",
      btntext: "Start Analysis",
      title: "Image Inspector",
      description: "Detect tampered or manipulated images",
      image: "/src/assets/photo.jpg",
      onClick: () => navigate("/photos"), // Navigate to "photos"
    },
    {
      color: "hover:shadow-[0_0_26px_20px_rgba(234,232,255,1)]",
      btntext: "Analyze Now",
      title: "Deepfake Detector",
      description: "Identify and expose fake or altered videos",
      image: "/src/assets/video.jpg",
      onClick: () => navigate("/videos"), // Navigate to "videos"
    },
  ];

  return (
    <div className="static min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </main>
      <div className="fixed bottom-16 right-10 justify-self-end">
        <Chatbot />
      </div>
    </div>
  );
}
