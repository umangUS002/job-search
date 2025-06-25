import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';
import DashBoard from './pages/DashBoard';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';
import AddJob from './pages/AddJob';
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const {showRecruiterLogin, companyToken} = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin/>}

      <ToastContainer />

      <Routes>
          <Route  path='/' element={<Home/>} />
          <Route  path='/apply-jobs/:id' element={<ApplyJob/>} />
          <Route  path='/applications' element={<Applications/>} />
          <Route path='/dashboard' element={<DashBoard/>} >
          {companyToken ? <>
              <Route path='add-job' element={<AddJob/>} />
              <Route path='manage-jobs' element={<ManageJobs/>} />
              <Route path='view-applications' element={<ViewApplications/>} />
          </> : null
          }
              
          </Route>
      </Routes>
    </div>
  )
}

export default App
