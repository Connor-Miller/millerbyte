import React, { useState } from 'react';
import './home.css';
import SortableResizableTable from '../components/SortableResizableTable';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'; // Update import to use @tanstack/react-query
import { apiRequest } from '../utils/clientAPIService';
import { TacoBottle } from '../utils/holoTacoTypes';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import AddBottleModal from '../components/holoTaco/addPolishModal';

interface HoloTacoTrackerData {
    name: string;
    formula: string;
    opened: string;
    swatched: string;
    retired: string;
    limited: string;
    quantity: number;
    location: string;
}

const HoloTacoTracker: React.FC = () => {

    const email = 'bookdolphin84@gmail.com';
    const [isBottleModalOpen, setIsBottleModalOpen] = useState(false);


    const bottlesQuery = useQuery({ 
        queryKey: ['bottles'], 
        queryFn: () => apiRequest(`/api/bottles?email=${email}`, 'GET') 
    });
    const addBottleMutation = useMutation({
        mutationFn: (newBottle: TacoBottle) => apiRequest(`/api/bottles`, 'POST', {
            ...newBottle,
            email: email,
            bottleId: uuidv4(), // Generate a new GUID using uuidv4
        }),
    });

    const polishQuery = useQuery<any, Error, any, string[]>({
        queryKey: ['polishes'], 
        queryFn: () => apiRequest('/api/polishes', 'GET'),
    } as UseQueryOptions<any, Error, any, string[]>); // Cast to UseQueryOptions
    
    return (
        <>
            <SortableResizableTable
                columns={[
                { Header: 'Name', accessor: 'name', type: 'string' },
                { Header: 'Formula', accessor: 'formula', type: 'string' },
                { Header: 'Opened', accessor: 'opened', type: 'string' },
                { Header: 'Swatched', accessor: 'swatched', type: 'string' },
                { Header: 'Retired', accessor: 'retired', type: 'string' },
                { Header: 'Limited', accessor: 'limited', type: 'string' },
                { Header: 'Quantity', accessor: 'quantity', type: 'number' },
                { Header: 'Location', accessor: 'location', type: 'string' },
            ]}
            data={bottlesQuery.data}
            title="Polish Tracker"
            onAddRow={() => setIsBottleModalOpen(true)}
            />
            <AddBottleModal
                isOpen={isBottleModalOpen}
                onClose={() => setIsBottleModalOpen(false)}
                ownerEmail={email}
            />

            <SortableResizableTable
                columns={[
                    { Header: 'Polish Name', accessor: 'polishname', type: 'string' },
                    { Header: 'Formula Name', accessor: 'formulaname', type: 'string' },
                    { Header: 'Retired', accessor: 'retired', type: 'boolean' },
                    { Header: 'Limited', accessor: 'limited', type: 'boolean' },
                    { Header: 'Release Date', accessor: 'releasedate', type: 'date' },
                    { Header: 'Collection Name', accessor: 'collectionname', type: 'string' },
                ]}
                data={polishQuery.data}
                title="Polish Database"
            />
        </>
    );
};

export default HoloTacoTracker;
