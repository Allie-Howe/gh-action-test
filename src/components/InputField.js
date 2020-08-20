import React from "react";
import "./styles.css";

import { Formik, Field, Form } from "formik";
import { characteristics, commonPass } from "./values";

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
      color: "#888",
      characteristics: {},
    };
  }

  checkPass(pass) {
    if (pass === "") return;

    let color = "#888",
      score = 5;

    let hasSameCase =
        pass === pass.toUpperCase() || pass === pass.toLowerCase(),
      hasNum = /.*[0-9].*/g.test(pass),
      hasSymbol = /.*[?!"£$%^&*|/\\\][(){}<>,.:;#~`¬=_+\-@'].*/g.test(pass),
      isCommon = commonPass.includes(pass),
      tooShort = pass.length < 8;

    if (isCommon) {
      score--;
      characteristics.isCommon = true;
    } else characteristics.isCommon = false;
    if (tooShort) {
      score--;
      characteristics.tooShort = true;
    } else characteristics.tooShort = false;
    if (hasSameCase) {
      score--;
      characteristics.contains.mixedCase = false;
    } else characteristics.contains.mixedCase = true;
    if (!hasSymbol) {
      score--;
      characteristics.contains.symbol = false;
    } else characteristics.contains.symbol = true;
    if (!hasNum) {
      score--;
      characteristics.contains.number = false;
    } else characteristics.contains.number = true;

    color = this.getColor(score);
    console.log(pass, characteristics);
    this.setState({ color, characteristics, score });
  }

  getColor(score) {
    switch (score) {
      case 0:
        return "#A00";
      case 1:
        return "#B33";
      case 2:
        return "#F55";
      case 3:
        return "#BB5";
      case 4:
        return "#8B3";
      case 5:
        return "#3A3";
      default:
        return "#888";
    }
  }

  render() {
    console.log(this.state.characteristics);
    return (
      <div
        className="passContainer"
        style={{ backgroundColor: this.state.color }}
      >
        <Formik
          initialValues={{ password: "" }}
          onSubmit={(obj) => this.checkPass(obj.password)}
        >
          <Form className="form">
            <label>Enter your password: </label>
            <Field id="password" name="password" placeholder="Password" />
            <br />
            <br />
            <button className="myButton" type="submit">
              Check
            </button>
          </Form>
        </Formik>

        <h1>
          {this.state.score != null
            ? "Score: " + this.state.score
            : "Try out a password, and we'll test its strength!"}
        </h1>
        {this.state.score === 5 ? <h1>Perfect score! Well done!</h1> : ""}
        {this.state.characteristics.isCommon ? (
          <p>- Your password is too common. It will be easy to guess.</p>
        ) : (
          ""
        )}
        {this.state.characteristics.tooShort ? (
          <p>
            - Your password is too short. This means it is unsecure, and will
            probably not be allowed by most sites.
          </p>
        ) : (
          ""
        )}
        {this.state.score !== null &&
        !this.state.characteristics.contains.mixedCase ? (
          <p>
            - Your password does not contain a mixture of upper- and lower-case
            letters.
          </p>
        ) : (
          ""
        )}
        {this.state.score !== null &&
        !this.state.characteristics.contains.number ? (
          <p>- Your password does not contain at least one number.</p>
        ) : (
          ""
        )}
        {this.state.score !== null &&
        !this.state.characteristics.contains.symbol ? (
          <p>
            - Your password does not contain any symbols. This helps to prevent
            others from guessing your password.
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default InputField;
