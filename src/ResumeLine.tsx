import { IconButton } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';

interface ResumeLineProps {
    year: string;
    show: string;
    theater: string;
    isUpcoming?: boolean;
    youtubeLink?: string;
}

function ResumeLine(props: ResumeLineProps) {
    const { year, show, theater, isUpcoming, youtubeLink } = props;
    return (
        <div 
            style={{ fontSize: '0.8rem', textAlign: 'left' }}
        >
            <li>
                { 
                    !!youtubeLink && 
                    <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                    <IconButton 
                        size='small'
                    >
                        <YouTubeIcon 
                            style={{ color: 'red', fontSize: '1.3rem', margin: '-0.5rem -0.1rem' }}
                        >
                        </YouTubeIcon>
                    </IconButton>
                    </a>
                }
                { !!isUpcoming && '*'}{ year } - <span style={{ fontStyle: 'italic' }}>{ show }</span> | { theater }
            </li>
        </div>

    )
}

export default ResumeLine
