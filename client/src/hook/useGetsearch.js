import { useState, useEffect } from "react";
import axios from "axios";

function useGetsearch() {
  const [searchList, setSearchList] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    getSearchList("เที่ยว");
  }, []);

  const getSearchList = async (input) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${input}`
      );
      setSearchList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("request error");
    }
  };
  return { searchList, setSearchList, inputText, setInputText, getSearchList };
}

export default useGetsearch;
