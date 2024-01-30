import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import Users from "./pages/users/users";
import Admin from "./pages/admins/admin";
import Creators from "./pages/creators/creators";
import AddCreators from "./pages/add-creators/add-creators";
import Publications from "./pages/publications/publications";
import NFTs from "./pages/NFTs/nft";
import Tasks from "./pages/tasks/tasks";
import Report from "./pages/reports/report";
import Comments from "./pages/comments/comments";
import Login from "./pages/login/login";
import Logout from "./pages/logout/Logout";
import ResetPassword from "./pages/reset-password/reset-password";
import { RequireAuth } from "./components/auth/PrivateRoute";
import CreateAdmin from "./pages/admins/CreateAdmin";
import { RequirePermission } from "./components/auth/RequirePermission";
import AdminSettings from "./pages/admins/AdminSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/dashboard" />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route
            path="admins"
            element={
              <RequirePermission permission="Admin User Management">
                <Outlet />
              </RequirePermission>
            }
          >
            <Route index element={<Admin />} />
            <Route path="create/:id" element={<CreateAdmin />} />
            <Route path=":id" element={<AdminSettings />} />
          </Route>
          <Route path="creators" element={<Creators />} />
          <Route path="add-creators" element={<AddCreators />} />
          <Route path="publications" element={<Publications />} />
          <Route path="nfts" element={<NFTs />} />
          <Route path="comments" element={<Comments />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="reports" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
