import React, { useState } from "react";

import {
  Transition,
  CSSTransition,
  SwitchTransition,
  TransitionGroup
} from "react-transition-group";

//import styles from "../styles/styles.css";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Home = () => {
  const [inProp, setInProp] = useState(false);
  const [displayText, setDisplayText] = useState(false);
  const [state, setState] = useState(false);

  const [items, setItems] = useState(["Manal"]);

  const CONTACTS = ["Jane", "Fred", "John", "Doe", "Brown"];

  const onAddContacts = () => {
    const newItem = CONTACTS.find((item) => !items.includes(item));
    if (newItem) {
      setItems((prev) => [...prev, newItem]);
    }
  };

  return (
    <>
      <div>
        <Transition in={inProp} timeout={300}>
          {(state) => (
            <h2
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              {"TutsPlus - Welcome to React Animations"}
            </h2>
          )}
        </Transition>
        <button onClick={() => setInProp(!inProp)}>
          Click to {inProp ? "Exit" : "Enter"}
        </button>
      </div>

      <div>
        <CSSTransition
          in={displayText}
          timeout={300}
          classNames="react-animations"
          unmountOnExit
        >
          <h2>{"TutsPlus - Welcome to CSSTransition"}</h2>
        </CSSTransition>
        <button onClick={() => setDisplayText(!displayText)}>
          Display Text
        </button>
      </div>

      <div>
        <SwitchTransition mode={"in-out"}>
          <CSSTransition
            key={state ? "Did you Enjoy our Tutorial?" : "Welcome to TutsPlus"}
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
            classNames="fade"
          >
            <button onClick={() => setState((state) => !state)}>
              {state ? "Did you Enjoy our Tutorial?" : "Welcome to TutsPlus"}
            </button>
          </CSSTransition>
        </SwitchTransition>
      </div>

      <div>
      <TransitionGroup>
        <h2>Contacts</h2>
        {items.map((item, index) => (
          <CSSTransition key={index} timeout={900} classNames="fade">
            <p>{item}</p>
          </CSSTransition>
        ))}
        <button onClick={onAddContacts}>Add a Contact</button>
      </TransitionGroup>
    </div>
    </>
  );
};

export default Home;
