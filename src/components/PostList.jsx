import React from 'react';
import PostItem from "./PostItem";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({posts, title, remove}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Посты не найдены!
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
                {posts.map((post,index) =>  <PostItem remove={remove} number={index+1} post={post} key={post.id}/> )}
        </div>
    ); 
};

export default PostList;