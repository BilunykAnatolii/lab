import axios from "axios";
// import * as mime from "mime-types";

const Image = ({ id, images, setImages }) => {
  const handleClick = async () => {
    await axios({
      method: "delete",
      url: `http://localhost:3001/images/${id}`,
    });

    const newImages = images.filter((e) => e !== id);
    setImages(newImages);
  };

  const handleDownload = () => {
    axios({
      method: "get",
      url: `http://localhost:3001/images/${id}`,
      responseType: "blob",
    }).then((blob) => {
      // Create blob link to download
      // const ext = mime.extension(blob.headers["content-type"]);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `FileName.jpg`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <img
        style={{ width: "50%" }}
        src={`http://localhost:3001/images/${id}`}
      />
      <button onClick={handleClick}>Delete</button>
      <br />
      <p>{`http://localhost:3001/images/${id}`}</p>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Image;
