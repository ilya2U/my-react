import React,{useState,useEffect} from 'react';
import './styles/App.css';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import {usePosts} from './hooks/usePosts'
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';

function App () {
    const [posts, setPosts] = useState([]) 
    const [modal, setModal]= useState(false)
    const [filter,setFilter]= useState({sort:'', query:''})
    const sortedAndSearchedPosts= usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isPostsLoading ,postError] = useFetching (async () => {
        const posts = await PostService.getAll();
        setPosts(posts)
    })

   
    useEffect(() => {
        fetchPosts()
    }, [])

    
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // async function fetchPosts(){
    //     const posts = await PostService.getAll();
    //     setPosts(posts)
    // }


    const removePost=(post)=>{
        setPosts(posts.filter(p=>p.id!==post.id))
        
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
            {isPostsLoading
             ? <div style={{display:'flex', justifyContent:'center', marginTop:'10px' }}><Loader/></div>
             :<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>}
            
        </div>
    );
}

export default App;
