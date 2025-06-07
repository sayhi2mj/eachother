
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import AnimatedBackground from '@/components/AnimatedBackground';
import FlippingText from '@/components/FlippingText';
import Vapi from '@vapi-ai/web';

// IMPORTANT: Replace these with your actual Vapi credentials
const VAPI_PUBLIC_KEY = "1d5b02c4-ad03-469e-ba16-68446bf7c529";
const VAPI_AGENT_ID = "35bf7305-3ddf-4351-91f0-2a080d831793";

function App() {
  const [isCalling, setIsCalling] = useState(false);
  const [isVapiInitialized, setIsVapiInitialized] = useState(false);
  const vapiRef = useRef(null);

  const paragraphParts = [
    "growing your barbershop.",
    "growing your plumbing business.",
    "caring for your patients."
  ];

  useEffect(() => {
    if (VAPI_PUBLIC_KEY === 'YOUR_VAPI_PUBLIC_KEY' || VAPI_AGENT_ID === 'YOUR_VAPI_AGENT_ID') {
      toast({
        title: "Vapi Configuration Needed",
        description: "Please update VAPI_PUBLIC_KEY and VAPI_AGENT_ID in App.jsx with your credentials.",
        variant: "destructive",
        duration: 10000,
      });
    }
    
    const vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = vapiInstance;
    setIsVapiInitialized(true);

    vapiInstance.on('call-start', () => {
      setIsCalling(true);
      toast({
        title: "Call Started",
        description: "Connected to Vapi agent.",
        duration: 3000,
      });
    });

    vapiInstance.on('call-end', () => {
      setIsCalling(false);
      toast({
        title: "Call Ended",
        description: "Disconnected from Vapi agent.",
        duration: 3000,
      });
    });

    vapiInstance.on('error', (error) => {
      console.error('Vapi Error:', error);
      setIsCalling(false);
      toast({
        title: "Vapi Error",
        description: `An error occurred: ${error.message || 'Unknown error'}`,
        variant: "destructive",
        duration: 5000,
      });
    });
    
    return () => {
      vapiInstance.stop(); 
    };
  }, []);


  const handleCallToggle = () => {
    if (!isVapiInitialized || !vapiRef.current) {
      toast({
        title: "Vapi Not Ready",
        description: "Vapi SDK is not initialized yet. Please wait or check credentials.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (VAPI_PUBLIC_KEY === 'YOUR_VAPI_PUBLIC_KEY' || VAPI_AGENT_ID === 'YOUR_VAPI_AGENT_ID') {
       toast({
        title: "Vapi Configuration Needed",
        description: "Cannot start call. Please update VAPI_PUBLIC_KEY and VAPI_AGENT_ID in App.jsx.",
        variant: "destructive",
        duration: 7000,
      });
      return;
    }

    if (isCalling) {
      vapiRef.current.stop();
    } else {
      vapiRef.current.start(VAPI_AGENT_ID);
    }
  };

  useEffect(() => {
    if (isCalling) {
      document.body.classList.add('demo-active'); 
    } else {
      document.body.classList.remove('demo-active');
    }
  }, [isCalling]);

  return (
    <div className={`min-h-screen flex flex-col relative isolate`}>
      <AnimatedBackground isPlaying={isCalling} />
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full py-6 px-8 z-20" 
      >
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              key="logo-white-consistent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/a50c7a96-c16b-4e2d-8274-1a6a7ef12fe0/ad5be0c1e90192872c9e85a7aae32cb2.png" alt="VoiceAI Logo White" className="w-auto h-8" />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hidden md:flex space-x-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <a href="#about" className={`text-gray-600 hover:text-black transition-colors duration-300`}>About</a>
            <a 
              href="#contact" 
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                isCalling 
                  ? 'bg-black text-white hover:bg-gray-800 border border-gray-700' 
                  : 'bg-black text-white hover:bg-gray-800 border border-gray-200' 
              }`}
            >
              Contact
            </a>
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8 z-20"> 
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-5xl md:text-6xl font-bold mb-6 leading-tight gradient-text`}
          >
            AI-Powered. Always On.
            <br />
            Exceptionally Efficient.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed text-gray-600`}
          >
            <span>Your virtual assistant handles the busywork—so you can focus on </span>
            <FlippingText phrases={paragraphParts} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative flex justify-center items-center"
          >
            {isCalling && (
              <>
                <div className="absolute w-32 h-32 rounded-full border-2 border-gray-700 pulse-ring"></div>
                <div className="absolute w-32 h-32 rounded-full border-2 border-gray-600 pulse-ring" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute w-32 h-32 rounded-full border-2 border-gray-500 pulse-ring" style={{ animationDelay: '1s' }}></div>
              </>
            )}
            
            <Button
              onClick={handleCallToggle}
              style={isCalling ? { backgroundColor: '#ff3a76' } : {}}
              className={`demo-button w-24 h-24 rounded-full text-white border-4 shadow-2xl transition-colors duration-500 ${isCalling ? 'text-white hover:bg-pink-500 border-pink-700 float-animation' : 'bg-black hover:bg-gray-800 border-gray-200'}`}
              size="icon"
              disabled={!isVapiInitialized}
            >
              <motion.div
                key={isCalling ? 'pause' : 'play'}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {isCalling ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Phone className="w-8 h-8" />
                )}
              </motion.div>
            </Button>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`mt-8 text-lg text-gray-500`}
          >
            {isCalling ? 'Call in progress...' : 'Click to call AI Assistant'}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className={`text-center p-6 rounded-lg border transition-all duration-500 ${isCalling ? 'border-gray-700 bg-opacity-50 backdrop-blur-sm' : 'border-gray-200 hover:border-gray-400 bg-white/50 backdrop-blur-sm'}`} style={isCalling ? {backgroundColor: 'rgba(0,0,0,0.1)'} : {}}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-500 bg-black`}>
                <img-replace alt="Microphone Icon Feature" className={`w-6 h-6 filter brightness-0 invert`}/>
              </div>
              <h3 className={`text-lg font-semibold mb-2 text-black`}>Natural Speech</h3>
              <p className={`text-gray-600`}>Advanced speech recognition with human-like understanding</p>
            </div>

            <div className={`text-center p-6 rounded-lg border transition-all duration-500 ${isCalling ? 'border-gray-700 bg-opacity-50 backdrop-blur-sm' : 'border-gray-200 hover:border-gray-400 bg-white/50 backdrop-blur-sm'}`} style={isCalling ? {backgroundColor: 'rgba(0,0,0,0.1)'} : {}}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-500 bg-gray-800`}>
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h3 className={`text-lg font-semibold mb-2 text-black`}>Smart Responses</h3>
              <p className={`text-gray-600`}>Intelligent AI that learns and adapts to your needs</p>
            </div>

            <div className={`text-center p-6 rounded-lg border transition-all duration-500 ${isCalling ? 'border-gray-700 bg-opacity-50 backdrop-blur-sm' : 'border-gray-200 hover:border-gray-400 bg-white/50 backdrop-blur-sm'}`} style={isCalling ? {backgroundColor: 'rgba(0,0,0,0.1)'} : {}}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-500 bg-gray-600`}>
                <div className="w-3 h-3 bg-white rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h3 className={`text-lg font-semibold mb-2 text-black`}>Always Available</h3>
              <p className={`text-gray-600`}>24/7 assistance whenever you need it most</p>
            </div>
          </motion.div>
        </div>
      </main>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className={`w-full py-8 px-8 z-20 transition-all duration-500 ${isCalling ? 'border-t border-gray-800 bg-opacity-70 backdrop-blur-sm' : 'border-t border-gray-200 bg-white/70 backdrop-blur-sm'}`}
        style={isCalling ? {backgroundColor: 'rgba(0,0,0,0.2)'} : {}}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className={`text-gray-500`}>© ${new Date().getFullYear()} VoiceAI. All rights reserved.</span>
          <div className="flex space-x-6">
            <span className={`text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-300`}>Privacy</span>
            <span className={`text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-300`}>Terms</span>
            <span className={`text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-300`}>Support</span>
          </div>
        </div>
      </motion.footer>

      <Toaster />
    </div>
  );
}

export default App;
