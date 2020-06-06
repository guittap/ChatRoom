import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";

//Material UI core
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//Materials UI Styles
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread,
});

class Login extends Component {
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
    const { classes } = this.props;

    return (
      <Grid container spacing={10} className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <form onSubmit={this.handleSubmit}>
            <Typography variant="h2">
              Login to <Link to="/">ChatRoom</Link>
            </Typography>
            <Typography variant="body2">
              Fill in the form below to login to your account.
            </Typography>

            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              //helperText={errors.email}
              //error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              //helperText={errors.password}
              //error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />

            {this.state.error ? <p>{this.state.error}</p> : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Login
            </Button>
            <br />
            <small>
              Don't have an account? <Link to="/signup">Signup</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
