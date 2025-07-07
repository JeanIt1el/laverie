import React, { useState } from 'react';
import { Bell, Search, ChevronDown, User, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  userRole: 'admin' | 'superviseur' | 'employe';
  userName: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const roleLabels = {
  admin: 'Administrateur',
  superviseur: 'Superviseur',
  employe: 'Employé'
};

export default function Header({ userRole, userName, isDarkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className={`shadow-sm border-b transition-colors ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    } px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className={`text-2xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Tableau de Bord
          </h2>
          <div className={`h-6 w-px transition-colors ${
            isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
          }`}></div>
          <span className={`text-sm transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}>
            {roleLabels[userRole]}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-lg transition-all ${
              isDarkMode 
                ? 'text-amber-400 hover:bg-slate-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className={`p-2 rounded-lg transition-all ${
              isDarkMode 
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}>
              <Bell className="w-5 h-5" />
            </button>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
          </div>

          {/* User Menu */}
          <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
            isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
          }`}>
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {userName}
              </span>
              <span className={`text-xs transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-500'
              }`}>
                {roleLabels[userRole]}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-colors ${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            }`} />
          </div>
        </div>
      </div>
    </header>
  );
}