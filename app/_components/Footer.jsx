import React from "react";
import Link from "next/link";
import { IoMailOpen } from "react-icons/io5";
import { FaGithub, FaTwitter, FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Schultetable.com
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Train your brain with the world's most engaging Schulte table
              exercises. Join thousands of users improving their cognitive
              abilities daily.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-gray-700 transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="mailto:contact@schultetable.com"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <IoMailOpen size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2">
              <Link
                href="/how-to-play"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                How to Play
              </Link>
              <Link
                href="/leaderboard"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Leaderboard
              </Link>
              <Link
                href="/practice"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Practice
              </Link>
              <Link
                href="/blog"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Benefits Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Benefits</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <FaHeart size={14} className="text-green-600" />
                </span>
                Improved reading speed and comprehension
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <FaHeart size={14} className="text-blue-600" />
                </span>
                Enhanced peripheral vision awareness
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                  <FaHeart size={14} className="text-purple-600" />
                </span>
                Better concentration and focus
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-2">
                  <FaHeart size={14} className="text-pink-600" />
                </span>
                Developed cognitive flexibility
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © {currentYear} Schultetable.com - Train Your Brain, Expand Your
              Mind
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <Link
                href="/terms"
                className="hover:text-blue-600 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="hover:text-blue-600 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="hover:text-blue-600 transition-colors"
              >
                Cookies
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
