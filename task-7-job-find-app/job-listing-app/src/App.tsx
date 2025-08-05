import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobCard from './components/JobCard';
import { Description } from './components/Description';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobCard />} />
        <Route path="/description/:id" element={<Description />} />
      </Routes>
    </Router>
  );
}

export default App;
