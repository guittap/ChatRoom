import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <Grid>
        <Paper>
          <form onSubmit={this.handleSubmit}>
            <h1>
              Login to <Link to="/">ChatRoom</Link>
            </h1>
            <p>Fill in the form below to login to your account.</p>
            <div>
              <input
                placeholder="Email"
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.email}
              ></input>
            </div>
            <div>
              <input
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
              ></input>
            </div>
            <div>
              {this.state.error ? <p>{this.state.error}</p> : null}
              <button type="submit">Login</button>
            </div>
            <hr></hr>
            <p>
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </form>
        </Paper>
      </Grid>
    );
  }
}

export default SignUp;
