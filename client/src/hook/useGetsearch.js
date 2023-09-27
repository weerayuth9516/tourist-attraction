import { useState, useEffect } from "react";
import { supabase } from "../supabase/client.js";

function useGetsearch() {
  const [searchList, setSearchList] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    getSearchList("");
  }, []);

  const getSearchList = async (inputText) => {
    try {
      const { data, error } = await supabase
        .from("tourist_attraction")
        .select("*")
        .or(
          `description.ilike.%${inputText}%, title.ilike.%${inputText}%,tags.cs.{${inputText}}`
        );
      if (error) {
        throw error;
      }
      setSearchList(data);
    } catch (error) {
      console.error("Request error:", error);
    }
  };
  return { searchList, setSearchList, inputText, setInputText, getSearchList };
}

export default useGetsearch;
