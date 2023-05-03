import axios from "axios";
import { useEffect, useState } from "react";
import Image from "./Image";

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios({
        method: "get",
        url: "http://localhost:3001/images",
      });

      let itemIds = [];

      res.data.forEach((item) => {
        itemIds.push(item.local_file_id);
      });

      setImages(itemIds);
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedFile);

    const res = await axios({
      method: "post",
      url: "http://localhost:3001/images",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    setImages([...images, res.data.id]);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect} />
        <input type="submit" value="Upload File" />
      </form>
      {images.map((image) => (
        <Image id={image} images={images} setImages={setImages} />
      ))}
    </div>
  );
};

export default App;
