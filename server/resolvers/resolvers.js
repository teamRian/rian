const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];




export const rootResolver = {
  Subscription: {
    commentAdded: comment => {
    	console.log("commentAdded Subscription!!!!")
      // the subscription payload is the comment.
    	return comment;
    },
  },
};