import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getPosts,
  deletPost,
  updatePost,
} from "../features/counter/postSlice";

const Posts = () => {
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editPost, setEditPost] = useState(null); // Tahrirlanayotgan post
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  // Post qo‘shish
  const handleCreatePost = () => {
    if (newPost.title && newPost.body) {
      dispatch(createPost({ ...newPost, userId: 1 }));
      setNewPost({ title: "", body: "" });
    }
  };

  // Post o‘chirish
  const handleDeletePost = (id) => {
    dispatch(deletPost(id));
  };

  // Edit tugmasini bosganda ishlaydi
  const handleEditClick = (post) => {
    setEditPost(post); // Tahrirlayotgan postni set qiladi
  };

  // Yangilangan postni yuborish
  const handleUpdatePost = () => {
    if (editPost) {
      dispatch(updatePost({ id: editPost.id, updatePost: editPost }));
      setEditPost(null); // Tahrirni yopish
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Yuklanmoqda...</div>;
  }

  if (status === "failed") {
    return <div>Xatolik: {error}</div>;
  }

  return (
    <>
      <div>
        <div style={{ margin: "20px", textAlign: "center" }}>
          <div style={{ marginBottom: "20px" }} className="border align-center">
            <h3>Yangi Post Qo'shish</h3>
            <input
              type="text"
              placeholder="Sarlavha"
              className="border"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              style={{ margin: "5px", padding: "5px" }}
            />
            <br />
            <textarea
              className="border"
              placeholder="Matn"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              style={{ margin: "5px", padding: "5px", width: "300px" }}
            />
            <br />
            <button
              onClick={handleCreatePost}
              style={{ padding: "5px 10px" }}
              className="bordered bg-cyan-500 mb-5"
            >
              Qo'shish
            </button>
          </div>
        </div>
      </div>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Body
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Delete
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...posts].reverse().map((res) => (
                    <tr className="border-b dark:border-gray-700" key={res.id}>
                      <td className="px-4 py-3">
                        {editPost?.id === res.id ? (
                          <input
                            type="text"
                            value={editPost.title}
                            onChange={(e) =>
                              setEditPost({
                                ...editPost,
                                title: e.target.value,
                              })
                            }
                          />
                        ) : (
                          res.title
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editPost?.id === res.id ? (
                          <textarea
                            value={editPost.body}
                            onChange={(e) =>
                              setEditPost({ ...editPost, body: e.target.value })
                            }
                          />
                        ) : (
                          res.body
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeletePost(res.id)}
                          className="bg-red-500 py-2 px-4 text-white rounded"
                        >
                          delete
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        {editPost?.id === res.id ? (
                          <button
                            onClick={handleUpdatePost}
                            className="bg-green-500 py-2 px-4 text-white rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditClick(res)}
                            className="bg-cyan-500 py-2 px-4 text-white rounded"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Posts;
