import { useState, useEffect } from "react";

function SearchableSelect() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [options] = useState([
    { value: "Matematika", label: "Matematika" },
    { value: "IPA", label: "IPA" },
    { value: "IPS", label: "IPS" },
    { value: "Bahasa Inggris", label: "Bahasa Inggris" },
  ]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  return (
    <div>
    <div className="contact-us">
      <input className="classInput"
        type="text"
        placeholder="Cari mata pelajaran"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select className="w-36">
        {filteredOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <div className="contact-us">
      <input className="classInput"
        type="text"
        placeholder="Cari mata pelajaran"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select className="w-36">
        {filteredOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    </div>
  );
}

export default SearchableSelect;