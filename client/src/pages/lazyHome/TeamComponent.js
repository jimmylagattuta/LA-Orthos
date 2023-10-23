import React, { useState, useEffect } from 'react';

const TeamComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay of 2 seconds (adjust as needed)
        const delay = 1000;
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, delay);

        // Cleanup the timeout on component unmount
        return () => clearTimeout(timeoutId);
    }, []);

    if (isLoading) {
        // Show a loading state while waiting for the delay to complete
        return <div>Loading...</div>;
    }

    return (
        <div className='home-team'>
            <div className='section-content'>
                <h2 className='follow-us-title'>
                    Follow Us
                </h2>
                <div className='team-icon-container'>
                    <a style={{ color: 'white' }} href='https://www.facebook.com/profile.php?id=100083072153534' target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-facebook fa-2x'></i>
                    </a>
                    <a style={{ color: 'white' }} href='https://www.youtube.com/@LAOrthopedics' target='_blank' rel='noopener noreferrer'>
                        <i style={{ fontSize: '1.8em' }} className='fab fa-youtube fa-2x'></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TeamComponent;
