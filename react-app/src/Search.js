
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";



const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [clicked, setClicked] = useState(false);
    const [users, setUsers] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
   
    useEffect(() => {
        async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
    }
    fetchData();
    }, []);

    useEffect(() => {
        if (clicked) {
            setSearchResults('results-active')
        } else {
            setSearchResults('')
        }
    }, [clicked])


    const userResults = Object.values(users)?.filter((user) => {
        // console.log(user?.id,sessionUser?.id)
        return user?.username?.toLowerCase().includes(search?.toLowerCase());
    });
    
    const handleClick = (() => {
        setClicked(true)
    })

    // const handleBlur = (() => {
    //     setTimeout(function () {
    //         setClicked(false)
    //     }, 100);
    // })


    const returnResults = userResults?.slice(0,3)?.map((user) => {
        return (
            <div className="search-profile-div pointer"
                key={user?.id}
                onClick={() => {
                    setClicked(true)
                    setSearch('')
                    history.push(`/users/${user?.id}`)
                }}>
                
                {/* <div className="search-user-info"> */}
                    <h5 className='name-username pointer'>{user?.username}</h5>
                {/* </div> */}
            </div>
        );
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="search-user-styling">
                    <div className="mag-glass">
                    <input
                        type='text'
                        className="hidden-input"
                        value={search}
                        placeholder='Search Users'
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={handleClick}
                        // onBlur={handleBlur}
                    />
                        <i className="fa-solid fa-magnifying-glass"></i>
                   
                        </div>
                    
                     
                </div>
            </form>

            <div className={`search-popup ${searchResults}`}>
                {returnResults}
            </div>

            {search && !userResults.length && (
                <div className={`search-popup ${searchResults}`}>
                    <p>This user does not exist!</p>
                </div>
            )}
        </>
    )
}
export default Search;
