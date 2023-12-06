import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
    const params= useParams();
    const [post,setPost] = useState({});
    const [comments,setComments] = useState([]);

    const [fetchPostById,isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data);
    })

    const [fetchComById,isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getComById(params.id)
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchComById(params.id)
    },[])
  return (
    <div>
        
        <h1 style={{color:'teal', marginTop: 20}}>Пост:{params.id}</h1>
        {isLoading
            ? <Loader/>
            : <div className='comm'> {post.id} . {post.title} </div>
        }
        <h3 style={{color:'teal'}} >Комментарии</h3>
        {isComLoading
            ? <Loader/>
            : <div className='comm'> {
                comments.map(comm => <div className='col'> <span>{comm.email}</span> <span>{comm.body}</span></div>)
                }
             </div>
        }
    </div>
  );
}

export default PostIdPage