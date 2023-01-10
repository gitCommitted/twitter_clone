/******** Constants ********/
const GET_USER_REPLIES = 'replies/load';
const GET_USER_REPLIES_BY_ID = 'replies_by_id/load';
const CREATE_REPLIES = 'replies/create'
const EDIT_REPLIES = 'replies/update';
const DELETE_REPLIES = 'replies/delete';

/******** Actions ********/
export const getUserReplies = (replies) => ({
    type: GET_USER_REPLIES,
    payload: replies
})

export const getUserRepliesById = (replies) => ({
    type: GET_USER_REPLIES_BY_ID,
    payload: replies
})

export const createReplies = (reply,tweetId) => (
    
    {
    type: CREATE_REPLIES,
    payload: {
        reply,
        tweetId
    }
});

export const editReplies = (reply) => ({
    type: EDIT_REPLIES,
    payload: reply
  });


export const deleteReplies = (id) => ({
    type: DELETE_REPLIES,
    payload: id
});


/******** Thunks ********/

export const fetchGetUserReplies = () => async (dispatch) => {
    let response;

    response = await fetch('/api/users/myReplies');

    if(response.ok){
        const replies = await response.json();
        dispatch(getUserReplies(replies));
        return response;
    };

    
 
}
export const fetchGetUserRepliesById = (userId) => async (dispatch) => {
    let response;

    response = await fetch(`/api/users/${userId}/replies`);

    if(response.ok){
        const replies = await response.json();
        dispatch(getUserRepliesById(replies));
        return response;
    };

}


export const fetchCreateReplies = (reply,tweetId) => async (dispatch) => {
    let response;
    response = await fetch(`/api/tweets/${tweetId}/reply`,
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reply)
      }
    );

    if(response.ok){
        const reply = await response.json();
        dispatch(createReplies(reply,tweetId));
    }
    else {
        const errors = await response.json();
        // console.log(errors);
        return errors;
    }

    return response;
 
}


export const fetchEditReplies =  (reply,replyId) => async (dispatch) => {
    let response;
    response = await fetch(`/api/replies/${replyId}`,
    {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reply)
      }
    );

    if(response.ok){
        const reply = await response.json();
        dispatch(editReplies(reply));
    }
    else {
        const errors = await response.json();
        // console.log(errors);
        return errors;
    }

    return response;
}


export const fetchDeleteReplies =  (replyId) => async (dispatch) => {
    let response;
    response = await fetch(`/api/replies/${replyId}`, {method: 'DELETE'});

    if(response.ok){
        const responseMessage = await response.json();
        // console.log('MESSAGE', responseMessage)
        dispatch(deleteReplies(replyId));
    };

    return response;
}



/******** Reducer ********/
const initialState = {};

const repliesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type){
        case GET_USER_REPLIES:
            newState.user_replies = {};
            action.payload['replies'].forEach(reply => newState.user_replies[reply.id] = reply);
            return newState;
        case GET_USER_REPLIES_BY_ID:
            newState.user_replies_by_id = {};
            action.payload['replies'].forEach(reply => newState.user_replies_by_id[reply.id] = reply);
            return newState;
        case CREATE_REPLIES:
            newState = {[action.payload.reply.id]: action.payload.reply }
            return newState;
        case EDIT_REPLIES:
            newState = action.payload
            return newState;
        case DELETE_REPLIES:
            delete newState[action.payload];
            return newState;
        default:
            return newState;
    }
}

export default repliesReducer;
