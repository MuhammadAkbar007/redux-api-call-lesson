import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {getPostsFromBackend, savePost, editPost, deletePost} from "../../store/post";
import PostModal from "./components/PostModal";

function Post({posts, getPostsFromBackend, savePost, editPost, deletePost}) {

    useEffect(() => {
        getPostsFromBackend()
    }, [])

    const [modalVisible, setModalVisible] = useState(false)
    const [currentItem, setCurrentItem] = useState('')

    function toggleModal() {
        setCurrentItem('')
        setModalVisible(prev => !prev)
    }

    function submitPost(event, errors, values) {
        if (currentItem) {
            editPost({...values, id: currentItem.id})
        } else {
            savePost(values)
        }
        toggleModal()
    }

    function handleEdit(item) {
        setModalVisible(true)
        setCurrentItem(item)
    }

    return <div>
        <button className={'btn btn-dark float-end m-2'} onClick={() => setModalVisible(true)}>+ Add</button>
        <table className={'table text-center'}>
            <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>{posts.map(item => <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>
                    <button className={'btn btn-dark m-2'} onClick={() => handleEdit(item)}>Edit</button>
                    <button className={'btn btn-dark m-2'} onClick={() => deletePost(item.id)}>Delete</button>
                </td>
            </tr>)}</tbody>
        </table>

        <PostModal isOpen={modalVisible} toggle={toggleModal} submit={submitPost} currentItem={currentItem}/>
    </div>
}

export default connect(({post: {posts}}) => ({posts}), {getPostsFromBackend, savePost, editPost, deletePost})(Post)