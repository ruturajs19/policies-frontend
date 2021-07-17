import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import PolicyForm from "./Components/PolicyForm/PolicyForm";
import SearchBox from "./Components/SearchBox/SearchBox";
import Modal from "./Components/Shared/Modal/Modal";
import StatisticsView from "./Components/StatisticsView/StatisticsView";

function App() {
  const [currentPolicy, setCurrentPolicy] = useState({});
  const [displayForm, setDisplayForm] = useState(false);
  const [modalText, setModalText] = useState("");
  useEffect(() => {
    if (Object.keys(currentPolicy).length > 0) {
      setDisplayForm(true);
    } else {
      setDisplayForm(false);
    }
  }, [Object.keys(currentPolicy).length]);

  return (
    <div className="App">
      <NavBar header="Policies"/>
      {modalText && (
        <Modal
          modalText={modalText}
          closeModal={() => {
            setModalText("");
          }}
        />
      )}
      <SearchBox
        setCurrentPolicy={setCurrentPolicy}
        setDisplayForm={setDisplayForm}
        setModalText={setModalText}
      />
      {displayForm ? (
        <PolicyForm
          currentPolicy={currentPolicy}
          setDisplayForm={setDisplayForm}
          setModalText={setModalText}
          setCurrentPolicy={setCurrentPolicy}
        />
      ) : (
        <StatisticsView setModalText={setModalText} />
      )}
    </div>
  );
}

export default App;
