import React, { useState, useContext } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Mylist from "./components/Mylist";
import Nav from "./components/Nav";
import Profile from "./components/Profile/Profile";
import Uprofile from "./components/Profile/Uprofile";
import Row from "./components/Row";
import requests from "./Connection/requests";
import AuthContext from "./store/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  const [cardIsShown, setCardIsShown] = useState(false);
  const [profileIsShown, setProfileIsShown] = useState(false);
  const [favIsShown, setFavIsShown] = useState(false);

  const ctx = useContext(AuthContext);

  const showCardHandler = () => {
    setCardIsShown(true);
  };

  const hideCardIsShown = () => {
    setCardIsShown(false);
  };

  const showProfileHandler = () => {
    setProfileIsShown(true);
  };
  const hideProfileIsShown = () => {
    setProfileIsShown(false);
  };
  const showlistHandler = () => {
    if (ctx.isLoggedIn) {
      setFavIsShown(true);
    } else {
      toast.info("LogIn to Create List", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const hidelistHandler = () => {
    setFavIsShown(false);
  };

  console.log(ctx.isLoggedIn);
  return (
    <div className="App">
      <Nav
        onShow={showCardHandler}
        onPrf={showProfileHandler}
        showfav={showlistHandler}
        hidefav={hidelistHandler}
      />
      <Banner showfav={showlistHandler} />
      {cardIsShown && <Profile onClose={hideCardIsShown} />}
      {profileIsShown && <Uprofile onClose={hideProfileIsShown} />}

      {!favIsShown && (
        <React.Fragment>
          <Row
            title="Netflix Original"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
          />
          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
          <Row
            title="Sci-Fi Movies"
            fetchUrl={requests.fetchScifiMovies}
            isLargeRow
          />

          <Row title="Action Series" fetchUrl={requests.fetchActionShows} />
          <Row title="Comedy Series" fetchUrl={requests.fetchComedyShows} />
          <Row
            title="Hindi Movies"
            fetchUrl={requests.fetchHindiMovies}
            isLargeRow
          />
          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
          <Row
            title="Upcoming Movies"
            fetchUrl={requests.fetchUpcomingMovies}
            isLargeRow
          />
          <Row title="Crime Series" fetchUrl={requests.fetchCrimeShows} />
          <Row title="Anime Series" fetchUrl={requests.fetchAnimationShows} />
          <Row
            title="Sci-Fi Series"
            fetchUrl={requests.fetchScifiShows}
            isLargeRow
          />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentries} />
        </React.Fragment>
      )}
      {favIsShown && <Mylist />}
      <Footer />
    </div>
  );
}

export default App;
