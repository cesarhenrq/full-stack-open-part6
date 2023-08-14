import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const notificationInitialState = null;

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    notificationInitialState
  );

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatcher = useContext(NotificationContext);
  return notificationAndDispatcher[0];
};

export const useSetNotification = (message) => {
  const notificationAndDispatcher = useContext(NotificationContext);
  const dispatch = notificationAndDispatcher[1];

  const setNotification = (message) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { message },
    });
  };

  const clearNotification = () => {
    setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);
  };

  const setAndClearNotification = (message) => {
    setNotification(message);
    clearNotification();
  };

  return setAndClearNotification;
};

export default NotificationContext;
