
import React, { useRef } from 'react';
import { MapPin, Paperclip, Trash2, Clock, Map } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Activity {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  time?: string;
}

interface DraggableActivityCardProps {
  activity: Activity;
  index: number;
  isDragging: boolean;
  draggedOver: boolean;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}

const DraggableActivityCard: React.FC<DraggableActivityCardProps> = ({
  activity,
  index,
  isDragging,
  draggedOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleGoogleMapsClick = () => {
    // Open Google Maps with the activity location
    const query = encodeURIComponent(activity.name + ', Delhi, India');
    const googleMapsUrl = `https://www.google.com/maps/search/${query}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select only PDF or DOCX files.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (1MB = 1024 * 1024 bytes)
    const maxSize = 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select a file under 1MB.",
        variant: "destructive",
      });
      return;
    }

    // File is valid
    toast({
      title: "File attached successfully",
      description: `${file.name} has been attached to ${activity.name}.`,
    });

    // Reset the input
    event.target.value = '';
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3 cursor-move
        transition-all duration-300 ease-out
        hover:shadow-md hover:border-purple-200 hover:-translate-y-1
        ${isDragging ? 'opacity-50 scale-95 rotate-2 shadow-2xl z-50' : ''}
        ${draggedOver ? 'border-purple-400 bg-purple-50 scale-102' : ''}
        touch-manipulation select-none
      `}
    >
      <div className="flex gap-3">
        {/* Drag Handle */}
        <div className="flex flex-col justify-center">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full opacity-60 hover:opacity-100 transition-opacity duration-200" />
        </div>

        {/* Activity Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={activity.image}
            alt={activity.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Activity Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate pr-2">
              {activity.name}
            </h3>
            <div className="flex gap-1 flex-shrink-0">
              <button 
                onClick={handleGoogleMapsClick}
                className="p-1 hover:bg-blue-100 rounded transition-colors duration-200"
                title="View on Google Maps"
              >
                <Map className="w-4 h-4 text-gray-400 hover:text-blue-600" />
              </button>
              <button 
                onClick={handleAttachmentClick}
                className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                title="Attach document (PDF/DOCX, max 1MB)"
              >
                <Paperclip className="w-4 h-4 text-gray-400 hover:text-blue-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors duration-200">
                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
              </button>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium text-gray-700 ml-1">
                {activity.rating}
              </span>
            </div>
            <span className="text-xs text-gray-500">({activity.reviews.toLocaleString()})</span>
            {activity.time && (
              <>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {activity.description}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1 mt-2">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">View on map</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableActivityCard;
