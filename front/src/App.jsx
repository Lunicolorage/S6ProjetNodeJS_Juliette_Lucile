import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Route, Link, Routes } from "react-router-dom";
import { AffichageEvents } from './components/affichageAllEvents/AffichageEvents';
import { CreateEvent } from './components/CreateEvent';
import { AffichageUnEvent } from './components/AffichageUnEvent';
import { NotFound } from './components/NotFound';
import { VoteProvider } from './VoteContext';
 
function App() {

  return(
    <VoteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AffichageEvents />} />
          <Route path="/creation" element={<CreateEvent />} />
          <Route path="/event/:id" element={<AffichageUnEvent />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </VoteProvider>
  )


}
export default App
