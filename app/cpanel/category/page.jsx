"use client"
import { useState } from 'react';
import ImageUploading from 'react-images-uploading';

export default function MultipleImageUpload() {
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  return (
    <div className="upload-container">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url" n
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageRemove,
          onImageUpdate,
          dragProps,
        }) => (
          <div className="upload-wrapper">
            <button onClick={onImageUpload} {...dragProps}>
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove All</button>
            <div className="image-preview">
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt={`Upload ${index}`} />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
