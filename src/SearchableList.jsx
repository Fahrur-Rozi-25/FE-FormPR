import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Selector = () => {
  const options = [
    "Matematika",
    "IPA",
    "IPS",
    "Bahasa Inggris"
  ];

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
      mapel : selected, // Mengirim nilai yang dipilih dari state 'selected'
      ket : formData.description, // Mengirim nilai deskripsi dari state 'formData'
    };
    console.log(dataToSend);
      const response = await axios.post("http://localhost:3000/postPR", dataToSend);

      if (response.status === 201) {
        setFormSubmitted(true);
        navigate("/send");
      }
    } catch (error) {
      console.error("Gagal mengirim data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {formSubmitted ? (
        <div className="text-center">
          Form berhasil dikirim! Anda akan dialihkan ke /send.
        </div>
      ) : (
        <form onSubmit={submitForm}>
          <div className="w-auto font-medium h-auto contact-us">
            <h1 className="mb-4 text-center">Pilih Mata Pelajaran!</h1>
            <div
              onClick={() => setOpen(!open)}
              className={`bg-white w-full p-2 flex items-center justify-between rounded ${
                !selected && "text-gray-700"
              }`}
            >
              {selected ? selected : "Pilih Mata Pelajaran!"}
              <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
            </div>
            <ul
      className={`bg-white mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"}`}
    >
      <div className="flex items-center px-2 sticky top-0 bg-white">
        <AiOutlineSearch size={18} className="text-gray-700" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
          placeholder="Cari Mata Pelajaran!"
          className="placeholder:text-gray-700 p-2 outline-none"
        />
      </div>
      {options.map((option) => (
        <li
          key={option}
          className={`p-2 text-sm hover-bg-sky-600 hover-text-white
          ${
            option.toLowerCase() === selected.toLowerCase() &&
            "bg-sky-600 text-white"
          }
          ${
            option.toLowerCase().startsWith(inputValue)
              ? "block"
              : "hidden"
          }`}
          onClick={() => {
            if (option.toLowerCase() !== selected.toLowerCase()) {
              setSelected(option);
              setOpen(false);
              setInputValue("");
            }
          }}
        >
          {option}
        </li>
      ))}
    </ul>
          </div>

          <div className="contact-us mt-16">
            <div className="mb-4 text-center">Penjelasan Tentang PR nya</div>
            <textarea
              className="h-28 w-64"
              placeholder="Masukkan tentang PR nya di sini..."
              name="description"
              required
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <button
              className="buttons bg-black text-white mt-16 mb-16"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Kirim"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Selector;
