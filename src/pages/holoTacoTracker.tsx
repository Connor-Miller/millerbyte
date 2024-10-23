import React, { useState } from 'react';
import './home.css';
import SortableResizableTable from '../components/SortableResizableTable';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../utils/clientAPIService';
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
        queryFn: () => apiRequest(`/api/bottles?email=${email}`, 'GET'),
        refetchOnWindowFocus: false,
    });

    const polishQuery = useQuery<any, Error, any, string[]>({
        queryKey: ['polishes'], 
        queryFn: () => apiRequest('/api/polishes', 'GET'),
        refetchOnWindowFocus: false,
    } as UseQueryOptions<any, Error, any, string[]>);

    return (
        <>
            <AddBottleModal
                isOpen={isBottleModalOpen}
                onClose={() => setIsBottleModalOpen(false)}
                ownerEmail={email}
            />
            {bottlesQuery.isLoading ? (
                <div>Loading bottles...</div>
            ) : bottlesQuery.isError ? (
                <div>Error loading bottles: {bottlesQuery.error.message}</div>
            ) : (
                <SortableResizableTable
                    columns={[
                        { Header: 'Name', accessor: 'polishname', type: 'string' },
                        { Header: 'Formula', accessor: 'formulaname', type: 'string' },
                        { Header: 'Opened', accessor: 'isopened', type: 'string' },
                        { Header: 'Swatched', accessor: 'isswatched', type: 'string' },
                        { Header: 'Retired', accessor: 'retired', type: 'string' },
                        { Header: 'Limited', accessor: 'limited', type: 'string' },
                        { Header: 'Quantity', accessor: 'quantity', type: 'number' },
                        { Header: 'Location', accessor: 'location', type: 'string' },
                    ]}
                    data={bottlesQuery.data}
                    title="Polish Tracker"
                    onAddRow={(e) => {
                        e.preventDefault();
                        console.log("Adding row");
                        setIsBottleModalOpen(true)
                    }}
                />
            )}

            {polishQuery.isLoading ? (
                <div>Loading polish database...</div>
            ) : polishQuery.isError ? (
                <div>Error loading polish database: {polishQuery.error.message}</div>
            ) : (
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
            )}
        </>
    );
};

export default HoloTacoTracker;
