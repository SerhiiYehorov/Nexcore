const axios = require('axios').default;

const http = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});


async function getUserInfo(id: number) {
    try{
        const res = await http.get('users/' + id);
        return res.data
    } catch(err) {
        console.log(err)
    }
}

async function getPosts() {
    try{
        const res = await http.get('posts');
        return res.data
    } catch(err) {
        console.log(err)
    }
}

async function getComments(postId:number) {
    try{
        const res = await http.get('posts/' + postId + '/comments');
        return res.data
    } catch(err) {
        console.log(err)
    }
}

async function getSelectedPost(postId:number) {
    try{
        const res = await http.get('posts/' + postId);
        return res.data
    } catch(err) {
        console.log(err)
    }
}

async function getUserPosts(userId:number) {
    try{
        const res = await http.get(`users/${userId}/posts`);
        return res.data
    } catch(err) {
        console.log(err)
    }
}

async function changeSelectedPostBody(postId:number, body:string) {
    try{
        const res = await http.patch('posts/' + postId,
        {
            body
        });
        return res.data
    } catch(err) {
        console.log(err)
    }
}

async function deleteSelectedPost(postId:number) {
    try{
        await http.delete('posts/' + postId);
    } catch(err) {
        console.log(err)
    }
}

async function sentComment(newName: string, newBody: string, authorisedUserEmail: string) {
    try{
        const res = await http.post('posts',
        {
            name:newName,
            body:newBody,
            email:authorisedUserEmail,
        });
        return res.data
    } catch(err) {
        console.log(err)
    }
}



export {
    getUserInfo,
    getPosts,
    getUserPosts,
    getSelectedPost,getComments,
    changeSelectedPostBody,
    deleteSelectedPost,
    sentComment
}
