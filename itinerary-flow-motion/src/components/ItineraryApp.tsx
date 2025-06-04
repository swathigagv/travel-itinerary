import React, { useState } from 'react';
import ItineraryDay from './ItineraryDay';
import { Toaster } from '@/components/ui/toaster';
import Indiangate from './ui/images/indiagate.jpeg';
import Redfort from './ui/images/redfort.jpeg';
import lotustemple from './ui/images/lotus temple.jpeg';
import tomb from './ui/images/humayuntomb.jpeg';
import minar from './ui/images/qutub minar.jpeg';

interface Activity {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  time?: string;
}

const sampleActivities: Activity[] = [
  {
    id: '1',
    name: 'India Gate',
    image: Indiangate,
    rating: 4.5,
    reviews: 25692,
    description: 'India Gate is a war memorial located in New Delhi, along the Rajpath. It is dedicated to the 82,000 soldiers, both Indian and British, who died in various wars.',
    time: '2 hrs'
  },
  {
    id: '2',
    name: 'Red Fort',
    image: Redfort,
    rating: 4.3,
    reviews: 18739,
    description: 'The Red Fort is a historical fort in the old city of Delhi area, on the banks of the Yamuna river.',
    time: '3 hrs'
  },
  {
    id: '3',
    name: 'Qutub Minar',
    image: minar,
    rating: 4.4,
    reviews: 15048,
    description: 'Qutub Minar is a minaret and a famous tower located in the Qutub complex. It is a UNESCO World Heritage Site in Delhi\'s Mehrauli area.',
    time: '1.5 hrs'
  },
  {
    id: '4',
    name: 'Lotus Temple',
    image: lotustemple,
    rating: 4.6,
    reviews: 32744,
    description: 'Located in the national capital of New Delhi, the Lotus Temple is an architectural marvel dedicated to the Bahai faith.',
    time: '1 hr'
  },
  {
    id: '5',
    name: 'Humayun\'s tomb',
    image: tomb,
    rating: 4.5,
    reviews: 9854,
    description: 'Humayun\'s tomb is the final resting place of the Mughal Emperor Humayun.',
    time: '2 hrs'
  }
];

const ItineraryApp: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(sampleActivities);

  const handleActivitiesReorder = (newActivities: Activity[]) => {
    setActivities(newActivities);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Delhi Itinerary</h1>
            <p className="text-gray-600">Drag activities to reorder your day</p>
          </div>
          
          <ItineraryDay
            day="Day 1"
            activities={activities}
            onActivitiesReorder={handleActivitiesReorder}
          />
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>💡 Tip: Drag the colored bar to reorder activities</p>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ItineraryApp;
