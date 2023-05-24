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

async function getUserPosts(userId:number) {
    try{
        const res = await http.get(`users/${userId}/posts`);
        return res.data
    } catch(err) {
        console.log(err)
    }
}

export {
    getUserInfo,
    getPosts,
    getUserPosts
}
