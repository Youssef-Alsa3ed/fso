import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <App />
  </div>,
);

// const refresh = () => {
//   root.render(
//     <div>
//       <App counter={counter} />
//     </div>,
//   );
// };

// refresh();
// counter += 1;
// refresh();
// setInterval(() => {
//   refresh();
//   counter += 1;
// }, 500);
