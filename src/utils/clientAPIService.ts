// Function to make a fetch request to the HoloTaco API
export async function apiRequest(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) {
    const baseUrl = 'http://localhost:3001'; // Adjust the base URL as needed
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    };

    try {
        const response = await fetch(`${baseUrl}${path}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error making API request:', error);
        throw error; // Rethrow the error for further handling
    }
}

// Example usage:
// const newBottle = await apiRequest('/api/bottles', 'POST', bottleData);

