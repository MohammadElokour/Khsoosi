import React from "react";
import ReactDOM from "react-dom";
import SignUp from "./components/SignUp.jsx"
import Rating from "./components/Rating.jsx";
import Search from './components/search.jsx'
import ResultSearch from './components/resultSearch.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      cvFile: "",
      img: "",
      summary: "",
      is_teacher: false,
      password: "",
      email: "",
      phone: "",
      location: "",
      teacherProfiles: [],
      current_teacherId: "",
      current_studentId: "",
      ratingText: "",
      rate: "",
      subjectName: "",
      subjectLevel: "",
      day: "",
      startHour: "",
      endHour: ""
    };
  }
  onchangingSignUp(e){
    this.setState({[e.target.name]:e.target.value});
  }
  onSignUp(){
    console.log("signup");
  }
  componentDidMount() {}

  searchInfo(e) {
    console.log(this.state[e.target.name])
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }
  componentDidMount() { }
  onRatingChange(e) {
    this.setState({
      [e.target.name]: e.target.value

    });
  }

  rating() {
    const body = { ratingText: this.state.ratingText, rate: this.state.rate };
    fetch('/rating', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      return response.json();
    }).then((body) => {
      console.log(body)
      this.setState({ ratingText: '', rate: '' });
    });
  }

  searchTecher(e) {

    e.preventDefault();

    // Default options are marked with *
    return fetch(`/search/?location=${this.state.location}&name=${this.state.subjectName}&level=${this.state.subjectLevel}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        // 'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response = response.json())
      .then(data => { this.setState({ teacherProfiles: data.data }); console.log(this.state.teacherProfiles) });

  }
  componentDidMount() { }

  render() {
    var tech = this.state.teacherProfiles;
    // var {rating} =this.state;
    // var RatingVaribles = {/*varibles*/}
    var { ratingText, rate, current_studentId, current_teacherId } = this.state;
    var RatingVariables = { ratingText, rate, current_studentId, current_teacherId };
    return (
      <div>
        <SignUp onchangingSignUp={this.onchangingSignUp.bind(this)} onSignUp={this.onSignUp.bind(this)} is_teacher={this.state.is_teacher}/>
        <h1>Test by Cyber-Ninjas</h1>
        <Search searchTecher={this.searchTecher.bind(this)} searchInfo={this.searchInfo.bind(this)} />
        <ResultSearch resultOfSer={tech} />
        <Rating RatingVariables={RatingVariables} onChange={event => this.onRatingChange(event)} onClick={event => this.rating(event)} />
        <h1>Test</h1>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
