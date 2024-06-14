import React from "react";
import CultivationTeam from "./components/CultivationTeam";
import { Provider } from "react-redux";
import { store } from './store/store';

const App: React.FC = () => {
  return (
   <Provider store={store}>
     <CultivationTeam />
  </Provider>
  );
};

export default App;
