import React, {useState, useEffect, useRef} from 'react';
import '../styles/App.css';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal' 
import MyButton from '../components/UI/button/MyButton';
import {usePosts} from '../hooks/usePosts'
import {useFetching} from '../hooks/useFetching'
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { getPageCount} from '../components/utils/pages';
import Pagination from '../components/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';

function Posts () {
    const [posts, setPosts] = useState([]) 
    const [modal, setModal]= useState(false)
    const [filter,setFilter]= useState({sort:'', query:''})
    const sortedAndSearchedPosts= usePosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading ,postError] = useFetching(async (limit,page) => {
        const response = await PostService.getAll(limit,page);
        setPosts( [...posts, ...response.data])
        const totalCount= response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount,limit))
    })

    useObserver(lastElement ,page < totalPages , isPostsLoading , ()=> {setPage(page + 1)})
   
    useEffect(() => {
        fetchPosts(limit,page)
    }, [page])

    
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    const removePost=(post)=>{
        setPosts(posts.filter(p=>p.id!==post.id))
        
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">   
            
            <MyButton style={{borderRight:0}} onClick={fetchPosts}>GetPosts</MyButton>
            <MyButton style={{marginTop:30}} onClick={()=>setModal(true)}>
                    Создать пользователя
            </MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin:'15px 0'}} />
            <PostFilter filter={filter} setFilter={setFilter}/>

            {postError && <h1>Ошибка</h1>}

            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты"/>
            <div ref={lastElement} ></div>

            {isPostsLoading &&  <div style={{display:'flex', justifyContent:'center', marginTop:'10px' }}><Loader/></div> }
             

            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
        </div>
    );
}

export default Posts;
