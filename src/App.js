import styled from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import Search from "./pages/Search";
import User from "./pages/User";
import Tags from "./pages/Tags";


const Container = styled.div`
margin-left: 216px;

`;

const Main = styled.div`
`;

const Wrapper = styled.div`
margin: 0px 20px;
`;

function App() {
  const mode = JSON.parse(localStorage.getItem("darkMode")) ? true : false;
  const [darkMode, setDarkMode] = useState(mode);
  const theme = darkMode ? darkTheme : lightTheme;
  const {currentUser} = useSelector(state=>state.user);

  document.body.style.background = theme.bg;
  return (
    <ThemeProvider theme={theme}>
    <Container>
      <BrowserRouter>
      <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Main>
        <Navbar />
        <Wrapper>
        <Routes>
          <Route path="/">
            <Route index element={<Home type="random"/>} />
            <Route path="trend" element={<Home type="trend"/>} />
            <Route path="subscriptions" element={<Home type="sub"/>} />
            <Route path="search" element={<Search/>} />
            <Route path="user" element={<User/>} />
            <Route path="tags" element={<Tags/>} />
            <Route path="signin" element={currentUser ? <Home type="random"/>: <SignIn />} />
            <Route path="video">
              <Route path=":id" element={<Video />} />
            </Route>
          </Route>
        </Routes>
        </Wrapper>
      </Main>
      </BrowserRouter>
    </Container>
    </ThemeProvider>
  );
}

export default App;
