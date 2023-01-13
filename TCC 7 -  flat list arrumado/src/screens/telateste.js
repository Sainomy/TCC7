const tick = () => {
  var colorcode =
    "rgb(" +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    "," +
    Math.floor(Math.random() * 256) +
    ")";
  const images = [
    "https://imgur.com/xSQ9JZC.jpg",
    "https://imgur.com/R90UNeJ.jpg",
    "https://imgur.com/SAW83ZY.jpg",
    "https://imgur.com/6ax0o8i.jpg",
    "https://i.imgur.com/xSQ9JZC.jpg",
    "https://i.imgur.com/SAW83ZY.jpg",
  ];
  const element = (
    <>
      <div className="container" style={{ background: colorcode }}>
        <div className="card" style={{ background: colorcode }}>
          <div className="profile_details">
            <div className="profile_images">
              <img src="https://i.imgur.com/G1pXs7D.jpg" />
            </div>
            <div className="profile">
              <h2>John Alexender</h2>
              <div className="specification">
                <span>UX Designer</span>
                <small className="line"></small>
                <span>California, USA</span>
              </div>
              <button>Follow</button>
            </div>
          </div>
          <div className="recent_likes">
            <h5>Recent Likes</h5>
            <ul className="like_photos">
              {images.map((image) => (
                <li>
                  <img src={image} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
  ReactDOM.render(element, document.getElementById("root"));
};

setInterval(tick, 3000);
