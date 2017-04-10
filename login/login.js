class Login extends React.Component {
  constructor(props){
    super(props);
  }
  handleSubmit(e) {
    e.preventDefault();
    if(this.email.value.length === 0) {
      alert("이메일을 입력하세요")
    } else {
      this.props.userLogIn({email:this.email.value})
    }
  }
  handleKeyPress(e){
    if(e.charCode === 13){
      this.handleSubmit(e)
    }
  }
  render() {
    return (
      <div id="login">
        <a href="/auth/facebook" className="btn btn-primary">Facebook</a>
      </div>
    );
  }
}

ReactDOM.render(
  Login,
  document.getElementById('root')
);