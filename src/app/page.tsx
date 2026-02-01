"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Terminal,
    Cpu,
    Zap,
    Shield,
    Database,
    Globe,
    LayoutDashboard,
    ArrowRight,
    Code2,
    Box,
    Layers,
    Container,
    Activity,
    ChevronRight,
    Monitor,
    Server,
    Sparkles,
    Command,
    Key,
    BarChart3,
    Route,
    Filter,
    ArrowRightLeft,
    ChevronDown,
    User,
    FileText,
    Share2
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

const AuroraEffect = dynamic(() => import('@/components/AuroraEffect'), { ssr: false });
const StarDustCanvas = dynamic(() => import('@/components/StarDustCanvas'), { ssr: false });


export default function LandingPage() {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [auroraVisible, setAuroraVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Delay aurora appearance to allow the page to stabilize
        const timer = setTimeout(() => setAuroraVisible(true), 1500);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const { scrollY } = useScroll();
    const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Parallax Transforms
    const gridY = useTransform(smoothY, [0, 1000], [0, 200]);
    const glow1Y = useTransform(smoothY, [0, 1000], [0, -150]);
    const glow2Y = useTransform(smoothY, [0, 1000], [0, -100]);
    const starY = useTransform(smoothY, [0, 1000], [0, 50]);
    const scrollOpacity = useTransform(smoothY, [0, 600], [1, 0]);

    // Smooth entry opacity
    const entryOpacity = useSpring(auroraVisible ? 1 : 0, { stiffness: 50, damping: 40 });

    // Combine scroll-based and entry-based opacity
    const combinedAuroraOpacity = useTransform(
        [scrollOpacity, entryOpacity],
        ([s, e]) => (s as number) * (e as number)
    );

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent-primary/30 scroll-smooth">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Blueprint Grid - Global Background */}
                <motion.div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        maskImage: 'radial-gradient(circle at center, transparent 10%, black 60%)',
                        y: gridY
                    }}
                />

                <motion.div
                    className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/10 blur-[120px] rounded-full"
                    style={{ y: glow1Y }}
                />
                <motion.div
                    className="absolute bottom-[10%] right-[-5%] w-[30%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full"
                    style={{ y: glow2Y }}
                />





                {/* Canvas Star Dust Effect */}
                <StarDustCanvas />
            </div>

            {/* Premium Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'py-3 bg-black/80 backdrop-blur-xl border-white/10' : 'py-5 bg-transparent border-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="relative w-10 h-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <Image
                                src="/knull.png"
                                alt="KNULL Logo"
                                fill
                                priority
                                sizes="40px"
                                className="object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            />
                        </div>
                        <span className="font-bold tracking-tighter text-2xl bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">KNULL</span>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        {['Features', 'Architecture', 'Docs'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-neutral-400 hover:text-white transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-primary transition-all group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/playground" className="px-5 py-2.5 rounded-xl bg-accent-primary text-white text-sm font-bold shadow-lg shadow-accent-primary/20 hover:bg-accent-primary/90 transition-all active:scale-95 flex items-center gap-2 group">
                            Get Started
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                {/* Full-Screen Hero Section with 3D Background */}
                <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                    {/* Aurora Restricted to Hero */}
                    <motion.div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{ opacity: scrollOpacity }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.8, delay: 0.1, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <AuroraEffect />
                        </motion.div>
                    </motion.div>

                    {/* Futuristic 3D Background Elements - Neural Infinity Gate */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                        {mounted && (
                            <>
                                {/* 3D Perspective Container - Scaled for Mobile */}
                                <div className="scale-[0.45] md:scale-100 origin-center transition-transform duration-500">
                                    <div className="relative w-[800px] h-[800px] transform-3d" style={{ transform: 'perspective(1000px) rotateX(60deg) scale(0.8)' }}>

                                        {/* Ring System - Hidden on Mobile */}
                                        <div className="hidden md:flex absolute inset-0 items-center justify-center transform-3d transform-gpu">
                                            {/* Outer Mechanical Ring - Clockwise */}
                                            <div className="absolute w-[950px] h-[950px] rounded-full border-[3px] border-dashed border-blue-500/40 animate-spin-slow shadow-[0_0_100px_rgba(59,130,246,0.3)]" style={{ animationDuration: '30s' }} />
                                            <div className="absolute w-[930px] h-[930px] rounded-full border-[2px] border-blue-500/20 animate-spin-slow" style={{ animationDuration: '30s' }} />

                                            {/* Middle Energy Ring - Counter-Clockwise */}
                                            <div className="absolute w-[700px] h-[700px] rounded-full border-[4px] border-cyan-500/30 border-t-cyan-400/80 border-l-transparent animate-spin-reverse-slow shadow-[0_0_80px_rgba(6,182,212,0.25)]" style={{ animationDuration: '20s' }} />
                                            <div className="absolute w-[680px] h-[680px] rounded-full border-[2px] border-dashed border-cyan-500/30 animate-spin-reverse-slow" style={{ animationDuration: '25s' }} />

                                            {/* NEW: Electric Violet Galaxy Ring (Accretion Disk) */}
                                            <div className="absolute w-[520px] h-[520px] rounded-full border-[6px] border-violet-500/30 border-b-violet-400/90 border-l-transparent animate-spin-slow shadow-[0_0_120px_rgba(139,92,246,0.4)] blur-[1px]" style={{ animationDuration: '15s' }} />
                                            <div className="absolute w-[500px] h-[500px] rounded-full border-[2px] border-dashed border-violet-400/40 animate-spin-reverse-slow shadow-[0_0_60px_rgba(139,92,246,0.2)]" style={{ animationDuration: '18s' }} />

                                            {/* Inner Core Ring - Fast Spin */}
                                            <div className="absolute w-[400px] h-[400px] rounded-full border-[5px] border-indigo-500/40 border-b-indigo-400/90 border-r-transparent animate-spin-slow shadow-[0_0_80px_rgba(99,102,241,0.4)]" style={{ animationDuration: '10s' }} />

                                            {/* Scanning Pulse Ring */}
                                            <div className="absolute w-[400px] h-[400px] rounded-full border-[2px] border-cyan-400/60 animate-ping" style={{ animationDuration: '4s' }} />
                                        </div>

                                        {/* The Singularity / Event Horizon (Central Core) */}
                                        <div className="absolute inset-0 flex items-center justify-center transform-3d" style={{ transform: 'translateZ(50px)' }}>
                                            <div className="w-52 h-52 rounded-full bg-gradient-to-br from-blue-400 via-indigo-600 via-violet-500/30 to-violet-800 animate-pulse-glow blur-lg opacity-90 shadow-[0_0_120px_rgba(59,130,246,0.6),0_0_150px_rgba(139,92,246,0.3)]" />
                                            <div className="absolute w-36 h-36 rounded-full bg-white blur-3xl opacity-50" />
                                            <div className="absolute w-72 h-72 rounded-full border-[2px] border-white/20 animate-ping opacity-30" style={{ animationDuration: '3s' }} />
                                            {/* Central Violet Core Glow */}
                                            <div className="absolute w-20 h-20 rounded-full bg-violet-400/20 blur-2xl animate-pulse" />
                                        </div>

                                        {/* Data Packet Ingestion - 360 Radius to Core with Acceleration - Query Bubbles */}
                                        {[...Array(8)].map((_, i) => {
                                            const queries = [
                                                { text: "Analyze VPC Security", avatar: "/profile_1.png", color: "violet" },
                                                { text: "Optimize SQL Query", avatar: "/profile_2.png", color: "blue" },
                                                { text: "Summarize Document", avatar: "/profile_3.png", color: "emerald" },
                                                { text: "Deploy to Production", avatar: "/profile_4.png", color: "cyan" },
                                                { text: "Monitor CPU Load", avatar: "/profile_5.png", color: "indigo" },
                                                { text: "Debug Python App", avatar: "/profile_6.png", color: "amber" },
                                                { text: "Generate Blog Post", avatar: "/profile_1.png", color: "fuchsia" },
                                                { text: "Refactor Service", avatar: "/profile_2.png", color: "neutral" },
                                            ];
                                            const query = queries[i % queries.length];

                                            // 360-degree angular distribution
                                            const angle = (i * (360 / 8)) * (Math.PI / 180);
                                            const baseRadius = 1200;
                                            const variation = Math.sin(i * 3) * 200;
                                            const distance = baseRadius + variation;

                                            const startX = Math.cos(angle) * distance;
                                            const startY = Math.sin(angle) * distance;
                                            const angleDeg = (i * (360 / 8));

                                            return (
                                                <div
                                                    key={i}
                                                    className="absolute top-1/2 left-1/2 animate-suck-in-accelerated opacity-0"
                                                    style={{
                                                        // @ts-ignore
                                                        '--startX': `${startX}px`,
                                                        // @ts-ignore
                                                        '--startY': `${startY}px`,
                                                        marginLeft: '-60px', marginTop: '-20px',
                                                        animationDelay: `${i * 1.2}s`,
                                                        animationDuration: `${4 + (i % 2)}s`,
                                                        zIndex: 20
                                                    }}
                                                >
                                                    <div className="relative group flex items-center" style={{ transform: `rotate(${angleDeg}deg)` }}>
                                                        {/* Comet Tail - Adjusted for bubble width */}
                                                        <div className="absolute left-10 w-24 h-[1px] bg-gradient-to-r from-violet-500/40 to-transparent blur-[1.5px]" />

                                                        {/* Query Bubble with inverse rotation */}
                                                        <div className="relative" style={{ transform: `rotate(-${angleDeg}deg)` }}>
                                                            <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.1)] flex items-center gap-3 min-w-[140px] group-hover:border-violet-500/50 transition-colors">
                                                                <div className="text-[10px] font-medium text-neutral-300 whitespace-nowrap">{query.text}</div>

                                                                {/* User Profile Photo on top right-ish */}
                                                                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-neutral-900 border border-white/20 overflow-hidden shadow-xl">
                                                                    <Image
                                                                        src={query.avatar}
                                                                        alt="User"
                                                                        fill
                                                                        sizes="28px"
                                                                        className="object-cover"
                                                                    />
                                                                </div>

                                                                {/* Inner Glow */}
                                                                <div className="absolute inset-0 rounded-xl bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Floating Metadata Labels */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                        {[
                                            { text: "CORE_AUTH_VALID", top: "25%", left: "15%" },
                                            { text: "PKT_INGRESS_1975", top: "65%", left: "80%" },
                                            { text: "ENVOY_DATA_PLANE", top: "15%", left: "75%" },
                                            { text: "EXTPROC_ACTIVE", top: "80%", left: "20%" },
                                        ].map((label, i) => (
                                            <div
                                                key={i}
                                                className="absolute text-[8px] font-mono text-cyan-500/60 border border-cyan-500/20 px-2 py-0.5 rounded bg-cyan-950/20 backdrop-blur-sm animate-float-metadata"
                                                style={{
                                                    top: label.top,
                                                    left: label.left,
                                                    animationDelay: `${i * 1.2}s`,
                                                }}
                                            >
                                                {label.text}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Additional 3D Atmosphere - Data Beams */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-px h-64 bg-gradient-to-t from-transparent via-cyan-400 to-transparent animate-rise-fade"
                                                style={{
                                                    left: `${15 + i * 10}%`,
                                                    top: `${20 + (i * 13) % 40}%`,
                                                    animationDelay: `${i * 0.7}s`,
                                                    animationDuration: `${5 + i}s`,
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Background Grid - Depth */}
                                    <div className="absolute inset-0 opacity-60 pointer-events-none" style={{
                                        backgroundImage: `radial-gradient(circle at center, transparent 0%, #000 85%), linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)`,
                                        backgroundSize: '100% 100%, 60px 60px, 60px 60px',
                                        transform: 'perspective(500px) rotateX(60deg) scale(2) translateY(-20%)',
                                        maskImage: 'linear-gradient(to bottom, black 5%, transparent 70%)'
                                    }} />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Hero Content - Shifted up for balance and legibility group applied */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 text-center max-w-5xl mx-auto -mt-36  rounded-[3.5rem] backdrop-blur-[2px] "
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 animate-shining-sheen backdrop-blur-sm"
                        >
                            <Sparkles className="w-3 h-3" />
                            Next-Gen AI Gateway Foundation
                        </motion.div>
                        <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent leading-[0.9]">
                            KNULL <span className="text-white"></span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-neutral-400 leading-relaxed mb-12">
                            High-performance, standalone foundation for AI traffic management.
                            Run Envoy-powered gateways at the edge with zero Kubernetes footprint.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/playground"
                                className="group px-10 py-5 rounded-2xl bg-white text-black font-extrabold flex items-center gap-3 hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-2xl animate-shining-glow"
                            >
                                Launch Control Plane
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 backdrop-blur-sm"
                            >
                                <Command className="w-4 h-4 text-neutral-400" />
                                Examine Flow
                            </button>
                        </div>
                    </motion.div>

                    {/* Scroll Down Button - Fixed at Bottom */}
                    <button
                        onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors group cursor-pointer z-20"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-widest">Explore Architecture</span>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all animate-bounce">
                            <ChevronDown className="w-5 h-5" />
                        </div>
                    </button>
                </section>

                {/* Creative Multi-Component Architecture Visualization */}
                <section id="architecture" className="mt-32 relative py-32 overflow-visible">
                    {/* Background Glows */}
                    < div className="absolute inset-0 flex items-center justify-center pointer-events-none" >
                        <div className="w-[1200px] h-[800px] bg-accent-primary/10 blur-[200px] rounded-full" />
                    </div >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 max-w-7xl mx-auto px-4"
                    >
                        <div className="text-center mb-20">
                            <h2 className="text-5xl font-bold mb-6 tracking-tight">AI Gateway Architecture</h2>
                            <p className="text-neutral-400 text-lg max-w-3xl mx-auto">Trace the journey of a request through Knull Core's sophisticated processing pipeline — from client to AI model and back.</p>
                        </div>

                        {/* The Architecture Diagram */}
                        <div className="relative w-full">

                            {/* Mobile View: Vertical Flow */}
                            <div className="md:hidden flex flex-col gap-8">
                                {/* Clients */}
                                <div className="space-y-4 flex flex-col items-center">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                                        Request Sources
                                    </div>
                                    <div className="flex flex-col items-center gap-3 w-full">
                                        <SourceNode icon={<Monitor className="w-5 h-5" />} label="Web App" sublabel="HTTP/REST" />
                                        <SourceNode icon={<Terminal className="w-5 h-5" />} label="CLI / SDK" sublabel="OpenAI API" />
                                        <SourceNode icon={<SmartphoneIcon />} label="Mobile" sublabel="gRPC" />
                                    </div>
                                </div>

                                {/* Connector */}
                                <div className="flex justify-center">
                                    <div className="w-px h-8 bg-gradient-to-b from-violet-500 to-indigo-500" />
                                </div>

                                {/* Knull Core - Vertical Simplified */}
                                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl relative">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black border border-accent-primary/50 text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary whitespace-nowrap">
                                        KNULL CORE
                                    </div>

                                    <div className="space-y-6 mt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <InternalComponent icon={<Server className="w-5 h-5" />} label="Envoy" sublabel="Parse" color="violet" badge="1" />
                                            <InternalComponent icon={<Route className="w-5 h-5" />} label="Router" sublabel="Select" color="indigo" badge="2" />
                                            <InternalComponent icon={<Key className="w-5 h-5" />} label="Auth" sublabel="Inject" color="blue" badge="3" />
                                            <InternalComponent icon={<ArrowRightLeft className="w-5 h-5" />} label="Upstream" sublabel="Mutate" color="cyan" badge="4" />
                                        </div>

                                        <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
                                            <ResponseStep icon={<ArrowRight className="w-4 h-4 rotate-180" />} label="Output" sublabel="Stream" />
                                            <ResponseStep icon={<Filter className="w-4 h-4" />} label="Headers" sublabel="Filter" />
                                            <ResponseStep icon={<Database className="w-4 h-4" />} label="Persist" sublabel="Audit" />
                                            <ResponseStep icon={<BarChart3 className="w-4 h-4" />} label="Metrics" sublabel="Stats" />
                                        </div>
                                    </div>
                                </div>

                                {/* Connector */}
                                <div className="flex justify-center">
                                    <div className="w-px h-8 bg-gradient-to-b from-cyan-500 to-amber-500" />
                                </div>

                                {/* AI Models */}
                                <div className="space-y-4 flex flex-col items-center">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                        Intelligence Layer
                                    </div>
                                    <div className="flex flex-col items-center gap-3 w-full">
                                        <ModelCard icon={<Sparkles className="w-5 h-5" />} label="GPT-4o" provider="OpenAI" color="amber" />
                                        <ModelCard icon={<Activity className="w-5 h-5" />} label="Claude 3.5" provider="Anthropic" color="emerald" />
                                        <ModelCard icon={<Layers className="w-5 h-5" />} label="Gemini 1.5" provider="Google" color="blue" />
                                    </div>
                                </div>
                            </div>

                            {/* Desktop View: Horizontal Diagram */}
                            <div className="hidden md:block relative w-full" style={{ height: '650px' }}>

                                {/* SVG for all curved connections */}
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    viewBox="0 0 1400 650"
                                    preserveAspectRatio="xMidYMid meet"
                                    style={{ overflow: 'visible' }}
                                >
                                    <defs>
                                        {/* Gradient for request flow */}
                                        <linearGradient id="request-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                                            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                                        </linearGradient>

                                        {/* Gradient for response flow */}
                                        <linearGradient id="response-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
                                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                                            <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.3" />
                                        </linearGradient>

                                        {/* Arrow markers */}
                                        <marker id="arrow-purple" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                                            <path d="M0,0 L0,10 L10,5 Z" fill="#8B5CF6" />
                                        </marker>
                                        <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                                            <path d="M0,0 L0,10 L10,5 Z" fill="#10B981" />
                                        </marker>
                                        <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                                            <path d="M0,0 L0,10 L10,5 Z" fill="#3B82F6" />
                                        </marker>

                                        {/* Glow filter */}
                                        <filter id="glow-strong" x="-100%" y="-100%" width="300%" height="300%">
                                            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    {/* === REQUEST FLOW (Purple/Blue) === */}

                                    {/* Client to Envoy - Curved paths */}
                                    <path d="M 180 120 Q 280 120, 350 200" stroke="#8B5CF6" strokeWidth="2" fill="none" strokeOpacity="0.4" markerEnd="url(#arrow-purple)" />
                                    <path d="M 180 325 Q 280 325, 350 280" stroke="#8B5CF6" strokeWidth="2" fill="none" strokeOpacity="0.4" markerEnd="url(#arrow-purple)" />
                                    <path d="M 180 530 Q 280 430, 350 360" stroke="#8B5CF6" strokeWidth="2" fill="none" strokeOpacity="0.4" markerEnd="url(#arrow-purple)" />

                                    {/* Internal Knull Flow - Horizontal */}
                                    <path d="M 460 280 L 530 280" stroke="#6366F1" strokeWidth="2" fill="none" strokeOpacity="0.5" markerEnd="url(#arrow-blue)" />
                                    <path d="M 640 280 L 710 280" stroke="#6366F1" strokeWidth="2" fill="none" strokeOpacity="0.5" markerEnd="url(#arrow-blue)" />
                                    <path d="M 820 280 L 890 280" stroke="#6366F1" strokeWidth="2" fill="none" strokeOpacity="0.5" markerEnd="url(#arrow-blue)" />

                                    {/* Upstream to AI Models */}
                                    <path d="M 1000 200 Q 1100 120, 1220 120" stroke="#3B82F6" strokeWidth="2" fill="none" strokeOpacity="0.4" markerEnd="url(#arrow-blue)" />
                                    <path d="M 1000 280 Q 1100 280, 1220 325" stroke="#3B82F6" strokeWidth="2" fill="none" strokeOpacity="0.4" markerEnd="url(#arrow-blue)" />
                                    <path d="M 1000 360 Q 1100 430, 1220 530" stroke="#3B82F6" strokeWidth="2" fill="none" strokeOpacity="0.4" markerEnd="url(#arrow-blue)" />

                                    {/* === ANIMATED PARTICLES === */}

                                    {/* Request particles - Client to Envoy */}
                                    <circle r="6" fill="#8B5CF6" filter="url(#glow-strong)">
                                        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 180 120 Q 280 120, 350 200" />
                                    </circle>
                                    <circle r="6" fill="#8B5CF6" filter="url(#glow-strong)">
                                        <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.8s" path="M 180 325 Q 280 325, 350 280" />
                                    </circle>
                                    <circle r="6" fill="#8B5CF6" filter="url(#glow-strong)">
                                        <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.6s" path="M 180 530 Q 280 430, 350 360" />
                                    </circle>

                                    {/* Internal flow particles */}
                                    <circle r="5" fill="#6366F1" filter="url(#glow-strong)">
                                        <animateMotion dur="1s" repeatCount="indefinite" begin="0.5s" path="M 460 280 L 530 280" />
                                    </circle>
                                    <circle r="5" fill="#6366F1" filter="url(#glow-strong)">
                                        <animateMotion dur="1s" repeatCount="indefinite" begin="1s" path="M 640 280 L 710 280" />
                                    </circle>
                                    <circle r="5" fill="#3B82F6" filter="url(#glow-strong)">
                                        <animateMotion dur="1s" repeatCount="indefinite" begin="1.5s" path="M 820 280 L 890 280" />
                                    </circle>

                                    {/* Request particles - Upstream to Models */}
                                    <circle r="6" fill="#3B82F6" filter="url(#glow-strong)">
                                        <animateMotion dur="2s" repeatCount="indefinite" begin="2s" path="M 1000 200 Q 1100 120, 1220 120" />
                                    </circle>
                                    <circle r="6" fill="#3B82F6" filter="url(#glow-strong)">
                                        <animateMotion dur="2s" repeatCount="indefinite" begin="2.5s" path="M 1000 280 Q 1100 280, 1220 325" />
                                    </circle>
                                    <circle r="6" fill="#3B82F6" filter="url(#glow-strong)">
                                        <animateMotion dur="2s" repeatCount="indefinite" begin="3s" path="M 1000 360 Q 1100 430, 1220 530" />
                                    </circle>

                                    {/* === RESPONSE FLOW (Green) - Dashed lines below === */}
                                    <path d="M 1220 150 Q 1100 200, 1030 280" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" fill="none" strokeOpacity="0.3" markerEnd="url(#arrow-green)" />
                                    <path d="M 890 280 L 820 280" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" fill="none" strokeOpacity="0.2" markerEnd="url(#arrow-green)" />
                                    <path d="M 710 280 L 640 280" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" fill="none" strokeOpacity="0.2" markerEnd="url(#arrow-green)" />
                                    <path d="M 530 280 L 460 280" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" fill="none" strokeOpacity="0.2" markerEnd="url(#arrow-green)" />
                                    <path d="M 350 280 Q 280 325, 180 325" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" fill="none" strokeOpacity="0.3" markerEnd="url(#arrow-green)" />

                                    {/* Response flow particles */}
                                    <circle r="5" fill="#10B981" filter="url(#glow-strong)">
                                        <animateMotion dur="2s" repeatCount="indefinite" begin="1s" path="M 1220 150 Q 1100 200, 1030 280" />
                                    </circle>
                                    <circle r="5" fill="#10B981" filter="url(#glow-strong)">
                                        <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.5s" path="M 890 280 L 820 280" />
                                    </circle>
                                    <circle r="5" fill="#10B981" filter="url(#glow-strong)">
                                        <animateMotion dur="1.5s" repeatCount="indefinite" begin="0s" path="M 710 280 L 640 280" />
                                    </circle>
                                    <circle r="5" fill="#10B981" filter="url(#glow-strong)">
                                        <animateMotion dur="1s" repeatCount="indefinite" begin="1.5s" path="M 530 280 L 460 280" />
                                    </circle>
                                    <circle r="6" fill="#10B981" filter="url(#glow-strong)">
                                        <animateMotion dur="2.5s" repeatCount="indefinite" begin="2s" path="M 350 280 Q 280 325, 180 325" />
                                    </circle>
                                </svg>

                                {/* Node Cards Layer */}
                                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>

                                    {/* === LEFT: CLIENT SOURCES === */}
                                    <div className="absolute pointer-events-auto" style={{ left: '2%', top: '120px', transform: 'translateY(-50%)' }}>
                                        <SourceNode icon={<Monitor className="w-5 h-5" />} label="Web App" sublabel="HTTP/REST" />
                                    </div>
                                    <div className="absolute pointer-events-auto" style={{ left: '2%', top: '325px', transform: 'translateY(-50%)' }}>
                                        <SourceNode icon={<Terminal className="w-5 h-5" />} label="CLI / SDK" sublabel="OpenAI API" />
                                    </div>
                                    <div className="absolute pointer-events-auto" style={{ left: '2%', top: '530px', transform: 'translateY(-50%)' }}>
                                        <SourceNode icon={<SmartphoneIcon />} label="Mobile" sublabel="gRPC" />
                                    </div>

                                    {/* === CENTER: KNULL CORE EXPANDED === */}
                                    <div className="absolute pointer-events-auto" style={{ left: '22%', top: '50%', transform: 'translateY(-50%)', width: '56%' }}>
                                        <div className="relative">
                                            {/* Outer Container - Glassmorphism */}
                                            <div className="relative p-6 pb-4 rounded-[2rem] bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-[0_0_100px_rgba(139,92,246,0.15)]">

                                                {/* Header */}
                                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-black border border-accent-primary/50 text-sm font-black uppercase tracking-[0.3em] text-accent-primary shadow-xl flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                                                    KNULL CORE
                                                </div>

                                                {/* REQUEST FLOW SECTION */}
                                                <div className="mt-4 mb-3">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="w-2 h-2 rounded-full bg-violet-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">Request Pipeline</span>
                                                        <div className="flex-1 h-px bg-gradient-to-r from-violet-500/30 to-transparent" />
                                                    </div>

                                                    {/* Internal Components with Flow Arrows */}
                                                    <div className="flex items-center justify-between gap-1">
                                                        <InternalComponent
                                                            icon={<Server className="w-5 h-5" />}
                                                            label="Envoy"
                                                            sublabel="Parse Request"
                                                            color="violet"
                                                            badge="1"
                                                        />

                                                        <FlowArrow color="violet" label="Route" />

                                                        <InternalComponent
                                                            icon={<Route className="w-5 h-5" />}
                                                            label="Router Filter"
                                                            sublabel="Select Model"
                                                            color="indigo"
                                                            badge="2"
                                                        />

                                                        <FlowArrow color="indigo" label="Auth" />

                                                        <InternalComponent
                                                            icon={<Key className="w-5 h-5" />}
                                                            label="Backend Auth"
                                                            sublabel="Inject API Key"
                                                            color="blue"
                                                            badge="3"
                                                        />

                                                        <FlowArrow color="blue" label="Transform" />

                                                        <InternalComponent
                                                            icon={<ArrowRightLeft className="w-5 h-5" />}
                                                            label="Upstream"
                                                            sublabel="Mutate Body"
                                                            color="cyan"
                                                            badge="4"
                                                        />
                                                    </div>
                                                </div>

                                                {/* RESPONSE FLOW SECTION */}
                                                <div className="mt-3 mb-2">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Response Pipeline</span>
                                                        <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
                                                    </div>

                                                    {/* Response Flow Steps */}
                                                    <div className="flex items-center justify-between gap-1">
                                                        <ResponseStep
                                                            icon={<ArrowRight className="w-4 h-4 rotate-180 text-emerald-300" />}
                                                            label="Output"
                                                            sublabel="Stream to Client"
                                                        />

                                                        <FlowArrow color="emerald" reverse label="Clean" />

                                                        <ResponseStep
                                                            icon={<Filter className="w-4 h-4" />}
                                                            label="Headers"
                                                            sublabel="Filter Response"
                                                        />

                                                        <FlowArrow color="emerald" reverse label="Store" />

                                                        <ResponseStep
                                                            icon={<Database className="w-4 h-4" />}
                                                            label="Persist"
                                                            sublabel="Audit Trail"
                                                        />

                                                        <FlowArrow color="emerald" reverse label="Stats" />

                                                        <ResponseStep
                                                            icon={<BarChart3 className="w-4 h-4" />}
                                                            label="Metrics"
                                                            sublabel="Model Latency"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Bottom Status */}
                                                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                                                        <span className="text-accent-primary font-bold">Port 1975</span>
                                                        <span>•</span>
                                                        <span>ExtProc</span>
                                                        <span>•</span>
                                                        <span>SQLite</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent-success">Active</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* === RIGHT: AI MODEL BACKENDS === */}
                                    <div className="absolute pointer-events-auto" style={{ right: '2%', top: '120px', transform: 'translateY(-50%)' }}>
                                        <ModelCard icon={<Sparkles className="w-5 h-5" />} label="GPT-4o" provider="OpenAI" color="amber" />
                                    </div>
                                    <div className="absolute pointer-events-auto" style={{ right: '2%', top: '325px', transform: 'translateY(-50%)' }}>
                                        <ModelCard icon={<Activity className="w-5 h-5" />} label="Claude 3.5" provider="Anthropic" color="emerald" />
                                    </div>
                                    <div className="absolute pointer-events-auto" style={{ right: '2%', top: '530px', transform: 'translateY(-50%)' }}>
                                        <ModelCard icon={<Layers className="w-5 h-5" />} label="Gemini 1.5" provider="Google" color="blue" />
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 text-xs text-neutral-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
                                        <span>Request Flow</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-0.5 bg-accent-success rounded-full opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #10B981 0, #10B981 6px, transparent 6px, transparent 10px)' }} />
                                        <span>Response Flow</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50" />
                                        <span>Data Packet</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section >

                {/* Features Section */}
                < section id="features" className="max-w-7xl mx-auto px-6 py-24 relative z-10" >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl font-bold mb-4">Engineered for Performance</h2>
                        <p className="text-neutral-500 max-w-xl mx-auto">Knull Core strips away complexity to deliver a lean, AI-optimized data plane that fits anywhere.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Box className="w-6 h-6" />}
                            title="Standalone Binary"
                            description="Single 45MB executable that manages Envoy and the External Processor with zero external dependencies."
                        />
                        <FeatureCard
                            icon={<Zap className="w-6 h-6" />}
                            title="AI-Native Routing"
                            description="Native support for AIGatewayRoute and AIServiceBackend configurations out of the box."
                        />
                        <FeatureCard
                            icon={<Layers className="w-6 h-6" />}
                            title="ExtProc Integration"
                            description="Built-in AI External Processor for token counting, header mutation, and credential management."
                        />
                        <FeatureCard
                            icon={<Shield className="w-6 h-6" />}
                            title="No K8s Required"
                            description="Virtualized control plane runs Envoy Gateway logic locally on Linux, macOS, or Windows."
                        />
                        <FeatureCard
                            icon={<Database className="w-6 h-6" />}
                            title="Azure OpenAI Support"
                            description="Optimized for Azure OpenAI with automatic HTTP/1.1 enforcement and seamless API Key management."
                        />
                        <FeatureCard
                            icon={<Globe className="w-6 h-6" />}
                            title="Edge Resident"
                            description="Scale your AI infrastructure globally. Deploy Knull instances near your users for sub-millisecond overhead."
                        />
                    </div>
                </section >

                {/* Technical Section - Schematic Blueprint */}
                < section id="docs" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5 relative" >
                    {/* The Schematic Frame */}
                    < motion.div
                        initial={{ opacity: 0, y: 40 }
                        }
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[2.5rem] border border-white/10 bg-depth-1/50 backdrop-blur-xl overflow-hidden group"
                    >
                        {/* Decorative blueprint corners */}
                        < div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-accent-primary opacity-30" />
                        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-accent-primary opacity-30" />
                        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-accent-primary opacity-30" />
                        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-accent-primary opacity-30" />

                        <div className="flex flex-col lg:flex-row min-h-[600px]">
                            {/* Sticky Outline Sidebar - Integrated */}
                            <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-white/[0.02]">
                                <div className="p-8 sticky top-32">
                                    <div className="flex items-center gap-3 mb-10">
                                        <div className="w-10 h-10 rounded-xl bg-accent-primary/20 border border-accent-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                            <Command className="w-5 h-5 text-accent-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-black uppercase tracking-tight text-white">Schematic</h2>
                                            <p className="text-[9px] text-accent-primary font-mono font-bold uppercase tracking-[0.2em]">Blueprint v1.0</p>
                                        </div>
                                    </div>

                                    <nav className="space-y-2">
                                        {[
                                            { id: "deploy", label: "Build & Run", icon: <Terminal className="w-4 h-4" /> },
                                            { id: "enterprise", label: "Persistence", icon: <Shield className="w-4 h-4" /> },
                                            { id: "docker", label: "Virtualization", icon: <Box className="w-4 h-4" /> }
                                        ].map((item) => (
                                            <a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white transition-all group"
                                            >
                                                <span className="text-neutral-600 group-hover:text-accent-primary transition-colors">{item.icon}</span>
                                                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                                            </a>
                                        ))}
                                    </nav>

                                    <div className="mt-20 p-5 rounded-2xl bg-black/40 border border-white/5">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Environment</div>
                                            <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] text-emerald-400 font-bold uppercase">Ready</div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full w-[85%] bg-accent-primary animate-pulse" />
                                            </div>
                                            <div className="flex justify-between text-[8px] font-mono text-neutral-600">
                                                <span>CPU_LOAD</span>
                                                <span>CORE_1975</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Area - Framed */}
                            <div className="flex-1 p-8 lg:p-12 bg-black/20">
                                <div className="max-w-4xl mx-auto space-y-24">
                                    <div id="deploy" className="animate-rise-in scroll-mt-32">
                                        <h2 className="text-4xl font-bold mb-10 tracking-tight">Deploy in Seconds</h2>
                                        <div className="space-y-12">
                                            <div>
                                                <h3 className="text-lg font-bold mb-5 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                                                        <Terminal className="w-4 h-4 text-accent-primary" />
                                                    </div>
                                                    Build from Source
                                                </h3>
                                                <CodeBlock code="make build" />
                                                <p className="mt-4 text-xs text-neutral-500 font-mono italic">Binary location: <code className="text-accent-primary not-italic">./bin/knull</code></p>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-bold mb-5 flex items-center gap-3 text-emerald-400">
                                                    <Zap className="w-4 h-4" />
                                                    Run with Config
                                                </h3>
                                                <CodeBlock language="bash" code={`# Run with a YAML configuration file\n./bin/knull run examples/knull.yaml\n\n# All settings are persisted to SQLite automatically\n./bin/knull run`} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-12 animate-rise-in [animation-delay:200ms]">
                                        <div id="enterprise" className="scroll-mt-32">
                                            <h2 className="text-4xl font-bold mb-10 tracking-tight">Enterprise Ready</h2>
                                            <div id="persistence" className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group scroll-mt-32">
                                                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <div className="relative z-10">
                                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                        <Shield className="w-5 h-5 text-accent-primary" />
                                                        Persistence Architecture
                                                    </h3>
                                                    <p className="text-neutral-400 mb-8 leading-relaxed text-sm">
                                                        Knull Core bridges the gap between YAML-based configuration and dynamic runtime state by syncing everything to a local SQLite engine.
                                                    </p>
                                                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-black/60 border border-white/5">
                                                        <Database className="w-8 h-8 text-accent-primary" />
                                                        <div>
                                                            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">Storage Engine</div>
                                                            <code className="text-[10px] text-accent-primary">~/.local/share/knull/knull.db</code>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="docker" className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-indigo-900/10 border border-blue-500/20 scroll-mt-32">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30">
                                                    <Container className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <h3 className="text-xl font-bold">Docker Deployment</h3>
                                            </div>
                                            <CodeBlock language="bash" code={`docker run -d \\\n  --name knull-gw \\\n  -p 1975:1975 \\\n  -v knull-data:/data \\\n  -v $(pwd)/knull.yaml:/app/config.yaml \\\n  knull:latest run /app/config.yaml`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div >
                </section >

                {/* CTA Section */}
                < motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto px-6 py-40 text-center"
                >
                    <div className="relative p-16 rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-50" />
                        <h2 className="text-5xl font-bold mb-8 tracking-tighter">Accelerate your AI Roadmap</h2>
                        <p className="text-neutral-400 mb-12 text-lg max-w-2xl mx-auto leading-relaxed">
                            Knull Core provides the visibility and control required for production AI scaling.
                            Start routing production traffic in minutes.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <Link href="/auth/login" className="px-10 py-5 rounded-2xl bg-accent-primary text-white font-black hover:bg-accent-primary/90 transition-all shadow-xl shadow-accent-primary/20 hover:scale-105 active:scale-95">
                                Get Instant Access
                            </Link>
                            <Link href="https://github.com/project-l/knull" className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-3">
                                <Activity className="w-5 h-5 text-neutral-400" />
                                Project GitHub
                            </Link>
                        </div>
                    </div>
                </motion.section >
            </main >

            <footer className="border-t border-white/5 py-20 bg-black/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/knull.png"
                                    alt="KNULL Logo"
                                    fill
                                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                            <span className="font-bold text-xl tracking-tight">KNULL CORE</span>
                        </div>
                        <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
                            The open-source AI Gateway for high-performance engineering teams. Built with Go, Envoy, and passion.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Release Notes</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-white mb-6">Community</h4>
                        <ul className="space-y-4 text-sm text-neutral-500">
                            <li><Link href="#" className="hover:text-white transition-colors">GitHub Discord</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contributor Guide</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Apache License</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest flex items-center gap-4">
                        <span>© 2026 PROJECT KNULL</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-800" />
                        <span>v0.1.0-alpha</span>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                            <Globe className="w-4 h-4 text-neutral-400" />
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    );
}

// === COMPONENT DEFINITIONS ===

function SourceNode({ icon, label, sublabel }: { icon: React.ReactNode, label: string, sublabel: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, x: 5 }}
            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 group w-[160px]"
        >
            <div className="text-neutral-400 group-hover:text-white transition-colors shrink-0">{icon}</div>
            <div>
                <div className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">{label}</div>
                <div className="text-[10px] text-neutral-500">{sublabel}</div>
            </div>
        </motion.div>
    )
}

function InternalComponent({ icon, label, sublabel, color, badge }: { icon: React.ReactNode, label: string, sublabel: string, color: "violet" | "indigo" | "blue" | "cyan", badge: string }) {
    const colorMap = {
        violet: "from-violet-500/20 to-violet-900/10 border-violet-500/30 text-violet-400",
        indigo: "from-indigo-500/20 to-indigo-900/10 border-indigo-500/30 text-indigo-400",
        blue: "from-blue-500/20 to-blue-900/10 border-blue-500/30 text-blue-400",
        cyan: "from-cyan-500/20 to-cyan-900/10 border-cyan-500/30 text-cyan-400",
    }
    const badgeColorMap = {
        violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
        indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    }
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative p-4 rounded-xl bg-gradient-to-br ${colorMap[color]} border backdrop-blur-md transition-all duration-300 group`}
        >
            {/* Badge */}
            <div className={`absolute -top-2 right-2 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border ${badgeColorMap[color]}`}>
                {badge}
            </div>
            <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <div>
                    <div className="text-xs font-bold">{label}</div>
                    <div className="text-[9px] text-neutral-500 mt-0.5">{sublabel}</div>
                </div>
            </div>
        </motion.div>
    )
}

function ModelCard({ icon, label, provider, color }: { icon: React.ReactNode, label: string, provider: string, color: "amber" | "emerald" | "blue" }) {
    const colorMap = {
        amber: "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50 text-amber-400",
        emerald: "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400",
        blue: "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50 text-blue-400",
    }
    return (
        <motion.div
            whileHover={{ scale: 1.05, x: -5 }}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 group w-[160px] ${colorMap[color]}`}
        >
            <div className="shrink-0">{icon}</div>
            <div>
                <div className="text-sm font-semibold">{label}</div>
                <div className="text-[10px] opacity-60">{provider}</div>
            </div>
        </motion.div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-accent-primary/40 hover:bg-white/[0.08] transition-all duration-500 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                {icon}
            </div>
            <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-8 group-hover:scale-110 group-hover:bg-accent-primary/20 transition-all duration-500">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                {description}
            </p>
        </motion.div>
    );
}

function CodeBlock({ code, language = "bash" }: { code: string, language?: string }) {
    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-primary/30 to-blue-500/30 rounded-[1.5rem] blur opacity-20 group-hover:opacity-100 transition duration-1000"></div>
            <pre className="relative p-6 rounded-[1.5rem] bg-black/90 border border-white/10 font-mono text-xs overflow-x-auto custom-scrollbar">
                <code className="text-neutral-300 leading-relaxed">{code}</code>
            </pre>
            <button
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                onClick={() => navigator.clipboard.writeText(code)}
                title="Copy to clipboard"
            >
                <Code2 className="w-4 h-4 text-neutral-400" />
            </button>
        </div>
    );
}

function SmartphoneIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
    )
}

function FlowArrow({ color, label, reverse = false }: { color: "violet" | "indigo" | "blue" | "cyan" | "emerald", label: string, reverse?: boolean }) {
    const colorMap = {
        violet: "text-violet-400",
        indigo: "text-indigo-400",
        blue: "text-blue-400",
        cyan: "text-cyan-400",
        emerald: "text-emerald-400",
    }
    const bgMap = {
        violet: "from-violet-500/50 to-violet-500/10",
        indigo: "from-indigo-500/50 to-indigo-500/10",
        blue: "from-blue-500/50 to-blue-500/10",
        cyan: "from-cyan-500/50 to-cyan-500/10",
        emerald: "from-emerald-500/50 to-emerald-500/10",
    }
    return (
        <div className="flex flex-col items-center gap-0.5 shrink-0">
            <div className={`w-8 h-0.5 bg-gradient-to-r ${bgMap[color]} rounded-full relative ${reverse ? 'rotate-180' : ''}`}>
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3.5px] border-t-transparent border-b-[3.5px] border-b-transparent border-l-[6px] ${color === 'emerald' ? 'border-l-emerald-400 shadow-[2px_0_10px_rgba(16,185,129,0.5)]' : 'border-l-current'} ${colorMap[color]}`} />
            </div>
            <span className={`text-[7px] font-bold uppercase tracking-wider ${colorMap[color]} opacity-70`}>{label}</span>
        </div>
    )
}

function ResponseStep({ icon, label, sublabel }: { icon: React.ReactNode, label: string, sublabel: string }) {
    return (
        <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 transition-all hover:bg-emerald-500/10 hover:scale-105">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                {icon}
            </div>
            <div className="text-center">
                <div className="text-[9px] font-bold text-emerald-400">{label}</div>
                <div className="text-[7px] text-neutral-500">{sublabel}</div>
            </div>
        </div>
    )
}

