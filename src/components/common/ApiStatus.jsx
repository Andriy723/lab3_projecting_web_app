// src/components/common/ApiStatus.jsx
import { useEffect, useState } from 'react';
import api from '../../services/api';

const ApiStatus = () => {
    const [status, setStatus] = useState('checking...');
    const [version, setVersion] = useState('');

    useEffect(() => {
        const checkApi = async () => {
            try {
                const response = await api.get('/health');
                setStatus('online');
                setVersion(response.data.version);
            } catch (error) {
                setStatus('offline');
                console.error('API connection error:', error);
            }
        };

        checkApi();
    }, []);

    return (
        <div className="fixed bottom-4 right-4 bg-white p-2 rounded shadow text-sm">
            API Status: <span className={status === 'online' ? 'text-green-500' : 'text-red-500'}>
        {status}
      </span>
            {version && ` | v${version}`}
        </div>
    );
};

export default ApiStatus;