import React from "react";

import "./Footer.css";
function Footer() {
  return (
    <footer>
      <div className="content">
        <div className="left box">
          <div className="upper">
            <div className="topic">About us</div>
            <p>
              Netflix is a subscription-based streaming service that allows our
              members to watch TV shows and movies without commercials on an
              internet-connected device. You can also download TV shows and
              movies to your iOS, Android, or Windows 10 device and watch
              without an internet connection.
            </p>
          </div>
          <div className="lower">
            <div className="topic">Contact us</div>
            <div className="phone">
              <a
                href="https://www.linkedin.com/in/m-m-akhtar-a78361196/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-phone-volume"></i>+0000000000
              </a>
            </div>
            <div className="email">
              <a
                href="https://www.linkedin.com/in/m-m-akhtar-a78361196/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-envelope"></i>abc@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="middle box">
          <div className="topic">What You Can Do</div>
          <div>
            <a
              href="https://www.linkedin.com/in/m-m-akhtar-a78361196/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Movies
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/m-m-akhtar-a78361196/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch TV Shows
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/m-m-akhtar-a78361196/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add Favorite
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/m-m-akhtar-a78361196/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Trailer
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/m-m-akhtar-a78361196/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find Movies
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/m-m-akhtar-a78361196/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Binge Watch Everything
            </a>
          </div>
        </div>
        <div className="right box">
          <div className="topic">Subscribe us</div>
          <h2 className="topic">We Will Be Very Happy If You SignUp </h2>
        </div>
      </div>
      <div className="bottom">
        <p>
          Copyright © 2021{" "}
          <a href="https://www.linkedin.com/in/m-m-akhtar-a78361196/">
            Akhtar Netflix
          </a>{" "}
          All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
