// Each project becomes a floating holographic screen in the 3D scene.
// `position` is [x, y, z] around the central MAS logo. Adjust to reorder.
// `accent` tints the hologram frame + glow.
// Add or remove entries freely — the scene auto-arranges.

export const projects = [
  {
    id: "comsatsprephub",
    number: "01",
    title: "COMSATSPrepHub",
    tag: "Education · Exam Prep",
    featured: true,
    accent: "#38bdf8",
    preview: "/assets/comsatsprephub-preview.png",
    short:
      "Student-focused exam prep platform with verified past papers, practice quizzes, and performance analytics.",
    description:
      "A student-focused exam preparation platform built for COMSATS students with verified past papers, practice quizzes, and performance analytics in one place. Built around a real academic need: helping students prepare smarter with structured resources, quiz practice, and clearer performance tracking.",
    highlights: [
      "Includes verified past papers and subject-based exam resources",
      "Supports quiz-based preparation and smarter practice flows",
      "Highlights real-time analytics and student-focused usability",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Python", "Vercel"],
    links: {
      github: "https://github.com/MushtaqAhmadSaqi/COMSATSPrepHub",
      live: "https://comsatsprephub.vercel.app/",
    },
    position: [-6, 1.2, -2],
    rotation: [0, 0.5, 0],
  },
  {
    id: "edulearn",
    number: "02",
    title: "EduLearn",
    tag: "Education · Video Learning",
    accent: "#a78bfa",
    preview: "/assets/edulearn-preview.png",
    short:
      "Distraction-free learning platform with YouTube embedding, playlists, progress tracking, and focus tools.",
    description:
      "A distraction-free learning platform designed for educational video study, with support for embedded YouTube content, playlists, progress tracking, and focused learning tools. Designed to make online study more structured by combining video learning, note-taking, progress tracking, and focus-oriented features in one experience.",
    highlights: [
      "YouTube video embedding and playlist management",
      "Progress tracking, timestamped notes, and Pomodoro timer",
      "Focus mode, dark mode, gamification, and accessibility features",
    ],
    tech: ["JavaScript", "HTML", "CSS", "Lunr.js"],
    links: {
      github: "https://github.com/MushtaqAhmadSaqi/EduLearn",
      live: "",
    },
    position: [-3, 2.4, 3],
    rotation: [0, -0.4, 0],
  },
  {
    id: "multivid",
    number: "03",
    title: "MultiVid / Video Downloader",
    tag: "Utility · Flask",
    accent: "#f472b6",
    preview: "/assets/video-downloader-preview.png",
    short:
      "Local-first video downloader built with Flask and yt-dlp — paste a URL, pick a format, download.",
    description:
      "A local-first video downloader built with Flask and yt-dlp that lets users paste a video URL, preview available formats, and download media directly to their device. Built as a practical utility tool with emphasis on local use, format control, media processing, and a clean frontend experience.",
    highlights: [
      "Fetches video metadata (title, thumbnail, uploader, duration) before download",
      "Quality selection, MP3 extraction, and merged MP4 output with FFmpeg",
      "Flask backend, vanilla frontend, Docker setup, GitHub Pages landing",
    ],
    tech: ["Python", "Flask", "yt-dlp", "FFmpeg", "JavaScript", "Docker"],
    links: {
      github: "https://github.com/MushtaqAhmadSaqi/Video-Downloader",
      live: "",
    },
    position: [3, 2.4, 3],
    rotation: [0, 0.4, 0],
  },
  {
    id: "openprep",
    number: "04",
    title: "OpenPrep Platform",
    tag: "Education · AI-assisted",
    accent: "#38bdf8",
    preview: "/assets/openprep-preview.png",
    short:
      "Learning platform for Pakistani entrance exam prep: 2,100+ MCQs, structured practice, AI workflows.",
    description:
      "A learning platform designed to help Pakistani students prepare for entrance exams through structured MCQ practice, quiz workflows, and accessible educational content.",
    highlights: [
      "Prepared and organized 2,100+ MCQs for scale and structured practice",
      "Built with a student-first product mindset focused on accessibility",
      "Explored AI-assisted content workflows to improve learning support",
    ],
    tech: ["Python", "Flask", "HTML", "CSS", "JavaScript", "AI Workflow"],
    links: {
      github: "https://github.com/MushtaqAhmadSaqi",
      live: "",
    },
    position: [6, 1.2, -2],
    rotation: [0, -0.5, 0],
  },
  {
    id: "hotel",
    number: "05",
    title: "Hotel Management System",
    tag: "Java · OOP",
    accent: "#a78bfa",
    preview: "/assets/hotel-preview.png",
    short:
      "Java desktop app modeling hotel operations: room booking, staff handling, JSON persistence.",
    description:
      "A Java desktop application built to model hotel operations with room booking, staff handling, and persistent data management using object-oriented design.",
    highlights: [
      "Applied inheritance, encapsulation, and polymorphism in a practical system",
      "Room management and staff workflow handling",
      "JSON-based persistence for saving and retrieving data",
    ],
    tech: ["Java", "Swing", "OOP", "JSON"],
    links: {
      github: "https://github.com/MushtaqAhmadSaqi",
      live: "",
    },
    position: [0, 0.3, 5.5],
    rotation: [0, Math.PI, 0],
  },
  {
    id: "grade",
    number: "06",
    title: "COMSATS Grade Calculator",
    tag: "Academic Utility",
    accent: "#f472b6",
    preview: "/assets/grade-preview.png",
    short:
      "Web-based GPA calculator built around COMSATS grading rules — fast, simple, student-focused.",
    description:
      "A web-based academic calculator built around COMSATS grading rules to help students calculate GPA, understand weighted marks, and plan semesters more easily.",
    highlights: [
      "Designed around real local academic use cases",
      "Focused on simple UX and fast interaction",
      "Lightweight utility tool with practical everyday value",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    links: {
      github: "https://github.com/MushtaqAhmadSaqi",
      live: "",
    },
    position: [0, 3.2, -5.5],
    rotation: [0, 0, 0],
  },
];
