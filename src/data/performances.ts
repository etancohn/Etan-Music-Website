export interface Performance {
    year: number;
    title: string;
    venue: string;
    youtubeLink?: string;
}

export const notablePerformances: Performance[] = [
    {
        year: 2023,
        title: "Matthew Zwiebel's MT Cabaret",
        venue: 'CMU School of Music',
        youtubeLink: 'https://drive.google.com/drive/u/0/folders/1-2KTO7OUhAk_OIyjkZJznCCLnD7-TZug',
    },
    {
        year: 2023,
        title: 'Josiah Handelman Senior Recital',
        venue: 'CMU School of Music (congas)',
        youtubeLink: 'https://youtu.be/acaWBXm6aZM?t=676',
    },
    {
        year: 2022,
        title: 'Everything In Its Time: A Musical Cabaret',
        venue: 'CMU School of Music',
        youtubeLink: 'https://www.youtube.com/watch?v=ZG-V3VFSMrI&list=PLKIyoBAAgcNAxqKOVSolkEsEEs_b1mo4A&index=5',
    },
    {
        year: 2022,
        title: 'Annalise Rogers Senior Recital',
        venue: 'CMU School of Music',
        youtubeLink: 'https://youtu.be/LrmZbuuFCTg?t=3853',
    },
    {
        year: 2021,
        title: 'Matthew Rygelski Junior Recital',
        venue: 'CMU School of Music',
        youtubeLink: 'https://www.youtube.com/watch?v=EoweI1uCsw8',
    },
    {
        year: 2021,
        title: '2021 Annual Benefit Cabaret',
        venue: "Scotch'n'Soda Theater",
    },
    {
        year: 2019,
        title: 'Low Standards Cabaret',
        venue: 'CMU School of Drama',
        youtubeLink: 'https://www.youtube.com/watch?v=_sXI-I73skk&list=PLfbyNxCSa0lXjuMn2gkFwE81_rnxJ7NsH&index=1',
    },
    {
        year: 2019,
        title: '2019 Annual Benefit Cabaret',
        venue: "Scotch'n'Soda Theater",
    },
];
