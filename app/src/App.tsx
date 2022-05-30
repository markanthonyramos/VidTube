import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { AccessTokenProvider } from "./contexts/AccessTokenContext";
import { Register } from "./views/Register";
import { Login } from "./views/Login";
import { FC } from "react";
import { MessageProvider } from "./contexts/MessageContext";
import { SuccessProvider } from "./contexts/SuccessContext";
import { UserProvider } from "./contexts/UserContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Logout } from "./views/Logout";
import { Channel } from "./views/Channel";
import { Notification } from "./components/Notification";
import { Video } from "./views/Video";

export const App: FC = () => {
  return (
    <Router>
      <UserProvider>
        <AccessTokenProvider>
          <MessageProvider>
            <SuccessProvider>
              <div className="App">
                <Navbar />
                <Switch>
                  <ProtectedRoute exact path="/" component={Home} />
                  <ProtectedRoute exact path="/login" component={Login} />
                  <ProtectedRoute exact path="/logout" component={Logout} />
                  <ProtectedRoute exact path="/register" component={Register} />
                  <ProtectedRoute exact path="/channel" component={Channel} />
                  <ProtectedRoute exact path="/video/:videoId" component={Video} />
                </Switch>
                <Notification />
              </div>
            </SuccessProvider>
          </MessageProvider>
        </AccessTokenProvider>
      </UserProvider>
    </Router>
  );
}