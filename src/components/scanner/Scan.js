import React, { useState, useRef, useEffect } from 'react';
import QrReader from 'modern-react-qr-reader';
import { useNavigate } from 'react-router';

export default function Scan() {
    const [result, setResult] = useState('No result');
    const navigate = useNavigate()
    const handleScan = (data) => {
        if (data) {
            setResult(data);
            navigate('/scan-verify')
            console.log(result);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div>
            <QrReader
                delay={300}
                facingMode={'environment'}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            <p>{result}</p>
        </div>
    );
}

