import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.scss';

const Dashboard = () => {

    const history = useNavigate();

    const populateQuote = async () => {
        const req = await fetch('/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        });

        const data = req.json();
        console.log(data)
    } 

    useEffect( () => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwt_decode(token)
            if(!user) {
                localStorage.removeItem('token');
                history.replace('/login');
            } else {
                populateQuote()
            }
        };
    }, []);

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard