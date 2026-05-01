import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Admin } from './pages/Admin.jsx'
import { Home } from './pages/Home.jsx'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
