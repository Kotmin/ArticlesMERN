import { useState } from 'react'
import axios from '../api/axios'

function Users() {
    const [ users,setUsers ] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get('/api/users',{
                    signal: controller.signal
                });

                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        getUsers();

        // cleanup func

        return () => {
            isMounted = false;
            controller.abort();
        }
    },[])
  return (
    <article>
        <h2>Users: </h2>
        {users?.length
          ? (
                <ul>
                    {users.map((user,i) => <li key={i}>{user?.username}</li>)}
                </ul>
          ) :<p>No users to display</p>
        }
    </article>
  );
};

export default Users;