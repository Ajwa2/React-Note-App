import './App.css';
import NoteList from './components/NoteList/Note';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EachNote from './components/eachNote/EachNote';
import { useState } from 'react';


function App() {
  const [allNotes, setAllNotes]= useState( JSON.parse(localStorage.getItem("Notes")) || [])
  const [searchText,setSearchText] = useState("");


  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" >
              <Route path="" element={<NoteList allNotes={allNotes.filter((e)=>e.text.toLowerCase().includes(searchText.toLowerCase()))} setAllNotes={setAllNotes} setSearchText={setSearchText}/>} />
              <Route path="EachNote/:id" element={<EachNote allNotes={allNotes} setAllNotes={setAllNotes}/>}/>
            </Route>
          </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
