// MusicalTheaterCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import './MusicalTheaterCarousel.css'; // optional styling

const videos = [
  { title: "Too Sweet - Hozier", url: 'https://www.youtube.com/embed/LB5AzCmnAG4' },
  { title: "Numb - Linkin Park", url: 'https://www.youtube.com/embed/9kgkPOKvMBU' },
  { title: "Red Wine Supernova - Chappell Roan", url: 'https://www.youtube.com/embed/6UzYzjAZsi4' },
  { title: "Espresso - Sabrina Carpenter", url: 'https://www.youtube.com/embed/6nl5_LIqTJo?feature=share' },
  { title: "Heart Attack - Demi Lovato", url: 'https://www.youtube.com/embed/AC5Gf1XDgTI' },
  { title: "Love Story - Taylor Swift", url: 'https://www.youtube.com/embed/zeU-FWpQctg' },
  { title: "Super Graphic Ultra Modern Girl - Chappell Roan", url: 'https://www.youtube.com/embed/h3_e0VAv_zo' },
];

const PopCarousel = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
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

export default PopCarousel;
