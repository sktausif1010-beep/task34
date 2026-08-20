import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const [posts, setPosts] = useState([]);

    const addUser = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("User added successfully");
            setUserId(data._id);
            setUserName("");
            setUserEmail("");
        } else {
            alert("Something went wrong");
        }
    };

    const addPost = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert("Please create a user first");
            return;
        }

        const response = await fetch("http://localhost:5000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content,
                user: userId
            })
        });

        if (response.ok) {
            alert("Post added successfully");
            setTitle("");
            setContent("");
            getPosts();
        } else {
            alert("Error creating post");
        }
    };

    const getPosts = async () => {
        const response = await fetch("http://localhost:5000/posts");
        const data = await response.json();

        setPosts(data);
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="container">
            <h1>Schema Reference App</h1>

            <div className="forms">
                <div className="form-box">
                    <h2>Add User</h2>

                    <form onSubmit={addUser}>
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />

                        <button type="submit">
                            Add User
                        </button>
                    </form>

                    {userId && (
                        <p className="success">
                            User created. You can now create a post.
                        </p>
                    )}
                </div>

                <div className="form-box">
                    <h2>Add Post</h2>

                    <form onSubmit={addPost}>
                        <input
                            type="text"
                            placeholder="Post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            placeholder="Post content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>

                        <button type="submit">
                            Add Post
                        </button>
                    </form>
                </div>
            </div>

            <div className="posts">
                <h2>All Posts</h2>

                {posts.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    posts.map((post) => (
                        <div className="post-card" key={post._id}>
                            <h3>{post.title}</h3>

                            <p>{post.content}</p>

                            <div className="user-info">
                                <strong>Posted by:</strong>
                                <span>{post.user?.name}</span>
                                <span>{post.user?.email}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;