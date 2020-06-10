import React, { useState, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import Post from './Post';

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4040/api/posts')
            .then(res => res.json())
            .then(posts => setPosts(posts))
            .catch(err => console.error(err));
    }, [])

    return (
        <Container fluid>
            <Row className="align-items-center" md={2}>
                {posts.map(post => <Post key={post.id} post={post} />)}
            </Row>
        </Container>
    )
}