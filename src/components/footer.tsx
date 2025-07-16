'use client'

import { FaFileAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black min-h-[200px] flex flex-col items-start justify-center text-white space-y-10 px-20 py-8">
        <h2 className="text-left">Let's work together!</h2>
        <div className="flex flex-col">
            <p className="font-mono text-left text-lg">Email: thamzien@gmail.com</p>
            <p className="font-mono text-left text-lg">Contact: 61 450 190 503</p>
        </div>
        
        {/* Links */}
        <div className="flex gap-8 font-mono text-lg">
            <a  href="/files/YourResume.pdf" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-amber-400 transition"
            >
                <FaFileAlt /> Resume
            </a>

            <a  href="https://www.linkedin.com/in/zi-en-tham-605a40161/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-amber-400 transition"
            >
                <FaLinkedin /> LinkedIn
            </a>
            <a  href="https://github.com/zenzen26/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-color-amber transition"
            >
                <FaGithub size={24} /> GitHub
            </a>
        </div>
    </footer>
  )
}
