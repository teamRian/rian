import { pubsub } from '../pubsub/pubsub.js';
import { merge } from 'lodash';
const GraphQLJSON = require('graphql-type-json');

const entry2 = [{
  repoFullName: "test",
  comments: [{
    id: 1,
    content: 'soccer',
  }]
}];


const RootResolver = {

  Query: {
    entry(obj, args, context){
      console.log('Repo', obj, args, context)
      let newObj = {}
      newObj.repoFullName = "Yes I am Docker"
      return newObj
    }
  },

  Mutation: {
    sendMessages(obj, args, context){
      console.log('Message', obj, args, context)
      let newObj = {}
      newObj.id = args.id
      newObj.content = args.content
      newObj.chatRoom = args.chatRoom

      const payload = { 
        //최초에 서브스크립션 요청을 보냈을 때의 이름인 commentAdded로 key값을 지정해주는 것이 매우 중요하다.
        commentAdded: {
          chatRoom: args.chatRoom,
          id: '1',
          content: 'Hello! Iam Subscription',
        }
      }
      //요기서 쏴줌(근데 filter에서 검증함.)
      pubsub.publish('commentAdded', payload);
      //뮤테이션에 대한 리턴은 해주던가 말던가
      return newObj
    }
  },

  JSON: GraphQLJSON,

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

export default merge(RootResolver)







