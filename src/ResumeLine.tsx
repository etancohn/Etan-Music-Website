import React from 'react'

interface ResumeLineProps {
    year: string;
    show: string;
    theater: string;
    isUpcoming?: boolean;
}

function ResumeLine(props: ResumeLineProps) {
    const { year, show, theater, isUpcoming } = props;
    return (
        <div 
            style={{ fontSize: '0.8rem', textAlign: 'left' }}
        >
            <li>
                { !!isUpcoming && '*'}{ year } - <span style={{ fontStyle: 'italic' }}>{ show }</span> | { theater }
            </li>
        </div>

    )
}

export default ResumeLine
