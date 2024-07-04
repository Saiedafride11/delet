import { useEffect, useState } from "react";
import { isCreatedAtDifferent } from "../components/function/isCreatedAtDifferent";

const useSearchSelectOption = (
  initialData,
  setFormValue,
  initialKey,
  initialValue,
  selectedKey,
  text
) => {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [enabledResult, setEnabledResult] = useState(false);

  useEffect(() => {
    if (isCreatedAtDifferent(initialData)?.length > 0) {
      if (text === "variation") {
        if (initialKey?.includes(`[${selectedKey}]`)) {
          newCreatedDataAdded();
        }
      } else {
        newCreatedDataAdded();
      }
    } else {
      if (searchText === "" || searchText === undefined) {
        setItems(initialData);
        // setFormValue((prev) => ({ ...prev, [initialKey]: "" }));
      } else {
        filterSearchItems(searchText);
      }
    }
  }, [searchText, initialData]);

  useEffect(() => {
    if (initialValue !== "") {
      const matchedData = initialData?.find(
        (item) => item?.id === initialValue
      );
      setSearchText(matchedData?.name);
      filterSearchItems(searchText);
    } else {
      setSearchText("");
    }
  }, [initialValue, initialData]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value === "") {
      setFormValue((prev) => ({ ...prev, [initialKey]: "" }));
    }
  };

  const handleFieldClick = () => {
    // if (searchText === "" || searchText === undefined) {
    //   setItems(initialData);
    // }
    setItems(initialData);
    setEnabledResult(true);
  };

  const handleResultClick = (id, name) => {
    setEnabledResult(false);
    setSearchText(name);
    setItems(initialData);
    setFormValue((prev) => ({ ...prev, [initialKey]: id }));
  };

  // const isCreatedAtDifferent = (data) => {
  //   if (data !== undefined) {
  //     const currentTime = new Date();
  //     const entriesWithinSeconds = [];

  //     for (const item of data) {
  //       const createdAtTime = new Date(item.created_at);
  //       const timeDifferenceInSeconds = Math.abs(
  //         (currentTime - createdAtTime) / 1000
  //       );

  //       if (timeDifferenceInSeconds <= 3) {
  //         entriesWithinSeconds.push({ id: item.id, name: item.name });
  //       }
  //     }

  //     return entriesWithinSeconds;
  //   }
  // };

  const newCreatedDataAdded = () => {
    const result = isCreatedAtDifferent(initialData);
    setSearchText(result[0]?.name || "");
    setFormValue((prev) => ({ ...prev, [initialKey]: result[0]?.id }));
    filterSearchItems(searchText);
  };

  const filterSearchItems = (text) => {
    const matchedData = initialData?.filter((item) =>
      item?.name?.toLowerCase().includes(text?.toLowerCase())
    );
    setItems(matchedData || []);
  };

  return {
    items,
    // setItems,
    searchText,
    setSearchText,
    enabledResult,
    setEnabledResult,
    handleSearchChange,
    handleFieldClick,
    handleResultClick,
  };
};

export default useSearchSelectOption;
