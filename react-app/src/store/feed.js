const SET_FEED = 'feed/SET_FEED';
const REMOVE_FEED ='feed/REMOVE_FEED'

const setFeed = (feed) => ({
    type: SET_FEED,
    payload: feed
});

export const removeFeed = () => ({
    type: REMOVE_FEED
})

const initialState = {feed: null};

export const getFeed = () => async (dispatch) => {
    const response = await fetch('/api/posts/')

    if (response.ok) {
        const data = await response.json();
        dispatch(setFeed(data))
        return null;
    } else {
        return ["An error occured. Please try again."]
    }
}

export const createPost = (user_id, content) => async (dispatch) => {
    const response = await fetch(`/api/users/${user_id}/post`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content
        })
    })

    if(response.ok) {
        dispatch(getFeed()); // fetch the updated list of posts
        return null;
    } else {
        return ["An error occurred. Please try again."]
    }
}

export default function feedReducer(state=initialState, action) {
    switch(action.type){
        case SET_FEED:
            return { posts: action.payload };
        case REMOVE_FEED:
            return { posts: null };
        default:
            return state;
    }
}
