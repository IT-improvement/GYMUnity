import { useState } from "react";

const FileUpload = (props) => {
    const [fileBase64, setFileInBase64] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setFileInBase64(reader.result.replace('data:', '').replace(/^.+,/, ''));
            props.handleFileOnChange(reader.result.replace('data:', '').replace(/^.+,/, ''));

        }
    };

    console.log(fileBase64)

    const isFileSizeOver30MB = (size) => {
        const FILE_SIZE_MAX = 1024 * 1024 * 30;

        if (size >= FILE_SIZE_MAX)
            return true;
            
        return false;
    };

    return (
        <input id="image-file" type="file" name="file" onChange={handleFileChange} />
    );
};

export default FileUpload;