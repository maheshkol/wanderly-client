import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WanderlyHome from './pages/WanderlyHome';
import DestinationDetail from './pages/DestinationDetail';
import TripPlanner from './pages/TripPlanner';
import SearchAndBooking from './pages/SearchAndBooking';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WanderlyHome />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/trips/:id/plan" element={<TripPlanner />} />
        <Route path="/search" element={<SearchAndBooking />} />
      </Routes>
    </BrowserRouter>
  );
}