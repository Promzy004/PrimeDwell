import { Route, Routes } from "react-router-dom"
import Header from "./components/header"
import Home from "./pages/home"
import Agents from "./pages/agent"
import Error404 from "./pages/error404"
import Footer from "./components/footer"
import Properties from "./pages/properties"
import PropertyDetails from "./pages/propertyDetails"
import AgentDetails from "./pages/agentDetails"
import Register from "./pages/register"
import Login from "./pages/login"
import Contact from "./pages/contact"
import About from "./pages/about"
import FAQs from "./pages/faq"
import AgentDashboard from "./dashboards/agent/agentDashboard"
import Dashboard from "./dashboards/agent/pages/dashboard"
import AgentBuyers from "./dashboards/agent/pages/buyers"
import AgentProfile from "./dashboards/agent/pages/agentProfile"
import AdminDashboard from "./dashboards/admin/adminDashboard"
import Users from "./dashboards/admin/pages/users"
import AdminProfile from "./dashboards/admin/pages/adminProfile"
import DashboardSection from "./dashboards/admin/pages/dashboardSection"
import ProtectedRoute from "./protectedRoute"
import PublicRoute from "./publicRoute"
import AuthContextProvider from "./context/authContext"
import AgentContextProvider from "./context/agentContext"
import AdminContextProvider from "./context/adminContext"
import BuyerDashboard from "./dashboards/buyer/buyerDashboard"
import DashboardContent from "./dashboards/buyer/pages/dashboardContent"
import Favorite from "./dashboards/buyer/pages/favorite"
import ContactUs from "./dashboards/buyer/pages/contact"
import DashboardAgentDetails from "./dashboards/buyer/pages/agentDetails"
import BuyerProfile from "./dashboards/buyer/pages/buyerProfile"


function App() {

  return ( 
    <div>
      <AuthContextProvider>
        <AdminContextProvider>
          <AgentContextProvider>
            {/* <Header /> */}
            <Routes>
                {/* Routes that can't be seen when logged in */}
              <Route element={<PublicRoute />}>
                {/* <Route path="/" element={<Home />}/> */}
                <Route path="/" element={<Home />}/>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/agents" element={<Agents />} />
              <Route path="/properties" element={<Properties />} />
              {/* <Route path="/agent-details/:id" element={<Error404 />} /> */}
              <Route path="*" element={<Error404 />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/faqs" element={<FAQs />} />

              <Route element={<ProtectedRoute allowedRoles={['buyer']} />} >
                <Route path="/property-details/:id" element={<PropertyDetails />} />
                <Route path="/agent-details/:id" element={<AgentDetails />} />
              </Route>

              <Route path="/" element={<BuyerDashboard />}>
                <Route path="buyer-dashboard" element={<DashboardContent />} />
                <Route path="buyer-dashboard/favorite" element={<Favorite />} />
                <Route path="buyer-dashboard/contact" element={<ContactUs />} />
                <Route path="buyer-dashboard/agent-details" element={<DashboardAgentDetails />} />
                <Route path="buyer-dashboard/profile" element={<BuyerProfile />} />
                {/* <Route path="agent-dashboard/buyers" element={<AgentBuyers />} />
                <Route path="agent-dashboard/profile" element={<AgentProfile />} /> */}
              </Route>

            
              <Route element={<ProtectedRoute allowedRoles={['agent']} />} >
                <Route path="/" element={<AgentDashboard />}>
                  <Route path="agent-dashboard" element={<Dashboard />} />
                  <Route path="agent-dashboard/buyers" element={<AgentBuyers />} />
                  <Route path="agent-dashboard/profile" element={<AgentProfile />} />
                </Route>
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['admin']} />} >
                <Route path="/" element={<AdminDashboard />}>
                  <Route path="admin-dashboard" element={<DashboardSection />} />
                  <Route path="admin-dashboard/users" element={<Users />} />
                  <Route path="admin-dashboard/profile" element={<AdminProfile />} />
                </Route>
              </Route>
            </Routes>
            {/* <Footer /> */}
          </AgentContextProvider>
        </AdminContextProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App
