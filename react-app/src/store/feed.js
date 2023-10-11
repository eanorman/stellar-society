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
