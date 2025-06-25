import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useAuth, useUser } from '@clerk/clerk-react'

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const { user, isLoaded: isUserLoaded } =  useUser()
    const { getToken, isLoaded: isAuthLoaded } = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: ""
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    // Function to fetch jobs
    const fetchJobs = async() => {

        try {
            
            const { data } = await axios.get(backendUrl + '/api/jobs');

            if(data.success){
                setJobs(data.jobs)
                console.log(data.jobs);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    // Function to fetch company data
    const fetchCompanyData = async() => {
        try {
            
            const { data } = await axios.get(backendUrl + '/api/company/company', {headers:{token: companyToken}})
            if(data.success){
                setCompanyData(data.company)
                console.log(data)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch user data
    const fetchUserData = async() => {
        try {
            
            const token = await getToken()
            console.log("Thiis is token" + token);
            if (!token) return;

            const {data} = await axios.get(backendUrl + '/api/users/user',
                {headers: {Authorization: `Bearer ${token}`}})

            if(data.success){
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const hasSearch = searchFilter.title !== "" || searchFilter.location !== "";

        setIsSearched(hasSearch);
    }, [searchFilter]);

    useEffect(() => {
        fetchJobs();
        const storedCompanyToken = localStorage.getItem('companyToken')

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }
    }, [])

    useEffect(() => {
        if(companyToken){
            fetchCompanyData();            
        }
    }, [companyToken])

    useEffect(() => {
    const fetchDataIfReady = async () => {
        if (user && isUserLoaded && isAuthLoaded) {
            const token = await getToken();
            if (token) {
                fetchUserData();
            }
        }
    };
        fetchDataIfReady();
    }, [user, isUserLoaded, isAuthLoaded]);

    const value = {
        searchFilter, setSearchFilter, isSearched, setIsSearched,
        jobs, setJobs, setShowRecruiterLogin, showRecruiterLogin,
        companyToken, setCompanyToken, companyData, setCompanyData,
        backendUrl, userData, setUserData, userApplications, setUserApplications
    }
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}