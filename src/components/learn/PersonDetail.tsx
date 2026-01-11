'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FamousPerson, AgeGroup, AgeGroupType } from '@/lib/types';
import { markPersonDiscovered, getPeopleDiscovered } from '@/lib/storage';
import { getImageUrl } from '@/lib/imageUrl';

interface PersonDetailProps {
  person: FamousPerson;
}

export function PersonDetail({ person }: PersonDetailProps) {
  const [selectedAge, setSelectedAge] = useState<AgeGroup | AgeGroupType>('6-8');
  const [isDiscovered, setIsDiscovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'achievements' | 'facts'>('about');

  useEffect(() => {
    markPersonDiscovered(person.slug);
    setIsDiscovered(getPeopleDiscovered().includes(person.slug));
  }, [person.slug]);

  const ageGroups: { value: AgeGroup | AgeGroupType; label: string; icon: string }[] = [
    { value: '3-5', label: 'Ages 3-5', icon: '🧒' },
    { value: '6-8', label: 'Ages 6-8', icon: '👦' },
    { value: '9-12', label: 'Ages 9-12', icon: '🧑' },
  ];

  const categoryColors: Record<string, string> = {
    Scientist: 'from-blue-500 to-cyan-500',
    Inventor: 'from-yellow-500 to-orange-500',
    Artist: 'from-pink-500 to-purple-500',
    Explorer: 'from-green-500 to-emerald-500',
    Leader: 'from-red-500 to-rose-500',
  };

  const categoryBg: Record<string, string> = {
    Scientist: 'bg-gradient-to-br from-blue-400/20 to-cyan-400/20',
    Inventor: 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20',
    Artist: 'bg-gradient-to-br from-pink-400/20 to-purple-400/20',
    Explorer: 'bg-gradient-to-br from-green-400/20 to-emerald-400/20',
    Leader: 'bg-gradient-to-br from-red-400/20 to-rose-400/20',
  };

  const colorClass = categoryColors[person.category] || 'from-purple-500 to-pink-500';
  const bgClass = categoryBg[person.category] || 'bg-gradient-to-br from-purple-400/20 to-pink-400/20';

  return (
    <div className="space-y-6">
      {/* Facebook-style Profile Header */}
      <div className="bg-white rounded-kid-xl shadow-soft overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-40 sm:h-56 md:h-72 bg-gradient-to-r overflow-hidden">
          {person.coverImage ? (
            <Image
              src={getImageUrl(person.coverImage)}
              alt={`${person.name} cover`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className={`w-full h-full ${bgClass} flex items-center justify-center`}>
              <div className="text-center">
                <span className="text-6xl sm:text-8xl opacity-30">{person.portrait}</span>
              </div>
            </div>
          )}
        </div>

        {/* Profile Info Section */}
        <div className="relative px-4 sm:px-6 pb-6">
          {/* Profile Picture and Name Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 -mt-12 sm:-mt-16">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl bg-white overflow-hidden">
                {person.profileImage ? (
                  <Image
                    src={getImageUrl(person.profileImage)}
                    alt={person.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                    <span className="text-4xl sm:text-5xl">{person.portrait}</span>
                  </div>
                )}
              </div>
              {/* Category Badge on Profile */}
              <div className={`absolute -bottom-1 -right-1 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r ${colorClass} text-white text-xs font-fredoka font-bold shadow-lg`}>
                {person.category}
              </div>
            </div>

            {/* Name and Title - Proper spacing on mobile and desktop */}
            <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0 sm:mb-3 w-full sm:w-auto">
              <h1 className="font-fredoka text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                {person.name}
              </h1>
              <p className="font-nunito text-base sm:text-lg md:text-xl text-gray-600 mt-1">
                {person.title}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mt-2">
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-500 font-nunito">
                  📍 {person.country}
                </span>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-500 font-nunito">
                  📅 {person.birthYear}{person.deathYear ? ` - ${person.deathYear}` : ' - Present'}
                </span>
              </div>
            </div>
          </div>

          {/* Famous For Banner */}
          <div className={`mt-6 p-3 sm:p-4 rounded-kid-lg bg-gradient-to-r ${colorClass} text-white`}>
            <p className="font-nunito text-sm sm:text-base text-center leading-relaxed">
              <span className="font-bold">Famous for:</span> {person.famousFor}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1 sm:gap-2 mt-6 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-3 sm:px-4 py-2 font-fredoka text-sm sm:text-base font-semibold transition-all whitespace-nowrap ${
                activeTab === 'about'
                  ? 'border-b-4 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📖 About
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-3 sm:px-4 py-2 font-fredoka text-sm sm:text-base font-semibold transition-all whitespace-nowrap ${
                activeTab === 'achievements'
                  ? 'border-b-4 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🏆 Achievements
            </button>
            <button
              onClick={() => setActiveTab('facts')}
              className={`px-3 sm:px-4 py-2 font-fredoka text-sm sm:text-base font-semibold transition-all whitespace-nowrap ${
                activeTab === 'facts'
                  ? 'border-b-4 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              💡 Fun Facts
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Facebook Timeline Style */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Sidebar - About Card */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-2 lg:order-1">
          {/* Quote Card */}
          <div className="bg-white rounded-kid-xl shadow-soft p-4 sm:p-6">
            <h3 className="font-fredoka text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>💬</span>
              <span>Famous Quote</span>
            </h3>
            <div className="relative py-2">
              <span className="absolute -top-1 -left-1 text-3xl sm:text-4xl text-purple-200">"</span>
              <p className="font-nunito text-sm sm:text-base text-gray-700 italic pl-5 sm:pl-6 pr-2 pt-2 pb-4">
                {person.quote}
              </p>
              <span className="absolute -bottom-2 -right-1 text-3xl sm:text-4xl text-purple-200">"</span>
            </div>
          </div>

          {/* Age Group Selector */}
          <div className="bg-white rounded-kid-xl shadow-soft p-4 sm:p-6">
            <h3 className="font-fredoka text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📚</span>
              <span>Reading Level</span>
            </h3>
            <div className="space-y-2">
              {ageGroups.map((age) => (
                <button
                  key={age.value}
                  onClick={() => setSelectedAge(age.value)}
                  className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-kid-lg font-fredoka text-sm sm:text-base font-semibold transition-all ${
                    selectedAge === age.value
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg sm:text-xl">{age.icon}</span>
                  <span>{age.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Timeline - Right Side */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 order-1 lg:order-2">
          {/* About Tab Content */}
          {activeTab === 'about' && (
            <div className="bg-white rounded-kid-xl shadow-soft p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center text-white flex-shrink-0`}>
                  <span className="text-lg sm:text-xl">📖</span>
                </div>
                <div>
                  <h2 className="font-fredoka text-lg sm:text-xl font-bold text-gray-800">
                    Their Story
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">Learn about {person.name.split(' ')[0]}</p>
                </div>
              </div>
              <div className="border-l-4 border-purple-200 pl-3 sm:pl-4 ml-4 sm:ml-5">
                <p className="font-nunito text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                  {person.ageContent[selectedAge]}
                </p>
              </div>
            </div>
          )}

          {/* Achievements Tab Content */}
          {activeTab === 'achievements' && (
            <div className="bg-white rounded-kid-xl shadow-soft p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center text-white flex-shrink-0`}>
                  <span className="text-lg sm:text-xl">🏆</span>
                </div>
                <div>
                  <h2 className="font-fredoka text-lg sm:text-xl font-bold text-gray-800">
                    Major Achievements
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">{person.achievements.length} milestones</p>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {person.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-kid-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-white font-fredoka text-xs sm:text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="font-nunito text-sm sm:text-base text-gray-700 flex-1">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fun Facts Tab Content */}
          {activeTab === 'facts' && (
            <div className="bg-white rounded-kid-xl shadow-soft p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center text-white flex-shrink-0`}>
                  <span className="text-lg sm:text-xl">💡</span>
                </div>
                <div>
                  <h2 className="font-fredoka text-lg sm:text-xl font-bold text-gray-800">
                    Did You Know?
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">{person.funFacts.length} interesting facts</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {person.funFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-kid-lg hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl sm:text-3xl flex-shrink-0">⭐</span>
                    <p className="font-nunito text-sm sm:text-base text-gray-700">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Discovered Badge */}
          {isDiscovered && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-kid-xl shadow-lg p-4 sm:p-6 text-white text-center">
              <span className="text-3xl sm:text-4xl mb-2 block">🎉</span>
              <h3 className="font-fredoka text-lg sm:text-xl font-bold">
                You&apos;ve Discovered {person.name}!
              </h3>
              <p className="font-nunito text-sm sm:text-base mt-2">Keep exploring to discover more inspiring people!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
