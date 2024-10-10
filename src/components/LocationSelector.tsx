import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const locations = [
  { id: '1', name: 'La Comer' },
  { id: '2', name: 'Madero' },
  { id: '3', name: 'Jardines' },
  { id: '4', name: 'Bazaar' },
];

interface LocationSelectorProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  includeAllOption?: boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  selectedLocation, 
  setSelectedLocation, 
  includeAllOption = false 
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <select
        id="location"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">{t('selectLocation')}</option>
        {includeAllOption && <option value="all">{t('allLocations')}</option>}
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;