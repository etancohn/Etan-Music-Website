import { Typography } from "@mui/material"
import ResumeLine from "./ResumeLine"

export const mtExpandedContent = <div>
    <Typography style={{ fontWeight: 'bold', textDecoration: 'underline', }}>Recent Shows (* = upcoming)</Typography>
    <div style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }}>
        <ResumeLine 
            isUpcoming={true} 
            year="2025"
            show="Songs for a New World"
            theater="Concord Players"
        />
        <ResumeLine 
            isUpcoming={true} 
            year="2025"
            show="Beetlejuice Jr."
            theater="North Shore Childrens Theatre"
        />
        <ResumeLine 
            year="2025"
            show="The Lightning Thief"
            theater="Cambridge School of Weston"
        />
        <ResumeLine 
            year="2025"
            show="Fun Home"
            theater="Burlington Players (sub)"
        />
        <ResumeLine 
            year="2025"
            show="Honk"
            theater="Ayer-Shirley High School (sub)"
        />
        <ResumeLine 
            year="2025"
            show="Cinderella"
            theater="Chelsea High School"
        />
        <ResumeLine 
            year="2025"
            show="Something Rotten!"
            theater="Curtain Call Theatre"
        />
        <ResumeLine 
            year="2025"
            show="The Guy Who Didn't Like Musicals"
            theater="Boston Center for the Arts"
        />
        <ResumeLine
            year="2024"
            show="Winter Wonderettes"
            theater="Greater Boston Stage Company"
            youtubeLink="https://www.youtube.com/watch?v=nZW-FA_QTS4&list=PLfbyNxCSa0lVzJytuJww20mEhiVKui1_O&index=1"
        />
        <ResumeLine
            year="2024"
            show="Kiss of the Spider Woman"
            theater="A Common Thread Theater"
        />
        <ResumeLine
            year="2024"
            show="The Prom"
            theater="Cambridge School of Weston"
        />
        <ResumeLine
            year="2024"
            show="Cabaret"
            theater="Vokes Theater"
        />
        <ResumeLine
            year="2024"
            show="Newsies"
            theater="Suffolk University"
        />
        <ResumeLine
            year="2023"
            show="The Muses (original show)"
            theater="CMU (Carnegie Mellon) School of Drama"
            youtubeLink="https://www.youtube.com/watch?v=R_uwYc8AShY&feature=youtu.be"
        />
        <ResumeLine
            year="2023"
            show="9 to 5"
            theater="Scotch'n'Soda Theater"
        />
        <ResumeLine
            year="2022"
            show="This Old Haunt (original show)"
            theater="CMU School of Drama"
        />
        <ResumeLine
            year="2022"
            show="Newsies"
            theater="McKeesport Little Theater (sub)"
        />
        <ResumeLine
            year="2022"
            show="Something Rotten!"
            theater="Scotch'n'Soda Theater (co-music director, drums)"
        />
        <ResumeLine
            year="2021"
            show="Rocky Horror"
            theater="Scotch'n'Soda Theater"
        />
        <ResumeLine
            year="2021"
            show="Little Shop of Horrors"
            theater="Scotch'n'Soda Theater"
        />
        <ResumeLine
            year="2020"
            show="Behind Closed Doors (original show)"
            theater="Scotch'n'Soda Theater"
            youtubeLink="https://www.youtube.com/watch?v=PReWoscQbFQ&t=1s"
        />
        <ResumeLine
            year="2019"
            show="This Side Up (original show)"
            theater="CMU School of Music"
            youtubeLink="https://www.youtube.com/watch?v=xkq9TU1V5Lo&list=PLfbyNxCSa0lUr6mnf6x2bsAVvnaY3gfAR"
        />
        <ResumeLine
            year="2019"
            show="Catch Me If You Can"
            theater="Scotch'n'Soda Theater"
        />

    </div>
</div>

export const musicalTheaterDescription = <div className='card-middle'>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    Etan has experience in <span className="bold">regional</span>, <span className="bold">community</span>, and <span className="bold">school</span> theaters.
    Recent shows include <span className="italic">Winter Wonderettes</span> at Greater Boston Stage Company, and <span className="italic">Cabaret</span> at Vokes Theater.
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Other recent shows include <span className="italic">Kiss of the Spider Woman</span>, <span className="italic">The Prom</span>, <span className="italic">Newsies</span>, <span className="italic">Something Rotten!</span>, and <span className="italic">9 To 5.</span>
    </Typography>
</div>