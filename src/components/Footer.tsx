import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              About DisasterAid
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Empowering communities with AI-driven disaster response and resource management.
              Working together to make a difference when it matters most.
            </p>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" /> for humanity
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                  Emergency Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                  Resource Centers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                  Training
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                support@disasteraid.org
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                Emergency Hotline:
                <span className="block font-semibold text-red-600 dark:text-red-400">
                  1-800-DISASTER
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Stay updated with our latest news and emergency alerts
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} DisasterAid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}