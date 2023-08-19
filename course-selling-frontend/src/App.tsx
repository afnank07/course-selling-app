import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './components/Landing';
import SignIn from './components/LogIn';
import SignUp from './components/SignUp';
import AppBar from './components/AppBar';
import CreateCourse from './components/CreateCourse';
import ShowCourses from './components/ShowCourses';
import EditCourses from './components/EditCourses';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { userTypeAtom } from './atom/userTypeAtom';
import PurchasedCourses from './components/PurchasedCourses';

function App() {
  return (
    <div>
      <Router>
        <RecoilRoot>
        <AppBar/>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path="/about" element={<AdminUser><CreateCourse /></AdminUser>} />
          <Route path="/courses" element={<ShowCourses />} />
          <Route path="/edit" element={<AdminUser><EditCourses /></AdminUser>} />
          <Route path="/purchased" element={<PublicUser><PurchasedCourses /></PublicUser>} />
        </Routes>
        </RecoilRoot>
      </Router>
    </div>
  )
}

function AdminUser({children}){
  const userType = useRecoilValue(userTypeAtom);
  // console.log("userType: ", userType)
  if (userType == "Admin"){
    return <>
    {children}
    </>
  }
  else {
    return <div>
    You don't have access to the page! 
    </div>
  }
}

function PublicUser({children}){
  const userType = useRecoilValue(userTypeAtom);
  // console.log("userType: ", userType)
  if (userType == "User"){
    return <>
    {children}
    </>
  }
  else {
    return <div>
    You don't have access to the page! 
    </div>
  }
}

export default App;
