import { useHistory } from "react-router";
import { AnnonceModel } from "./AnnonceModel";

const history = useHistory();

export const handlogout = async (token: string) => {
    
        try {
            const response = await fetch('http://localhost:8080/api/auth/v1/logout', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
            });
            const responsetoken = await response.json();
            if (response.ok) {
                const token = await responsetoken.data;
                console.log(responsetoken);
                sessionStorage.setItem('token', token);
                history.push("/login");
            } 
        } catch (error) {
            console.error('Error during login:', error);
        }
}

