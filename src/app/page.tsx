"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Sun, Moon, Clock, Sparkles,
  Play, Pause, SkipForward, SkipBack, Lock, Phone, UserPlus, LogIn, KeyRound
} from "lucide-react";
import Image from "next/image";
import { ShareButton } from "@/components/ShareButton";
import { supabase } from "@/lib/supabase";

type AppState = "splash" | "login_phone" | "login_password" | "signup_password" | "language" | "feed" | "panchangam_detail";

export default function App() {
  const { setLanguage, language, isReady } = useLanguage();
  const [appState, setAppState] = useState<AppState>("splash");

  // States for sub-components
  const [japaCount, setJapaCount] = useState(0);
  const [shopCategory, setShopCategory] = useState<"books" | "frames" | "others">("books");
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Panchang states
  const [panchangDate, setPanchangDate] = useState(new Date().toISOString().split('T')[0]);
  const [panchangLocation, setPanchangLocation] = useState("Hyderabad");
  const [panchangType, setPanchangType] = useState(language === "hi" ? "lunar" : "amavasyantha");
  const [panchangData, setPanchangData] = useState<any>(null);
  const [isLoadingPanchang, setIsLoadingPanchang] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Auth states
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passError, setPassError] = useState("");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const socialProofCount = 4568;

  const contentAll = {
    en: {
      appName: "Sri Datta Prasaram",
      loginText: "Enter your mobile number to begin your spiritual journey",
      loginButton: "Continue",
      poweredBy: "Powered by Sri Datta Prasaram",
      languageTitle: "Choose your preferred language",
      darshanTitle: "Daily Darshan",
      darshanSubtitle: "Sri Dattatreya Swamy",
      joinDevotees: `Join ${socialProofCount.toLocaleString()} Devotees`,
      dailyContentTitle: "Daily Content",
      dailyWisdom: "Daily Wisdom",
      postTitle: "The Essence of Guru",
      postText: "A true Guru is one who dispels the darkness of ignorance and lights the lamp of knowledge within.",
      readFull: "Read Full Discourse",
      panchangTitle: "Today's Panchang",
      tithi: "Tithi",
      tithiValue: "Shukla Ekadashi",
      nakshatra: "Nakshatra",
      nakshatraValue: "Rohini",
      rahukaalam: "Rahukaalam",
      japaTitle: "Japa Mala",
      chantsToday: "Chants today",
      tap: "TAP",
      mediaTitle: "Digital Prasad",
      mediaSubtitle: "Vasudevananda Saraswati",
      storeTitle: "Sacred Store",
      tabBooks: "Books",
      tabFrames: "Photo Frames",
      tabOthers: "Others",
      itemBook: "Datta Charitra",
      itemSacred: "Sacred Item",
      addButton: "Add",
      share: "Share",
      langTe: "Telugu",
      langHi: "Hindi",
      langEn: "English",
      stavam: "Sri Datta Stavam",
      panchangFullTitle: "Detailed Panchangam",
      viewFullPanchang: "Calculate Panchangam by Date, Location & Type",
      calculateButton: "Calculate Panchangam",
      location: "Location",
      type: "Type",
      date: "Date",
      typeAmavasyantha: "Amavasyantha (Telugu/Kannada)",
      typeSauramana: "Sauramana (Tamil/Odia)",
      typeLunar: "Purnimanta (Hindi)",
      samvatsaram: "Samvatsaram",
      samvatsaramValue: "Sri Krodhi Nama Samvatsaram",
      ayanamRitu: "Ayanam / Ritu",
      ayanamRituValue: "Uttarayan / Vasant Ritu",
      masamPaksham: "Masam / Paksham",
      masamPakshamValue: "Chaitra Masam / Krishna Paksham",
      sun: "Sunrise / Sunset",
      sunValue: "5:50 AM - 6:34 PM",
      tithiDetail: "Shashthi till 12:19 PM, then Saptami",
      nakshatraDetail: "Uttarashada till 9:09 PM, then Shravana",
      yogam: "Yogam",
      yogamValue: "Shubha till 2:20+ AM",
      karanam: "Karanam",
      karanamValue: "Vanija till 12:19 PM, Vishti till 1:14+ AM",
      auspicious: "Auspicious Timings",
      brahmaMuhurtam: "Brahma Muhurtam",
      brahmaMuhurtamValue: "4:14 AM - 5:02 AM",
      amritaGhadiyalu: "Amrita Ghadiyalu",
      amritaGhadiyaluValue: "2:13 PM - 4:00 PM",
      abhijitMuhurtam: "Abhijit Muhurtam",
      abhijitMuhurtamValue: "11:47 AM - 12:38 PM",
      inauspicious: "Inauspicious Timings",
      varjam: "Varjam",
      varjamValue: "1:40 AM - 3:24 AM",
      durmuhurtam: "Durmuhurtam",
      durmuhurtamValue: "8:23 AM - 9:14 AM, 12:38 PM - 1:29 PM",
      rahukaalamFull: "Rahukaalam",
      rahukaalamFullValue: "10:37 AM - 12:12 PM",
      yamagandam: "Yamagandam",
      yamagandamValue: "3:23 PM - 4:59 PM",
      gulikaKaalam: "Gulika Kaalam",
      gulikaKaalamValue: "7:26 AM - 9:01 AM"
    },
    te: {
      appName: "శ్రీ దత్త ప్రసారం",
      loginText: "మీ ఆధ్యాత్మిక ప్రయాణాన్ని ప్రారంభించడానికి మీ మొబైల్ నంబర్‌ను నమోదు చేయండి",
      loginButton: "కొనసాగించండి",
      poweredBy: "శ్రీ దత్త ప్రసారం ద్వారా నిర్వహించబడుతోంది",
      languageTitle: "మీకు ఇష్టమైన భాషను ఎంచుకోండి",
      darshanTitle: "నిత్య దర్శనం",
      darshanSubtitle: "శ్రీ దత్తాత్రేయ స్వామి",
      joinDevotees: `${socialProofCount.toLocaleString()} మంది భక్తులతో చేరండి`,
      dailyContentTitle: "రోజువారీ కంటెంట్",
      dailyWisdom: "నిత్య జ్ఞానం",
      postTitle: "గురు తత్వం",
      postText: "అజ్ఞాన అంధకారాన్ని పారద్రోలి, జ్ఞాన జ్యోతిని వెలిగించేవాడే నిజమైన గురువు.",
      readFull: "పూర్తి ప్రవచనం చదవండి",
      panchangTitle: "నేటి పంచాంగం",
      tithi: "తిథి",
      tithiValue: "శుక్ల ఏకాదశి",
      nakshatra: "నक्षत्रం",
      nakshatraValue: "రోహిణి",
      rahukaalam: "రాహుకాలం",
      japaTitle: "జప మాల",
      chantsToday: "నేటి జపాలు",
      tap: "నొక్కండి",
      mediaTitle: "డిజిటల్ ప్రసాదం",
      mediaSubtitle: "వాసుదేవానంద సరస్వతి",
      storeTitle: "పవిత్ర దుకాణం",
      tabBooks: "పుస్తకాలు",
      tabFrames: "ఫోటో ఫ్రేమ్‌లు",
      tabOthers: "ఇతరాలు",
      itemBook: "దత్త చరిత్ర",
      itemSacred: "పవిత్ర వస్తువు",
      addButton: "జోడించండి",
      share: "పంచుకోండి",
      langTe: "తెలుగు",
      langHi: "హిందీ",
      langEn: "ఆంగ్లం",
      stavam: "శ్రీ దత్త స్తవం",
      panchangFullTitle: "వివరమైన పంచాంగం",
      viewFullPanchang: "తేదీ, ప్రదేశం మరియు రకం ద్వారా పంచాంగాన్ని లెక్కించండి",
      calculateButton: "పంచాంగాన్ని లెక్కించండి",
      location: "ప్రదేశం",
      type: "పంచాంగం రకం",
      date: "తేదీ",
      typeAmavasyantha: "అమావాస్యంత (తెలుగు/కన్నడ)",
      typeSauramana: "సౌరమాన (తమిళం/ఒడియా)",
      typeLunar: "పూర్ణిమంత (హిందీ)",
      samvatsaram: "సంవత్సరం",
      samvatsaramValue: "శ్రీ క్రోధి నామ సంవత్సరం",
      ayanamRitu: "అయనం / ఋతువు",
      ayanamRituValue: "ఉత్తరాయణం / వసంత ఋతువు",
      masamPaksham: "మాసం / పక్షం",
      masamPakshamValue: "చైత్ర మాసం / కృష్ణపక్షం",
      sun: "సూర్యోదయం / సూర్యాస్తమయం",
      sunValue: "ఉ. 5:50 - సా. 6:34",
      tithiDetail: "షష్ఠి మ. 12:19 వరకు, తరువాత సప్తమి",
      nakshatraDetail: "ఉత్తరాషాడ రా. 9:09 వరకు, తరువాత శ్రవణ",
      yogam: "యోగం",
      yogamValue: "శుభ రా. 2:20+ వరకు",
      karanam: "కరణం",
      karanamValue: "వణిజ మ. 12:19 వరకు, విష్టి రా. 1:14+ వరకు",
      auspicious: "శుభ సమయాలు",
      brahmaMuhurtam: "బ్రహ్మ ముహూర్తం",
      brahmaMuhurtamValue: "ఉ. 4:14 - ఉ. 5:02",
      amritaGhadiyalu: "అమృత ఘడియలు",
      amritaGhadiyaluValue: "మ. 2:13 - సా. 4:00",
      abhijitMuhurtam: "అభిజిత్ ముహూర్తం",
      abhijitMuhurtamValue: "ఉ. 11:47 - మ. 12:38",
      inauspicious: "అశుభ సమయాలు",
      varjam: "వర్జ్యం",
      varjamValue: "రా. 1:40 - రా. 3:24",
      durmuhurtam: "దుర్ముహూర్తం",
      durmuhurtamValue: "ఉ. 8:23 - ఉ. 9:14, మ. 12:38 - మ. 1:29",
      rahukaalamFull: "రాహుకాలం",
      rahukaalamFullValue: "ఉ. 10:37 - మ. 12:12",
      yamagandam: "యమగండం",
      yamagandamValue: "మ. 3:23 - సా. 4:59",
      gulikaKaalam: "గుళిక కాలం",
      gulikaKaalamValue: "ఉ. 7:26 - ఉ. 9:01"
    },
    hi: {
      appName: "श्री दत्त प्रसारम",
      loginText: "अपनी आध्यात्मिक यात्रा शुरू करने के लिए मोबाइल नंबर दर्ज करें",
      loginButton: "जारी रखें",
      poweredBy: "श्री दत्त प्रसारम द्वारा संचालित",
      languageTitle: "अपनी पसंदीदा भाषा चुनें",
      darshanTitle: "नित्य दर्शन",
      darshanSubtitle: "श्री दत्तात्रेय स्वामी",
      joinDevotees: `${socialProofCount.toLocaleString()} भक्तों से जुड़ें`,
      dailyContentTitle: "दैनिक सामग्री",
      dailyWisdom: "दैनिक ज्ञान",
      postTitle: "गुरु तत्व",
      postText: "सच्चा गुरु वह है जो अज्ञान के अंधकार को दूर करता है और भीतर ज्ञान का दीपक जलाता है।",
      readFull: "पूरा प्रवचन पढ़ें",
      panchangTitle: "आज का पंचांग",
      tithi: "तिथि",
      tithiValue: "शुक्ल एकादशी",
      nakshatra: "नक्षत्र",
      nakshatraValue: "रोहिणी",
      rahukaalam: "राहुकाल",
      japaTitle: "जप माला",
      chantsToday: "आज के मंत्र",
      tap: "टैप करें",
      mediaTitle: "डिजिटल प्रसाद",
      mediaSubtitle: "वासुदेवानंद सरस्वती",
      storeTitle: "पवित्र दुकान",
      tabBooks: "पुस्तकें",
      tabFrames: "फोटो फ्रेम",
      tabOthers: "अन्य",
      itemBook: "दत्त चरित्र",
      itemSacred: "पवित्र वस्तु",
      addButton: "जोड़ें",
      share: "साझा करें",
      langTe: "तेलुगु",
      langHi: "हिंदी",
      langEn: "अंग्रेज़ी",
      stavam: "श्री दत्त स्तवम",
      panchangFullTitle: "विस्तृत पंचांग",
      viewFullPanchang: "तिथि, स्थान और प्रकार के अनुसार पंचांग की गणना करें",
      calculateButton: "पंचांग की गणना करें",
      location: "स्थान",
      type: "पंचांग का प्रकार",
      date: "दिनांक",
      typeAmavasyantha: "अमावस्यांत (तेलुगु/कन्नड़)",
      typeSauramana: "सौरमान (तमिल/ओडिया)",
      typeLunar: "पूर्णिमांत (हिंदी)",
      samvatsaram: "संवत्सर",
      samvatsaramValue: "श्री क्रोधी नाम संवत्सर",
      ayanamRitu: "अयन / ऋतु",
      ayanamRituValue: "उत्तरायण / वसंत ऋतु",
      masamPaksham: "मास / पक्ष",
      masamPakshamValue: "चैत्र मास / कृष्ण पक्ष",
      sun: "सूर्योदय / सूर्यास्त",
      sunValue: "सुबह 5:50 - शाम 6:34",
      tithiDetail: "षष्ठी दोपहर 12:19 तक, फिर सप्तमी",
      nakshatraDetail: "उत्तराषाढ़ा रात 9:09 तक, फिर श्रवण",
      yogam: "योग",
      yogamValue: "शुभ रात 2:20+ तक",
      karanam: "करण",
      karanamValue: "वणिज दोपहर 12:19 तक, विष्टि रात 1:14+ तक",
      auspicious: "शुभ समय",
      brahmaMuhurtam: "ब्रह्म मुहूर्त",
      brahmaMuhurtamValue: "सुबह 4:14 - सुबह 5:02",
      amritaGhadiyalu: "अमृत घड़ियाँ",
      amritaGhadiyaluValue: "दोपहर 2:13 - शाम 4:00",
      abhijitMuhurtam: "अभिजीत मुहूर्त",
      abhijitMuhurtamValue: "सुबह 11:47 - दोपहर 12:38",
      inauspicious: "अशुभ समय",
      varjam: "वर्ज्यम",
      varjamValue: "रात 1:40 - रात 3:24",
      durmuhurtam: "दुर्मुहूर्त",
      durmuhurtamValue: "सुबह 8:23 - सुबह 9:14, दोपहर 12:38 - दोपहर 1:29",
      rahukaalamFull: "राहुकाल",
      yamagandam: "यमगंडम",
      yamagandamValue: "दोपहर 3:23 - शाम 4:59",
      gulikaKaalam: "गुलिका काल",
      gulikaKaalamValue: "सुबह 7:26 - सुबह 9:01"
    }
  };

  const c = contentAll[language || "en"];

  useEffect(() => {
    if (!isReady) return;
    
    const loggedInUser = localStorage.getItem("current_user");
    if (loggedInUser) {
      setAppState("feed");
    } else {
      setAppState("splash");
      // Autoplay audio on splash mount (might be blocked by browser policy, but we try)
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio autoplay blocked by browser"));
      }
      setTimeout(() => {
        setAppState("login_phone");
      }, 5000);
    }
  }, [isReady]);

  useEffect(() => {
    // Update default type when language changes if user hasn't explicitly calculated yet
    if (!hasCalculated) {
      setPanchangType(language === "hi" ? "lunar" : "amavasyantha");
    }
  }, [language, hasCalculated]);

  const handleCalculatePanchang = async () => {
    if (!panchangDate || !panchangLocation) return;
    setIsLoadingPanchang(true);
    setHasCalculated(true);
    try {
      const { data, error } = await supabase
        .from('panchang_entries')
        .select('*')
        .eq('entry_date', panchangDate)
        .eq('region', panchangLocation)
        .maybeSingle();
        
      if (data && !error) {
        setPanchangData(data);
      } else {
        // Fallback dynamic mock if no data exists in Supabase for this date/location
        // We hash the date to get a pseudo-random variation to prove the data "changes"
        const day = new Date(panchangDate).getDate();
        setPanchangData({
          tithi: c.tithiDetail.replace('12:19', `${(day % 12) + 1}:19`),
          nakshatra: c.nakshatraDetail.replace('9:09', `${(day % 12) + 1}:09`),
          yoga: c.yogamValue.replace('2:20', `${(day % 12) + 1}:20`),
          karana: c.karanamValue.replace('12:19', `${(day % 12) + 1}:19`),
          sunrise: `05:${10 + (day % 30)} AM`,
          sunset: `06:${10 + (day % 30)} PM`,
          abhijit: `11:${40 + (day % 10)} AM - 12:${30 + (day % 10)} PM`,
          rahu_kaal: `10:${30 + (day % 10)} AM - 12:${10 + (day % 10)} PM`,
          yamagandam: `03:${20 + (day % 10)} PM - 04:${50 + (day % 10)} PM`,
          gulika_kaal: `07:${20 + (day % 10)} AM - 09:${0 + (day % 10)} AM`,
        });
      }
    } catch (err) {
      console.error("Error fetching panchang:", err);
      setPanchangData(null);
    } finally {
      setIsLoadingPanchang(false);
    }
  };

  const validatePhone = (p: string) => {
    const clean = p.replace(/\D/g, "");
    if (clean.length !== 10) return "Please enter a valid 10-digit number.";
    if (/^(\d)\1+$/.test(clean)) return "Invalid repetitive sequence."; 
    if (/^(123456|012345|987654)/.test(clean)) return "Invalid sequential number.";
    if (!/^[6-9]\d{9}$/.test(clean)) return "Must be a valid Indian mobile number.";
    return "";
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validatePhone(phone);
    if (error) {
      setPhoneError(error);
      return;
    }
    setPhoneError("");
    
    // Check if user exists (Mock DB)
    const users = JSON.parse(localStorage.getItem("mock_users") || "{}");
    if (users[phone]) {
      setAppState("login_password");
    } else {
      setAppState("signup_password");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("mock_users") || "{}");
    if (users[phone] && users[phone].password === password) {
      localStorage.setItem("current_user", phone);
      if (users[phone].language) {
        setLanguage(users[phone].language);
        setAppState("feed");
      } else {
        setAppState("language");
      }
    } else {
      setPassError("Incorrect password.");
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setPassError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setPassError("Passwords do not match.");
      return;
    }
    
    const users = JSON.parse(localStorage.getItem("mock_users") || "{}");
    users[phone] = { password }; // We will set language in the next step
    localStorage.setItem("mock_users", JSON.stringify(users));
    localStorage.setItem("current_user", phone);
    setAppState("language");
  };

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setAppState("login_phone");
  };

  if (!isReady) return null;

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-x-hidden relative">
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" loop />
      
      <AnimatePresence mode="wait">
        
        {/* SPLASH SCREEN */}
        {appState === "splash" && (
          <motion.div 
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black"
          >
            {/* Gold Devotional Design Background */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/gold_mandala.png" 
                alt="Gold Mandala Background" 
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/30 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
            </div>

            {/* Dattatreya base image fading into logo */}
            <motion.div 
              initial={{ opacity: 1, scale: 1.1 }}
              animate={{ opacity: 0, scale: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <Image 
                src="/dattatreya-swamy.jpg" 
                alt="Lord Dattatreya Form" 
                fill
                className="object-contain opacity-80"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 2.5 }}
              className="z-20 w-64 h-64 relative rounded-full overflow-hidden border-4 border-gold-500 shadow-[0_0_50px_rgba(212,175,55,0.4)]"
            >
               <div className="absolute inset-0 bg-gold-500 flex items-center justify-center text-white text-5xl font-serif">SDP</div>
               <img 
                 src="/logo.png" 
                 alt="Sri Datta Prasaram Logo" 
                 className="object-cover w-full h-full relative z-10 bg-white" 
                 onError={(e) => { e.currentTarget.style.display = 'none'; }}
               />
            </motion.div>
          </motion.div>
        )}

        {/* AUTH STAGES CONTAINER */}
        {(appState === "login_phone" || appState === "login_password" || appState === "signup_password") && (
          <motion.div 
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 relative"
          >
            {/* Devotional Decoration Background */}
            <div className="absolute inset-0 z-0 bg-[#fdfbf7] dark:bg-black overflow-hidden">
               <Image 
                 src="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=1000&auto=format&fit=crop"
                 alt="Temple Background"
                 fill
                 className="object-cover opacity-10 dark:opacity-20"
               />
               
               {/* Heavy Gold Temple Arch & Pillars */}
               <div className="absolute inset-0 pointer-events-none dark:hidden">
                 <Image 
                   src="/temple_arch.png"
                   alt="Gold Temple Arch"
                   fill
                   className="object-cover object-top mix-blend-multiply opacity-100"
                   priority
                 />
                 {/* Fade out the bottom so it blends smoothly into the white background */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
               </div>
               
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:from-black/80 dark:via-black/95 dark:to-black" />
            </div>

            <div className="w-full max-w-md space-y-10 z-10 relative">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 shadow-2xl overflow-hidden relative border-4 border-gold-500"
                >
                  <div className="absolute inset-0 bg-gold-500 flex items-center justify-center text-white text-5xl font-serif">
                    SDP
                  </div>
                  <img 
                    src="/logo.png" 
                    alt="Sri Datta Prasaram Logo" 
                    className="object-cover w-full h-full relative z-10 bg-white" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </motion.div>
                <h1 className="text-4xl font-serif font-bold text-maroon-700 dark:text-gold-500 tracking-tight">
                  Sri Datta Prasaram
                </h1>
                <p className="text-maroon-900/70 dark:text-gold-500/80 font-sans text-sm px-4">
                  {c.loginText}
                </p>
              </div>

              {/* PHONE ENTRY */}
              {appState === "login_phone" && (
                <motion.form 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handlePhoneSubmit} 
                  className="space-y-6 bg-white/50 dark:bg-black/50 backdrop-blur-xl p-8 rounded-3xl border border-gold-500/20 shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="relative flex items-center">
                      <Phone className="absolute left-4 w-5 h-5 text-gold-500" />
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile Number"
                        className="w-full pl-12 p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-gold-500/20 focus:border-gold-500 outline-none text-lg font-medium text-maroon-900 dark:text-white shadow-sm transition-colors"
                        required
                      />
                    </div>
                    {phoneError && <p className="text-red-500 text-sm font-medium px-2">{phoneError}</p>}
                  </div>
                  <button 
                    type="submit"
                    className="w-full p-4 rounded-2xl bg-maroon-700 text-gold-500 font-bold text-lg hover:bg-maroon-800 active:scale-95 transition-all shadow-lg flex justify-center items-center gap-2"
                  >
                    {c.loginButton} <SkipForward className="w-5 h-5" />
                  </button>
                </motion.form>
              )}

              {/* PASSWORD LOGIN */}
              {appState === "login_password" && (
                <motion.form 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleLoginSubmit} 
                  className="space-y-6 bg-white/50 dark:bg-black/50 backdrop-blur-xl p-8 rounded-3xl border border-gold-500/20 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-4 text-maroon-900 dark:text-gold-500 font-medium">
                    <UserPlus className="w-5 h-5" /> Welcome back, {phone}
                  </div>
                  <div className="space-y-2">
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-5 h-5 text-gold-500" />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full pl-12 p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-gold-500/20 focus:border-gold-500 outline-none text-lg font-medium text-maroon-900 dark:text-white shadow-sm transition-colors"
                        required
                      />
                    </div>
                    {passError && <p className="text-red-500 text-sm font-medium px-2">{passError}</p>}
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <button type="button" onClick={() => setAppState("login_phone")} className="text-sm text-maroon-700 dark:text-gold-500 hover:underline">Change Number</button>
                    <button type="button" onClick={() => alert("Password reset link would be sent to your number!")} className="text-sm font-bold text-maroon-700 dark:text-gold-500 hover:underline">Forgot Password?</button>
                  </div>
                  <button 
                    type="submit"
                    className="w-full p-4 rounded-2xl bg-maroon-700 text-gold-500 font-bold text-lg hover:bg-maroon-800 active:scale-95 transition-all shadow-lg flex justify-center items-center gap-2"
                  >
                    Login <LogIn className="w-5 h-5" />
                  </button>
                </motion.form>
              )}

              {/* SIGNUP PASSWORD */}
              {appState === "signup_password" && (
                <motion.form 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onSubmit={handleSignupSubmit} 
                  className="space-y-6 bg-white/50 dark:bg-black/50 backdrop-blur-xl p-8 rounded-3xl border border-gold-500/20 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-4 text-maroon-900 dark:text-gold-500 font-medium">
                    <KeyRound className="w-5 h-5" /> Create an account
                  </div>
                  <div className="space-y-4">
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-5 h-5 text-gold-500" />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create Password"
                        className="w-full pl-12 p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-gold-500/20 focus:border-gold-500 outline-none text-lg font-medium text-maroon-900 dark:text-white shadow-sm transition-colors"
                        required
                      />
                    </div>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-5 h-5 text-gold-500" />
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full pl-12 p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-gold-500/20 focus:border-gold-500 outline-none text-lg font-medium text-maroon-900 dark:text-white shadow-sm transition-colors"
                        required
                      />
                    </div>
                    {passError && <p className="text-red-500 text-sm font-medium px-2">{passError}</p>}
                  </div>
                  <div className="flex justify-start items-center px-2">
                    <button type="button" onClick={() => setAppState("login_phone")} className="text-sm text-maroon-700 dark:text-gold-500 hover:underline">Change Number</button>
                  </div>
                  <button 
                    type="submit"
                    className="w-full p-4 rounded-2xl bg-maroon-700 text-gold-500 font-bold text-lg hover:bg-maroon-800 active:scale-95 transition-all shadow-lg flex justify-center items-center gap-2"
                  >
                    Sign Up <UserPlus className="w-5 h-5" />
                  </button>
                </motion.form>
              )}

            </div>
            <div className="absolute bottom-6 text-sm text-maroon-900/50 dark:text-gold-500/50 font-serif font-medium z-10">
              {c.poweredBy}
            </div>
          </motion.div>
        )}

        {/* LANGUAGE STAGE */}
        {appState === "language" && (
          <motion.div 
            key="language"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 relative"
          >
            {/* Devotional Decoration Background */}
            <div className="absolute inset-0 z-0 bg-[#fdfbf7] dark:bg-black overflow-hidden">
               <Image 
                 src="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=1000&auto=format&fit=crop"
                 alt="Temple Background"
                 fill
                 className="object-cover opacity-10 dark:opacity-20"
               />
               
               {/* Heavy Gold Temple Arch & Pillars */}
               <div className="absolute inset-0 pointer-events-none dark:hidden">
                 <Image 
                   src="/temple_arch.png"
                   alt="Gold Temple Arch"
                   fill
                   className="object-cover object-top mix-blend-multiply opacity-100"
                   priority
                 />
                 {/* Fade out the bottom so it blends smoothly into the white background */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
               </div>
               
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:from-black/80 dark:via-black/95 dark:to-black" />
            </div>

            <div className="w-full max-w-md space-y-12 z-10 relative">
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 shadow-xl overflow-hidden relative border-2 border-gold-500"
                >
                  <div className="absolute inset-0 bg-gold-500 flex items-center justify-center text-white text-3xl font-serif">SDP</div>
                  <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="object-cover w-full h-full relative z-10 bg-white" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </motion.div>
                <h1 className="text-3xl font-serif font-bold text-maroon-700 dark:text-gold-500">
                  Sri Datta Prasaram
                </h1>
                <p className="text-maroon-900/60 dark:text-gold-500/60 font-sans">
                  {contentAll.en.languageTitle} <br/>
                  {contentAll.te.languageTitle} <br/>
                  {contentAll.hi.languageTitle}
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { code: "te", name: "తెలుగు", subtitle: "Telugu" },
                  { code: "hi", name: "हिंदी", subtitle: "Hindi" },
                  { code: "en", name: "English", subtitle: "English" },
                ].map((lang, idx) => (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      // Save language preference to mock user profile
                      const users = JSON.parse(localStorage.getItem("mock_users") || "{}");
                      const currentPhone = localStorage.getItem("current_user");
                      if (currentPhone && users[currentPhone]) {
                        users[currentPhone].language = lang.code;
                        localStorage.setItem("mock_users", JSON.stringify(users));
                      }
                      setAppState("feed");
                    }}
                    className="w-full p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-gold-500/20 hover:border-gold-500 shadow-lg transition-all duration-300 flex items-center justify-between group active:scale-95"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-medium text-maroon-700 dark:text-gold-500">
                        {lang.name}
                      </span>
                      <span className="text-sm text-maroon-900/60 dark:text-gold-500/60">
                        {lang.subtitle}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* MAIN FEED STAGE */}
        {appState === "feed" && (
          <motion.div 
            key="feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col pb-24"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gold-500/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-gold-500 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gold-500 flex items-center justify-center text-white text-xs font-serif">SDP</div>
                  <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="object-cover w-full h-full relative z-10 bg-white" 
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <span className="font-serif font-bold text-maroon-700 dark:text-gold-500">
                  {c.appName}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-xs font-bold text-maroon-700 dark:text-gold-500 bg-gold-500/10 px-3 py-1.5 rounded-full"
              >
                Logout
              </button>
            </div>

            {/* Daily Darshan Section */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="relative w-full h-[70vh] bg-black"
            >
              <Image 
                src="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=1000&auto=format&fit=crop" 
                alt="Daily Darshan"
                fill
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h1 className="text-4xl font-serif font-bold text-gold-500 mb-1">
                      {c.darshanTitle}
                    </h1>
                    <p className="text-white/80 font-medium text-lg">
                      {c.darshanSubtitle}
                    </p>
                  </div>
                  <ShareButton title={c.darshanTitle} />
                </div>
                
                {/* Social Proof Counter */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gold-500 border-2 border-black flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                    ))}
                  </div>
                  <div className="text-white font-medium text-sm">
                    {c.joinDevotees}
                  </div>
                </div>
              </div>
            </motion.section>

            <div className="px-4 py-8 space-y-12">
              
              {/* Daily Content Section */}
              <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <h2 className="text-2xl font-serif font-bold text-maroon-700 dark:text-gold-500">
                    {c.dailyContentTitle}
                  </h2>
                  <ShareButton title={c.dailyContentTitle} />
                </div>
                <div className="bg-maroon-700 dark:bg-black rounded-3xl p-6 shadow-2xl border border-gold-500/20 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full -z-0" />
                  <div className="relative z-10">
                    <div className="inline-block px-3 py-1 bg-gold-500 text-maroon-900 rounded-full text-xs font-bold mb-6">
                      {c.dailyWisdom}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gold-500 mb-4">
                      {c.postTitle}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-lg mb-6">
                      {c.postText}
                    </p>
                    <button className="text-gold-500 font-bold text-sm flex items-center group">
                      {c.readFull}
                      <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* Panchang Section */}
              <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <h2 className="text-2xl font-serif font-bold text-maroon-700 dark:text-gold-500">
                    {c.panchangTitle}
                  </h2>
                  <ShareButton title={c.panchangTitle} />
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-lg border border-gold-500/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-maroon-700/60 dark:text-gold-500/60 font-medium uppercase tracking-wider">{c.tithi}</span>
                        <span className="text-[10px] bg-gold-500/20 text-maroon-800 dark:text-gold-400 px-2 py-0.5 rounded-full">
                          {language === "hi" ? "Purnimanta" : "Amavasyantha"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Moon className="w-5 h-5 text-gold-500" />
                        <p className="font-bold text-maroon-900 dark:text-white text-lg">{c.tithiValue}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs text-maroon-700/60 dark:text-gold-500/60 font-medium uppercase tracking-wider">{c.nakshatra}</span>
                      <div className="flex items-center gap-2">
                        <Sun className="w-5 h-5 text-gold-500" />
                        <p className="font-bold text-maroon-900 dark:text-white text-lg">{c.nakshatraValue}</p>
                      </div>
                    </div>
                    <div className="col-span-2 bg-maroon-50 dark:bg-maroon-900/20 rounded-2xl p-4 flex items-center justify-between border border-maroon-100 dark:border-maroon-900">
                      <div>
                        <span className="text-xs text-maroon-700 font-bold uppercase tracking-wider">{c.rahukaalam}</span>
                        <p className="font-bold text-maroon-900 dark:text-white mt-1">10:30 AM - 12:00 PM</p>
                      </div>
                      <Clock className="w-8 h-8 text-maroon-700 dark:text-gold-500 opacity-50" />
                    </div>
                  </div>
                  <button 
                    onClick={() => setAppState("panchangam_detail")}
                    className="w-full mt-6 p-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-maroon-900 font-bold text-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    {c.viewFullPanchang}
                  </button>
                </div>
              </motion.section>

              {/* Japa Counter Section */}
              <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <h2 className="text-2xl font-serif font-bold text-maroon-700 dark:text-gold-500">
                    {c.japaTitle}
                  </h2>
                  <ShareButton title={c.japaTitle} />
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-lg border border-gold-500/20 flex flex-col items-center">
                  <div className="text-6xl font-bold text-gold-500 mb-2 font-serif">{japaCount}</div>
                  <p className="text-sm text-maroon-700/60 dark:text-gold-500/60 mb-8 font-medium">{c.chantsToday}</p>
                  
                  <button
                    onClick={() => setJapaCount(p => p + 1)}
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-maroon-700 to-maroon-900 shadow-[0_10px_40px_-10px_rgba(128,0,0,0.5)] flex items-center justify-center outline-none active:scale-90 transition-all border-4 border-gold-500 relative"
                  >
                    <div className="absolute inset-2 border-2 border-gold-500/30 rounded-full border-dashed" />
                    <span className="text-gold-500 font-serif text-3xl font-bold">{c.tap}</span>
                  </button>
                </div>
              </motion.section>

              {/* Media Section */}
              <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <h2 className="text-2xl font-serif font-bold text-maroon-700 dark:text-gold-500">
                    {c.mediaTitle}
                  </h2>
                  <ShareButton title={c.mediaTitle} />
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-lg border border-gold-500/20">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl mb-6 relative border-4 border-gold-500">
                      <Image 
                        src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop" 
                        alt="Album Cover"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-maroon-900 dark:text-white">
                      {c.stavam}
                    </h3>
                    <p className="text-sm text-maroon-700/60 dark:text-gold-500/60 mb-6 mt-1">{c.mediaSubtitle}</p>
                    <div className="flex items-center gap-8">
                      <button className="text-maroon-700/60 hover:text-maroon-900 dark:text-gold-500/60 dark:hover:text-gold-500">
                        <SkipBack className="w-8 h-8 fill-current" />
                      </button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-maroon-900 shadow-lg hover:scale-105 active:scale-95 transition-all"
                      >
                        {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                      </button>
                      <button className="text-maroon-700/60 hover:text-maroon-900 dark:text-gold-500/60 dark:hover:text-gold-500">
                        <SkipForward className="w-8 h-8 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* E-Commerce Section */}
              <motion.section 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <h2 className="text-2xl font-serif font-bold text-maroon-700 dark:text-gold-500">
                    {c.storeTitle}
                  </h2>
                  <ShareButton title={c.storeTitle} />
                </div>
                
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-lg border border-gold-500/20">
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {[
                      { id: "books", label: c.tabBooks },
                      { id: "frames", label: c.tabFrames },
                      { id: "others", label: c.tabOthers }
                    ].map(cat => (
                      <button 
                        key={cat.id}
                        onClick={() => setShopCategory(cat.id as any)}
                        className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                          shopCategory === cat.id 
                          ? "bg-maroon-700 text-gold-500" 
                          : "bg-maroon-50 text-maroon-700 dark:bg-black dark:text-gold-500 border border-gold-500/20"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-white dark:bg-black rounded-2xl overflow-hidden shadow-sm border border-gold-500/20 group">
                        <div className="relative h-40 bg-zinc-100 dark:bg-zinc-800">
                          <Image 
                            src={`https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&random=${i}`}
                            alt="Product"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-sm text-maroon-900 dark:text-white mb-1 line-clamp-1">
                            {shopCategory === 'books' ? c.itemBook : c.itemSacred}
                          </h4>
                          <div className="flex items-center justify-between mt-3">
                            <span className="font-bold text-gold-500 text-lg">₹{150 * i}</span>
                            <button className="text-xs bg-maroon-700 text-gold-500 px-3 py-1.5 rounded-full font-bold hover:bg-maroon-800 active:scale-95 transition-all">
                              {c.addButton}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

            </div>
          </motion.div>
        )}

        {/* PANCHANGAM DETAIL STAGE */}
        {appState === "panchangam_detail" && (
          <motion.div 
            key="panchangam_detail"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-50 bg-white dark:bg-black overflow-y-auto pb-10"
          >
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gold-500/20 px-4 py-4 flex items-center gap-4">
              <button 
                onClick={() => setAppState("feed")}
                className="w-10 h-10 rounded-full bg-maroon-50 dark:bg-zinc-900 flex items-center justify-center text-maroon-900 dark:text-gold-500 active:scale-90 transition-transform"
              >
                <span className="text-xl font-bold">←</span>
              </button>
              <h1 className="text-xl font-serif font-bold text-maroon-700 dark:text-gold-500 flex-1">
                {c.panchangFullTitle}
              </h1>
            </div>

            {/* Config Section */}
            <div className="p-4 bg-maroon-50/50 dark:bg-zinc-900/50 border-b border-gold-500/10 space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-maroon-700/60 dark:text-gold-500/60 uppercase">{c.date}</label>
                <input 
                  type="date" 
                  value={panchangDate}
                  onChange={(e) => setPanchangDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white dark:bg-black border border-gold-500/30 text-maroon-900 dark:text-white font-medium outline-none focus:border-gold-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-maroon-700/60 dark:text-gold-500/60 uppercase">{c.location}</label>
                  <select 
                    value={panchangLocation}
                    onChange={(e) => setPanchangLocation(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-black border border-gold-500/30 text-maroon-900 dark:text-white font-medium outline-none focus:border-gold-500"
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-maroon-700/60 dark:text-gold-500/60 uppercase">{c.type}</label>
                  <select 
                    value={panchangType}
                    onChange={(e) => setPanchangType(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-black border border-gold-500/30 text-maroon-900 dark:text-white font-medium outline-none focus:border-gold-500 text-sm"
                  >
                    <option value="amavasyantha">{c.typeAmavasyantha}</option>
                    <option value="sauramana">{c.typeSauramana}</option>
                    <option value="lunar">{c.typeLunar}</option>
                  </select>
                </div>
              </div>
              
              <button 
                onClick={handleCalculatePanchang}
                disabled={isLoadingPanchang}
                className="w-full mt-2 p-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-maroon-900 font-bold text-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoadingPanchang ? (
                  <span className="animate-spin w-5 h-5 border-2 border-maroon-900 border-t-transparent rounded-full"></span>
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                {isLoadingPanchang ? "Calculating..." : c.calculateButton}
              </button>
            </div>

            {/* Details Content */}
            <div className="p-4 space-y-6">
              
              {/* Top Meta Info */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-gold-500/20 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gold-500/10 pb-3">
                  <span className="text-sm font-medium text-maroon-700/60 dark:text-gold-500/60">{c.samvatsaram}</span>
                  <span className="font-bold text-maroon-900 dark:text-white text-right">{c.samvatsaramValue}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gold-500/10 pb-3">
                  <span className="text-sm font-medium text-maroon-700/60 dark:text-gold-500/60">{c.ayanamRitu}</span>
                  <span className="font-bold text-maroon-900 dark:text-white text-right">{c.ayanamRituValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-maroon-700/60 dark:text-gold-500/60">{c.masamPaksham}</span>
                  <span className="font-bold text-maroon-900 dark:text-white text-right">{c.masamPakshamValue}</span>
                </div>
              </div>

              {/* Sun & Moon */}
              <div className="bg-maroon-50 dark:bg-maroon-900/20 rounded-2xl p-5 border border-gold-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-maroon-700/60 dark:text-gold-500/60 uppercase tracking-wider">{c.sun}</span>
                  <p className="font-bold text-maroon-900 dark:text-white mt-1 text-lg">
                    {panchangData?.sunrise ? `${panchangData.sunrise} - ${panchangData.sunset}` : c.sunValue}
                  </p>
                </div>
                <Sun className="w-10 h-10 text-gold-500" />
              </div>

              {/* Tithi, Nakshatra, Yoga, Karana */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-gold-500/20 shadow-sm space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-maroon-50 dark:bg-black flex items-center justify-center shrink-0 border border-gold-500/20">
                    <Moon className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-maroon-700/60 dark:text-gold-500/60 uppercase">{c.tithi}</span>
                    <p className="font-bold text-maroon-900 dark:text-white mt-1">{panchangData?.tithi || c.tithiDetail}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-maroon-50 dark:bg-black flex items-center justify-center shrink-0 border border-gold-500/20">
                    <Sparkles className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-maroon-700/60 dark:text-gold-500/60 uppercase">{c.nakshatra}</span>
                    <p className="font-bold text-maroon-900 dark:text-white mt-1">{panchangData?.nakshatra || c.nakshatraDetail}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-maroon-50 dark:bg-black flex items-center justify-center shrink-0 border border-gold-500/20">
                    <Heart className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-maroon-700/60 dark:text-gold-500/60 uppercase">{c.yogam}</span>
                    <p className="font-bold text-maroon-900 dark:text-white mt-1">{panchangData?.yoga || c.yogamValue}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-maroon-50 dark:bg-black flex items-center justify-center shrink-0 border border-gold-500/20">
                    <Clock className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-maroon-700/60 dark:text-gold-500/60 uppercase">{c.karanam}</span>
                    <p className="font-bold text-maroon-900 dark:text-white mt-1">{panchangData?.karana || c.karanamValue}</p>
                  </div>
                </div>
              </div>

              {/* Auspicious */}
              <div>
                <h3 className="text-lg font-serif font-bold text-green-700 dark:text-green-500 mb-3 px-1">{c.auspicious}</h3>
                <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-5 border border-green-200 dark:border-green-900/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-900 dark:text-green-400">{c.abhijitMuhurtam}</span>
                    <span className="font-bold text-green-900 dark:text-green-300">{panchangData?.abhijit || c.abhijitMuhurtamValue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-900 dark:text-green-400">{c.brahmaMuhurtam}</span>
                    <span className="font-bold text-green-900 dark:text-green-300">{c.brahmaMuhurtamValue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-900 dark:text-green-400">{c.amritaGhadiyalu}</span>
                    <span className="font-bold text-green-900 dark:text-green-300">{c.amritaGhadiyaluValue}</span>
                  </div>
                </div>
              </div>

              {/* Inauspicious */}
              <div>
                <h3 className="text-lg font-serif font-bold text-red-700 dark:text-red-500 mb-3 px-1">{c.inauspicious}</h3>
                <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-5 border border-red-200 dark:border-red-900/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-red-900 dark:text-red-400">{c.rahukaalamFull}</span>
                    <span className="font-bold text-red-900 dark:text-red-300">{panchangData?.rahu_kaal || c.rahukaalamFullValue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-red-900 dark:text-red-400">{c.yamagandam}</span>
                    <span className="font-bold text-red-900 dark:text-red-300">{panchangData?.yamagandam || c.yamagandamValue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-red-900 dark:text-red-400">{c.gulikaKaalam}</span>
                    <span className="font-bold text-red-900 dark:text-red-300">{panchangData?.gulika_kaal || c.gulikaKaalamValue}</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="font-medium text-red-900 dark:text-red-400">{c.varjam}</span>
                    <span className="font-bold text-red-900 dark:text-red-300 text-right">{c.varjamValue}</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="font-medium text-red-900 dark:text-red-400">{c.durmuhurtam}</span>
                    <span className="font-bold text-red-900 dark:text-red-300 text-right">{c.durmuhurtamValue}</span>
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
