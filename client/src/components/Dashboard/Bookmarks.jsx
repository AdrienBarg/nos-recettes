import './bookmarks.scss'

import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Card from '../Card/Card';


const Bookmarks = () => {

    const axiosPrivate = useAxiosPrivate()

    const { auth } = useAuth()
    const userID = auth.id

    const [filter, setFilter] = useState()
    const [search, setSearch] = useState('')
    const [searchCategory, setSearchCategory] = useState('')
    const [bookmarks, setBookmarks] = useState('')
    const [categories, setCategories] = useState([])

    const filterSearch = el => el.title.toLowerCase().includes(search)
    let filterCategory = el => el.categories.includes(searchCategory)
    if (searchCategory === '') { // no category selected
        filterCategory = el => el.categories
    }
        

    const handleCategoryFilter = (e, id) => {
        searchCategory === id 
            ? setSearchCategory('')
            : setSearchCategory(id)
    }


    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getBookmarks = async () => {
            try {
                const response = await axiosPrivate.get(
                    '/dashboard/bookmarks',
                    {
                        signal: controller.signal,
                        params: {
                            id: userID
                        }
                    }
                )
                const data = response.data
                console.log("data")
                console.log(data)
                if (isMounted) {
                    setBookmarks(data)
                } else {
                    console.log('false')
                }
            } catch (err) {
                console.log(err)
            }

            return () => {
                isMounted = false
                controller.abort()
            }
        };

        const getCategories = async () => {
            try {
                const response = await axios.get(
                    '/category'
                )
                const cat = response.data
                setCategories(cat)
            } catch (err) {
                console.log(err)
            }        
        }

        if (bookmarks === '') {
            getBookmarks()
        }
        if (categories.length === 0) {
            getCategories()
        }

        return () => {
            isMounted = false
            controller.abort()
          };
    }, []);

    return (
        <article>
            <div className="filter">
                <div className="searchBar">
                    <input
                        className='test'
                        type="search"
                        placeholder="Rechercher"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="icon">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
                <div className="categories">
                    {categories.map((category, index) => (
                        <button
                            className={`catButton ${category._id === searchCategory ? 'active' : '' }`}
                            key={index}
                            onClick={(e) => handleCategoryFilter(e, category._id)}
                        >{category.name}</button>
                    ))}
                </div>
            </div>
            <h2>Mes livres favoris</h2>
            <div className="booksContainer">

                {bookmarks?.books?.length > 0
                    ? (
                        bookmarks.books.filter(filterSearch).map((book, index) => (
                            <Card item={book} index={index} bookmarks={true} />
                        ))
                    ) : (
                        <p>Aucuns livres trouvés.</p>
                    )}
            </div>
            <h2>Mes recettes favorites</h2>
            <div className="booksContainer">
                {bookmarks?.recipes?.length > 0
                    ? (
                        bookmarks.recipes.filter(filterCategory).filter(filterSearch).map((recipe, index) => (
                            <Card item={recipe} index={index} bookmarks={true} />
                        ))
                    ) : (
                        <p>Aucunes recettes trouvées.</p>
                    )}
                {!bookmarks && (
                    <div>
                        Aucun favoris trouvés.
                    </div>
                )}
            </div>

        </article>
    )
}

export default Bookmarks