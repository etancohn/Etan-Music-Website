import { IconButtonProps, styled, IconButton, Card, CardActions, CardContent, CardHeader, Typography, Divider, Collapse } from '@mui/material';
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './MusicCard.css'

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
  
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
}));

interface MusicCardProps {
    title: string;
    description: any;
    secondDescription?: any;
    expandedContent?: any;
    expandText?: string;
}

function MusicCard(props: MusicCardProps) {
    const { title, description, expandedContent, expandText } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [delayedExpanded, setDelayedExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (!expanded) {
          setDelayedExpanded(true);
        } else {
          setTimeout(() => {
            setDelayedExpanded(false)
          }, 200)
        }
    };
    return (
      <div data-aos="flip-down">
        <Card 
          className='card' 
          style={{ maxHeight: delayedExpanded ? '1500px' : '310px' }}
          // sx={{ width: 430, height: 300 }}
          sx={{ 
            // width: 430, 
            height: 900 
          }}
        >
            <CardHeader 
                title={title} 
                sx={{ 
                  paddingBottom: '10px',
                  paddingTop: '10px'
                }}
                // subheader='subtitle'
            ></CardHeader>

            <CardContent
              sx={{ 
                paddingTop: 0,
              }}
            >
            <div className='first-description-paragraph'>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {description}
              </Typography>
            </div>
              {/* {secondDescription && 
              <div className='second-description-paragraph'>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {secondDescription}
                </Typography>
              </div>} */}
            </CardContent>
            <Divider />

            <CardActions disableSpacing>
              {/* <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton> */}
              {
                !!expandedContent && <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  {!expanded && <span className='more-txt'>{ expandText ?? "" }</span>}
                  <ExpandMoreIcon />
                </ExpandMore>
              }
            </CardActions>
          
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                { expandedContent }
              </CardContent>
            </Collapse>
        </Card>
      </div>
    )
}

export default MusicCard
