import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CurriculumPage from './pages/Curriculum';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/:university/:course" element={<CurriculumPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
