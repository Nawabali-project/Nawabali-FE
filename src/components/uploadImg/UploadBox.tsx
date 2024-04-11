import { CameraIcon, LeftIcon, RightIcon } from '@/utils/icons';
import { useState } from 'react';
import styled from 'styled-components';

interface UploadBoxProps {
  onImagesChange: (images: File[]) => void;
}

interface UploadedImageInfo {
  file: File;
  imageUrl: string;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onImagesChange }) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImageInfo[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isActive, setActive] = useState<boolean>(false);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleImageUpload = (files: FileList) => {
    const imagesArray: UploadedImageInfo[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        imagesArray.push({
          file,
          imageUrl: reader.result as string,
        });
        if (imagesArray.length === files.length) {
          setUploadedImages(imagesArray);
          onImagesChange(imagesArray.map((info) => info.file)); // File 객체 배열을 상위 컴포넌트로 전달
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setActive(false);
    handleImageUpload(event.dataTransfer.files);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleImageUpload(files);
    }
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % uploadedImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + uploadedImages.length) % uploadedImages.length,
    );
  };
  return (
    <label
      className={`preview ${isActive ? 'active' : ''}`}
      onDragEnter={() => setActive(true)}
      onDragOver={handleDragOver}
      onDragLeave={() => setActive(false)}
      onDrop={handleDrop}
    >
      <input type="file" multiple className="file" onChange={handleUpload} />
      {uploadedImages.length > 0 && uploadedImages[currentIndex] && (
        <>
          <img
            src={uploadedImages[currentIndex]?.imageUrl}
            alt={`Uploaded ${currentIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: '140px',
              borderBottomRightRadius: '140px',
            }}
          />
          <div>
            <LeftIconBox
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPreviousImage();
              }}
            >
              <LeftIcon />
            </LeftIconBox>

            <RightIconBox
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
            >
              <RightIcon />
            </RightIconBox>
          </div>
        </>
      )}
      {!uploadedImages.length && (
        <>
          <CameraIcon />
          <p className="preview_msg">사진을 여기에 끌어다 놓으세요 :&#41;</p>
          <p className="preview_desc">최대 5장까지 올릴수 있어요.</p>
        </>
      )}
    </label>
  );
};

const LeftIconBox = styled.button`
  position: absolute;
  top: 270px;
  left: 5px;
  width: 32px;
  height: 32px;
  z-index: 2;
  border: none;
  border-radius: 100px;
  background-color: white;
  cursor: pointer;
`;

const RightIconBox = styled.button`
  position: absolute;
  top: 270px;
  right: 480px;
  width: 32px;
  height: 32px;
  z-index: 2;
  border: none;
  border-radius: 100px;
  background-color: white;
  cursor: pointer;
`;

export default UploadBox;
