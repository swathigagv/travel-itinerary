import React, { useState } from 'react';
import DraggableActivityCard from './DraggableActivityCard';
import RouteMap from './RouteMap';
import { Map } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  time?: string;
}

interface ItineraryDayProps {
  day: string;
  activities: Activity[];
  onActivitiesReorder: (newActivities: Activity[]) => void;
}

const ItineraryDay: React.FC<ItineraryDayProps> = ({
  day,
  activities,
  onActivitiesReorder,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  const [isRouteMapOpen, setIsRouteMapOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      return;
    }

    const newActivities = [...activities];
    const draggedActivity = newActivities[draggedIndex];
    
    // Remove the dragged item
    newActivities.splice(draggedIndex, 1);
    
    // Insert at the new position
    const insertIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newActivities.splice(insertIndex, 0, draggedActivity);
    
    onActivitiesReorder(newActivities);
    setDraggedIndex(null);
    setDraggedOverIndex(null);
  };

  const handleDragEnter = (index: number) => {
    setDraggedOverIndex(index);
  };

  const handleDragLeave = () => {
    setDraggedOverIndex(null);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-lg">Y2Z TRAVEL</h2>
              <p className="text-purple-100 text-sm">Itinerary</p>
            </div>
            <button className="text-white hover:text-purple-200 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-white font-semibold">{day}</h3>
            <button
              onClick={() => setIsRouteMapOpen(true)}
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              <Map className="w-4 h-4" />
              View Route
            </button>
          </div>
        </div>

        {/* Activities List */}
        <div className="p-4 space-y-0">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              onDragEnter={() => handleDragEnter(index)}
              onDragLeave={handleDragLeave}
              className="relative"
            >
              <DraggableActivityCard
                activity={activity}
                index={index}
                isDragging={draggedIndex === index}
                draggedOver={draggedOverIndex === index && draggedIndex !== index}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            </div>
          ))}
          
          {/* Drop zone at the end */}
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, activities.length)}
            className={`
              h-4 rounded-lg transition-all duration-300
              ${draggedOverIndex === activities.length ? 'bg-purple-100 border-2 border-dashed border-purple-400' : ''}
            `}
          />
        </div>
      </div>

      {/* Route Map Modal */}
      <RouteMap 
        activities={activities}
        isOpen={isRouteMapOpen}
        onClose={() => setIsRouteMapOpen(false)}
      />
    </>
  );
};

export default ItineraryDay;
