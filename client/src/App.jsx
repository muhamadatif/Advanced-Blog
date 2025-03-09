import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppContainer from "./components/AppContainer";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <BrowserRouter>
        <ScrollToTop />
        {/*So that when we go from a rout to another we go to the top of the targeted page */}
        <Routes>
          <Route element={<AppContainer />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/post/:postSlug" element={<PostPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<OnlyAdminPrivateRoute />}>
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:postId" element={<UpdatePost />} />
            </Route>
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        glutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "bg-gray-0",
            color: "bg-gray-700",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
