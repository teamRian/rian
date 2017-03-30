// const channels = [{
//   id: 1,
//   name: 'soccer',
// }, {
//   id: 2,
//   name: 'baseball',
// }];




// export const rootResolver = {
//  Query: {
//     channels: () => {
//       return channels;
//     },
//   },
//   Subscription: {
//     commentAdded: comment => {
//     	console.log("commentAdded Subscription!!!!")
//       // the subscription payload is the comment.
//     	return comment;
//     },
//   },
// };

const channels = [{
  id: 'rock',
  user: 'soccer',
}, {
  id: 'metal',
  user: 'baseball',
}];

const entry2 = [{
  repoFullName: "test",
  comments: [{
    id: 1,
    content: 'soccer',
  }]
}];



export const resolvers = {
  Query: {
    channels(obj, args, context, info){
        console.log("channels", obj, args, context)
        var resultNum = []
        for (let i = 0; i < channels.length; i++) {
          if (channels[i].id === args.id) {
            resultNum.push(channels[i])
            break
          }
        }
      return resultNum
    },

    entry(obj, args, context){
      console.log('Repo', obj, args, context)
      let newObj = {}
      newObj.repoFullName = "Yes Iam Docker"
      return newObj
    }
  },


  Repo: {
    comments(obj, args, context){
      console.log('comments', obj, args, context)
      var newObj = {}
      newObj.id = args.id
      newObj.content = "YEs Im success"
      return newObj
    }
  },

};












