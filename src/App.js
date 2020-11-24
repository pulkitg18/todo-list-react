import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";

import db from "./firebase";
import firebase from "firebase";
import Todo from "./Components/Todo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthWrapper from "./pages/authWrapper";
import PrivateRoute from "./pages/PrivateRoute";
import Login from "./pages/Login";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const isUser = isAuthenticated && user;
  const firebaseUser = isUser;
  useEffect(() => {
    if (firebaseUser.email) {
      db.collection(firebaseUser.email)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setTodos(
            snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
          );
        });
    }
  }, [firebaseUser.email]);
  //const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  // console.log(timestamp);

  console.log("isuser", firebaseUser.email);
  const addTodo = (event) => {
    event.preventDefault();
    if (firebaseUser.email) {
      db.collection(firebaseUser.email).add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setInput("");
    }
  };

  // const timestamp = new Date(timestamp?.toDate()).toUTCString();
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact={true}>
            <div className="App">
              {isUser && user.name && (
                <h4>
                  Welcome, <strong>{user.name.toUpperCase()}</strong>
                </h4>
              )}
              {isUser ? (
                <button
                  onClick={() => {
                    logout({ returnTo: window.location.origin });
                  }}
                >
                  logout
                </button>
              ) : (
                <button onClick={loginWithRedirect}>login</button>
              )}
              <h1>Your To-Do List </h1>

              <form>
                <FormControl>
                  <InputLabel>✅ Write A To-do</InputLabel>
                  <Input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                  />
                </FormControl>

                <Button
                  disabled={!input}
                  type="submit"
                  onClick={addTodo}
                  variant="contained"
                  color="primary"
                >
                  Add Todo
                </Button>
              </form>
              <ul>
                {todos.map((todo, index) => (
                  <Todo
                    passedTodo={todo}
                    index={index}
                    firebaseUser={firebaseUser.email}
                    key={index}
                  />
                ))}
              </ul>
            </div>
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
