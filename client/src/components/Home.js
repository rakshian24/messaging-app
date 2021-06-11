import React, { useEffect } from 'react'
import { getUserDataFromLocalStorage } from '../helper/functions'

const Home = () => {
    useEffect(()=>{
        const user = getUserDataFromLocalStorage('user', true);
        console.log("User in Homepage= ", user)
    })
    return (
        <div>
            HomePage
        </div>
    )
}

export default Home
