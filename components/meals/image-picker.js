"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  const handlePickClick = () => {
    imageInput.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    // In order to show the picked file as a preview here, I now want to convert it into a so-called data URL,
    // which is simply a value that can be used as an input for an image element,
    // so that can be used as a source for an image element. We can generate such a data URL
    // with help of a class built into JavaScript, the FileReader() class.
    // We can construct such a FileReader() and then do what its name implies.
    // We can read our file, and simply call fileReader.readAsDataURL(file) passing that file to that method.
    // This method works in a bit of a strange way, because it doesn't actually return anything,
    // not a promise, not the read file, and it also doesn't take a callback.

    const fileReader = new FileReader();

    // So we store a function as a value in on load, and this function will then be triggered by the file reader
    // once this method here, this read as data URL method, is done.
    // Here, we then won't get the generated URL as an input.
    // Instead, we can access it by accessing fileReader.result, and that will then be that generated URL.
    // And that's what I then wanna store in my state.

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage ? (
            <p>No image picked yet.</p>
          ) : (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
        <input
          ref={imageInput}
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
