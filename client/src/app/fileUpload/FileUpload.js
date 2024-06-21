import React, { useState } from "react";
import axios from "axios";
import { IconChecks, IconUpload } from "@tabler/icons-react";

const FileUpload = ({ filePath }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
            // 10MB in bytes
            setError("File size exceeds 10MB.");
            setFile(null);
        } else {
            setError("");
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a valid file.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filePath", filePath);
        axios
            .post("/file", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.data);
                setUploaded(true);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response.status === 500) {
                    setError("Server storage limit exceeded");
                } else {
                    setError("File upload failed :(");
                }
                console.log(err);
            });
    };

    return (
        <form
            encType="multipart/form-data"
            method="post"
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                marginTop: "10px",
            }}
        >
            <label
                htmlFor="fileUpload"
                className="btn-press"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "fit-content",
                    padding: "5px 10px",
                    backgroundColor: "#2b7df8",
                    color: "white",
                    textAlign: "center",
                    lineHeight: "30px",
                    cursor: "pointer",
                    borderRadius: "5px",
                }}
            >
                {" "}
                <IconUpload size={20} />
                &nbsp;
                {file
                    ? file.name.length > 20
                        ? file.name.substring(0, 20) + "..."
                        : file.name
                    : "upload file"}
            </label>
            <input
                type="file"
                id="fileUpload"
                name="file"
                onChange={handleFileChange}
                style={{
                    display: "none",
                }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
                type="submit"
                disabled={!file || error || loading || uploaded}
                style={{
                    display: file ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "none",
                    width: "fit-content",
                    padding: "5px 10px",
                    color: "white",
                    textAlign: "center",
                    lineHeight: "30px",
                    cursor: "pointer",
                    border: "none",
                }}
            >
                <IconChecks size={20} />
                &nbsp;
                {loading ? "Uploading..." : uploaded ? "Uploaded !" : "Upload"}
            </button>
        </form>
    );
};

export default FileUpload;
