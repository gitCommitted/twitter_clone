// ******** Tweet Constants ********
const GET_ALL_TWEETS = 'tweets/get';
const GET_ALL_TWEETS2 = 'tweets2/get';
const GET_USER_TWEETS = 'user_tweets/get';
const GET_TWEET = 'tweet/get';
const CREATE_TWEETS = 'tweets/create';
const EDIT_TWEETS = 'tweets/edit';
const DELETE_TWEETS = 'tweets/delete';
const CREATE_LIKE = 'like/create';
const DELETE_LIKE = 'like/delete';

// ******** Tweets Actions ********

// GET Tweets
export const getAllTweets = (tweets) => {
    return {
        type: GET_ALL_TWEETS,
        payload: tweets    
    };
};

export const getAllTweets2 = (tweets) => {
    return {
        type: GET_ALL_TWEETS2,
        payload: tweets    
    };
};

// GET USER Tweets
export const getUserTweets = (tweets) => ({
        type: GET_USER_TWEETS,
        payload: tweets 
});

// GET One Tweet
export const getTweet = (tweet) => {
    return {
        type: GET_TWEET,
        payload: tweet
    };
};

// CREATE Tweets
export const createTweets = (tweet) => {
    return {
        type: CREATE_TWEETS,
        payload: tweet
    }
}

// EDIT (PUT) Tweets
export const editTweets = (tweet) => {
    return {
        type: EDIT_TWEETS,
        payload: tweet
    };
};

// DELETE Tweets
export const deleteTweets = (id) => {
    return {
        type: DELETE_TWEETS,
        payload: id
    };
};

// CREATE Like
export const createLike = (tweetId) => ({
    type: CREATE_LIKE,
    payload: tweetId
})

// DELETE Like
export const deleteLike = (tweetId) => ({
    type: DELETE_LIKE,
    payload: tweetId
})


// ******** Tweet THUNKS ********

// GET all Tweets thunk
export const fetchAllTweets = () => async (dispatch) => {
    const res = await fetch(`/api/tweets`);

    if (res.ok){
        const tweets = await res.json();
        dispatch(getAllTweets(tweets));
        return tweets
    };
    return res;
};

export const fetchAllTweets2 = () => async (dispatch) => {
    const res = await fetch(`/api/tweets/all`);

    if (res.ok){
        const tweets = await res.json();
        dispatch(getAllTweets2(tweets));
        return tweets
    };
    return res;
};

// GET USER Tweets thunk
export const fetchUserTweets = () => async (dispatch) => {
    const res = await fetch(`/api/users/myTweets`);

   

    if (res.ok){
        const tweets = await res.json();

     
        dispatch(getUserTweets(tweets));

        // console.log('inside response, ', tweets)
        return res;
    };
    // return res
};

// GET one Tweet thunk
export const fetchTweet = (tweetId) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${tweetId}`);

    if (res.ok){
        const tweet = await res.json();
        dispatch(getTweet(tweet));
        return tweet;
    };
    return res;
};

// CREATE Tweets thunk
export const fetchCreateTweets = (tweet) => async (dispatch) => {
    const res = await fetch(`/api/tweets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tweet)
    });
    
    if (res.ok){
        const tweet = await res.json();
        dispatch(createTweets(tweet));
        return tweet;
    }
    else {
        const errors = await res.json();
        // console.log(errors);
        return errors;
    }
    return res;
};

// EDIT (PUT) Tweets thunk
export const fetchEditTweets = (tweet) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${tweet.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tweet)
    });

    if (res.ok){
        const tweet = await res.json();
        dispatch(editTweets(tweet));
        return tweet;
    }
    else {
        const errors = await res.json();
        // console.log(errors);
        return errors;
    }
    return res;
};

// DELETE Tweets thunk
export const fetchDeleteTweets = (tweetId) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${tweetId}`, {
        method: 'DELETE'
    });

    if (res.ok){
        const tweet = await res.json();
        dispatch(deleteTweets(tweet));
        return tweet;
    };
    return res;
};
//Create a new like
export const fetchCreateLike =  (tweetId) => async (dispatch) => {
    let response;
    response = await fetch(`/api/tweets/${tweetId}/like`,{method: 'POST'});

    if(response.ok){
        const answer = await response.json();
        dispatch(createLike(tweetId));
    };

    return response;
}

//Delete a like
export const fetchDeleteLike =  (tweetId) => async (dispatch) => {
    let response;
    response = await fetch(`/api/tweets/${tweetId}/like`,{method: 'DELETE'});

    if(response.ok){
        const answer = await response.json();
        dispatch(deleteLike(tweetId));
    };

    return response;
}

// ******** REDUCER ********
const initialState = {}

const tweetsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_ALL_TWEETS:
            newState.all_tweets = {}
            action.payload['tweets'].forEach(tweet => newState.all_tweets[tweet.id] = tweet)
            return newState;
        case GET_ALL_TWEETS2:
            newState.all_tweets = {}
            action.payload['tweets'].forEach(tweet => newState.all_tweets[tweet.id] = tweet)
            return newState;
        case GET_USER_TWEETS:
            newState.user_tweets = {}
            action.payload['tweets'].forEach(tweet => newState.user_tweets[tweet.id] = tweet)
            return newState;
        case GET_TWEET:
            newState.one_tweet = {}
            newState.one_tweet = action.payload;
            return newState;
        case CREATE_TWEETS:
            newState = { ...state, [action.payload.id]: action.payload }
            return newState;
        case EDIT_TWEETS:
            newState = action.payload;
            return newState;
        case DELETE_TWEETS:
            delete newState[action.payload];
            return newState
        default:
            return newState;
    };
};

export default tweetsReducer;
