// MusicalTheaterCarousel.jsx
// @ts-ignore
import Slider from 'react-slick';
import './MusicalTheaterCarousel.css'; // optional styling

const videos = [
  { title: "As Long As You're Mine - Wicked", url: 'https://www.youtube.com/embed/bTUEODLPljg' },
  { title: "Satisfied - Hamilton", url: 'https://www.youtube.com/embed/lF7g9NMkc1w?feature=share' },
  { title: "When You're Home - In The Heights", url: 'https://www.youtube.com/embed/Re0Eo5_5N4c' },
  { title: "What I Did For Love - A Chorus Line", url: 'https://www.youtube.com/embed/UCUGC0GWVj0?feature=share' },
  { title: "Corner of the Sky - Pippin", url: 'https://www.youtube.com/embed/G2r0Tn_Kcms?feature=share' },
  { title: "Popular - Wicked", url: 'https://www.youtube.com/embed/0MPV6q_WHmY?feature=share' },
  { title: "Wish I Were Here - Next To Normal", url: 'https://www.youtube.com/embed/Nkv8QxUHRm4' },
  { title: "Dancing Through Life - Wicked", url: 'https://www.youtube.com/embed/QetcQ_k17VM' },
  // Add 10-15 total
];

const MusicalTheaterCarousel = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    lazyLoad: 'onDemand',
    // fade: true,
    speed: 500,
    slidesToShow: 3, // Change for mobile
    slidesToScroll: 2,
    waitForAnimate: false,
    customPaging: () => (
        <div className="custom-dot" />
      ),
    dotsClass: 'slick-dots custom-dot-container',
    responsive: [
      {
        breakpoint: 768, // tablet and below
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      {/* <h2 className="carousel-title">🎭 Musical Theater Covers</h2> */}
      <Slider {...settings}>
        {videos.map((video, index) => (
          <div key={index} className="carousel-slide">
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="250"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="video-title">{video.title}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MusicalTheaterCarousel;
