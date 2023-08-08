const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GOOD":
      const stateIncreasedGood = {
        ...state,
        good: state.good + 1,
      };
      return stateIncreasedGood;
    case "OK":
      const stateIncreasedOk = {
        ...state,
        ok: state.ok + 1,
      };
      return stateIncreasedOk;
    case "BAD":
      const stateIncreasedBad = {
        ...state,
        bad: state.bad + 1,
      };
      return stateIncreasedBad;
    case "ZERO":
      const stateReset = {
        good: 0,
        ok: 0,
        bad: 0,
      };
      return stateReset;
    default:
      return state;
  }
};

export default counterReducer;
