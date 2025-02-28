import { Dispatch, SetStateAction, useState } from 'react';

interface VisibilityState {
  buildings: boolean;
  equipment: boolean;
  silos: boolean;
  markers: boolean;
}

interface ControlsProps {
  visibility: VisibilityState;
  setVisibility: Dispatch<SetStateAction<VisibilityState>>;
}

export default function Controls({ visibility, setVisibility }: ControlsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleVisibility = (key: keyof VisibilityState) => {
    setVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className={`
      fixed top-4 right-4 z-10 transition-all duration-200
      ${isCollapsed ? 'w-12' : 'w-full max-w-[250px]'}
    `}>
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-3 bg-secondary">
          <h3 className={`font-medium text-sm ${isCollapsed ? 'sr-only' : ''}`}>
            Visibility Controls
          </h3>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-secondary-foreground hover:bg-opacity-10"
            aria-label={isCollapsed ? "Expand controls" : "Collapse controls"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
          </button>
        </div>
        
        {!isCollapsed && (
          <div className="p-3 space-y-3">
            <ControlItem 
              label="Buildings"
              checked={visibility.buildings}
              onChange={() => toggleVisibility('buildings')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
            
            <ControlItem 
              label="Equipment"
              checked={visibility.equipment}
              onChange={() => toggleVisibility('equipment')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
            
            <ControlItem 
              label="Silos"
              checked={visibility.silos}
              onChange={() => toggleVisibility('silos')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
            />
            
            <ControlItem 
              label="Markers"
              checked={visibility.markers}
              onChange={() => toggleVisibility('markers')}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface ControlItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
}

function ControlItem({ label, checked, onChange, icon }: ControlItemProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
        className="rounded border-input text-primary focus:ring-primary"
      />
      <span className="flex items-center">
        <span className="mr-2">{icon}</span>
        {label}
      </span>
    </label>
  );
} 