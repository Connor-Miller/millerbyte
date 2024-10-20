import React, { useState } from 'react';
import './home.css';
import SortableResizableTable from '../components/SortableResizableTable';
import { useQuery } from '@tanstack/react-query'; // Update import to use @tanstack/react-query
import { getAllBottlesByEmail } from '../server/holoTaco/holoTacoBottleQueries'; // Import the function
import { apiRequest } from '../utils/clientAPIService';

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
    const [data, setData] = useState<HoloTacoTrackerData[]>(
        [
            { name: 'Pink Taco', formula: 'Metallic', opened: 'Yes', swatched: 'Yes', retired: 'No', limited: 'Yes', quantity: 1, location: 'Location 1' },
            { name: 'Blue Taco', formula: 'Multichrome', opened: 'Yes', swatched: 'Yes', retired: 'No', limited: 'Yes', quantity: 2, location: 'Location 2' },
            { name: 'Green Taco', formula: 'Crushed Holographic', opened: 'Yes', swatched: 'Yes', retired: 'No', limited: 'Yes', quantity: 3, location: 'Location 3' },
        ]
    );

    const { data: bottlesData, isLoading, error } = useQuery({ 
        queryKey: ['bottles'], 
        queryFn: () => apiRequest(`/api/bottles?email=${email}`, 'GET') 
    });

    const { data: polishData, isLoading: polishLoading, error: polishError } = useQuery({ 
        queryKey: ['polishes'], 
        queryFn: () => apiRequest('/api/polishes', 'GET') 
    });
    
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
                data={bottlesData}
            />

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
                data={polishData}
            />
        </>
    );
};

export default HoloTacoTracker;
