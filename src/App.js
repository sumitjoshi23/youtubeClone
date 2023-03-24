import Head from "./Head";
import { Provider } from "react-redux";
import store from "./store/store";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
function App() {
  return (
    <Provider store={store}>
      <ScrollToTop />

      <div>
        <Head />
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
