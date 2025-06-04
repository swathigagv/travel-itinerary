
import React from 'react';
import { X } from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  time?: string;
}

interface RouteMapProps {
  activities: Activity[];
  isOpen: boolean;
  onClose: () => void;
}

const RouteMap: React.FC<RouteMapProps> = ({ activities, isOpen, onClose }) => {
  const generateRouteUrl = () => {
    if (activities.length === 0) return '';
    
    const waypoints = activities.map(activity => 
      encodeURIComponent(activity.name + ', Delhi, India')
    );
    
    const origin = waypoints[0];
    const destination = waypoints[waypoints.length - 1];
    const waypointParams = waypoints.slice(1, -1).join('|');
    
    let url = `https://www.google.com/maps/dir/${origin}`;
    if (waypointParams) {
      url += `/${waypointParams}`;
    }
    url += `/${destination}`;
    
    return url;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Route Map</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Map Container */}
        <div className="flex-1 relative">
          <iframe
            src={generateRouteUrl()}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-b-2xl"
          />
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={() => window.open(generateRouteUrl(), '_blank')}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Open in Google Maps
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
