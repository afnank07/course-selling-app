import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './components/Landing';
import SignIn from './components/LogIn';
import SignUp from './components/SignUp';
import AppBar from './components/AppBar';
import CreateCourse from './components/CreateCourse';
import ShowCourses from './components/ShowCourses';

function App() {
  return (
    <div>
      <Router>
        <AppBar/>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path="/about" element={<CreateCourse />} />
          <Route path="/courses" element={<ShowCourses />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
