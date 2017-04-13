import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import "./css/style.css";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";


class ChatContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: true,
            value: ""
        };
        this.changeFocusOff = this.changeFocusOff.bind(this)
        this.changeFocusOn = this.changeFocusOn.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        console.log('DidMount', this.props)
    }

    componentWillReceiveProps(nextProps) {
        nextProps.subscribeToNewComments({
            repoFullName: 'testSubscription',
        });
    }

    changeFocusOn(){
        this.setState((prevState, props)=>{
            focus: true
        })
    }

    changeFocusOff(){
        this.setState((prevState, props)=>{
            focus: false
        })
    }


    handleChange(e){
        e.preventDefault();
        var tempText = e.target.value
        this.setState((prevState, props)=>(
            {
                value: tempText
            }
        ))
    }


    handleSubmit(e){
        e.preventDefault();
        console.log('만약에 그게 사실이라면 그것은 정말 큰 문제일 것이다.', this.state.value)
        this.props.SendMessage({
            variables: {
                chatRoom: 44,
                id: 77,
                content: this.state.value,
            }
        })
        .then((data)=>{
            console.log("Mutation SUCCESS", data)
        })
        .catch((error)=>{
            console.log("Mutations Fail")
        })
      
    }


    render() {
        return (
            <div className="ChatContainer ">
                <form onSubmit={this.handleSubmit}>
                    {this.state.message}
                    <input type='text' value={this.state.value} onFocus={(e)=>this.changeFocusOn(e)} onBlur={(e)=>this.changeFocusOff(e)} onChange={(e)=>this.handleChange(e)} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

ChatContainer.propTypes = {
        subscribeToNewComments: PropTypes.func.isRequired,
}


function mapState(state) {
    return {
        userid: state.User._id
    };
}

function mapDispatch(dispatch) {
    return {

    };
}

//메시지를 보내는 뮤테이션 
const SEND_MESSAGE = gql`
    mutation sendMessageS($chatRoom: Int!, $id: Int!, $content: String!) {
      sendMessages(chatRoom: $chatRoom, id: $id, content: $content) {
        chatRoom
        id
        content
      }
    }
`;

//서브스크립션에서 연결시킬때 최초로 받아오는 쿼리
const COMMENT_QUERY = gql`
    query Comment($repoName: String!, $id: Int!) {
      entry(repoFullName: $repoName) {
      	repoFullName
        comments(id: $id) {
          id
          content
        }
      }
    }
`;

//서브스크립션을 찝는 쿼리
const COMMENTS_SUBSCRIPTION = gql`
    subscription onCommentAdded($chatRoom: String!, $id: Int!){
      commentAdded(chatRoom: $chatRoom, id: $id){
        chatRoom
        id
        content
      }
    }
`;


const sendMsg = graphql(SEND_MESSAGE, { name: "SendMessage"} )


const withData = graphql(COMMENT_QUERY, {
    //요 name으로 props가 들어감
    name: 'comments',
    options: () => ({
        variables: {
            repoName: 'testCommnet',
            id:1,
        },
    }),
    props: props => {
        return {
            subscribeToNewComments: params => {
                //최초에 보냈던 쿼리 네임안에 매쏘드가 있음
                return props.comments.subscribeToMore({
                    document: COMMENTS_SUBSCRIPTION,
                    //서브스크립션에 대한 변수를 보내야
                    variables: {
                        chatRoom: 44,
                        id: 1,
                    },

                    updateQuery: (prev, {subscriptionData}) => {
                     console.log('UpdateQuery', subscriptionData)
                
                    }


                   
                });
            }
        };
    },
});


export default compose(
    sendMsg,
	withData,
	connect(mapState, mapDispatch)
)(ChatContainer)





