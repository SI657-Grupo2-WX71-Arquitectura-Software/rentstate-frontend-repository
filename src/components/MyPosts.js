import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material"; 
import PostService from "../hooks/usePostService";
import PropertyService from "../hooks/usePropertyService";

const MyPosts = () => {
    const [posts, setPosts] = useState([]); 

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const allPosts = await PostService.getAllPosts(); 
                const postsWithImages = await Promise.all(
                    allPosts.map(async (post) => {
                        const property = await PropertyService.getPropertyById(post.propertyId);
                        return { ...post, image: property.image };
                    })
                );
                setPosts(postsWithImages);
            } catch (error) {
                console.error("Error al obtener las publicaciones:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="my-posts-container">
            <h1>Publicaciones</h1>
            <div className="posts-grid">
                {posts.map((post, index) => (
                    <Card key={index} className="post-card">
                        <CardContent>
                            <img src={post.image} alt="Property" className="post-image" />
                            <Typography variant="h5" component="div" className="post-title">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="post-description">
                                {post.description}
                            </Typography>
                            <Button component={Link} to={`/post/${post.id}`} variant="contained" className="post-button">
                                Ver Detalles
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default MyPosts;