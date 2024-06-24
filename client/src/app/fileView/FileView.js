import React from "react";
import axios from "axios";
import {
    IconBrandCpp,
    IconBrandJavascript,
    IconBrandPython,
    IconBrandTypescript,
    IconCsv,
    IconFile,
    IconFileTypeDoc,
    IconFileTypeDocx,
    IconFileTypePpt,
    IconFileTypeXls,
    IconFileZip,
    IconHtml,
    IconJpg,
    IconJson,
    IconLetterCSmall,
    IconPdf,
    IconPng,
    IconSvg,
    IconTrash,
    IconTxt,
} from "@tabler/icons-react";
const FileView = ({ filePath, editMode }) => {
    const [files, setFiles] = React.useState([]);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        axios
            .get(`/file/${encodeURIComponent(filePath)}`)
            .then((res) => {
                setFiles(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const fileIcon = (filename) => {
        const regex = /(?:\.([^.]+))?$/;
        switch (regex.exec(filename)[1]) {
            case "pdf":
                return <IconPdf size={30} />;
            case "jpg":
                return <IconJpg size={30} />;
            case "jpeg":
                return <IconJpg size={30} />;
            case "png":
                return <IconPng size={30} />;
            case "doc":
                return <IconFileTypeDoc size={30} />;
            case "docx":
                return <IconFileTypeDocx size={30} />;
            case "ppt":
                return <IconFileTypePpt size={30} />;
            case "pptx":
                return <IconFileTypePpt size={30} />;
            case "zip":
                return <IconFileZip size={30} />;
            case "c":
                return <IconLetterCSmall size={30} />;
            case "cpp":
                return <IconBrandCpp size={30} />;
            case "py":
                return <IconBrandPython size={30} />;
            case "txt":
                return <IconTxt size={30} />;
            case "js":
                return <IconBrandJavascript size={30} />;
            case "ts":
                return <IconBrandTypescript size={30} />;
            case "html":
                return <IconHtml size={30} />;
            case "json":
                return <IconJson size={30} />;
            case "csv":
                return <IconCsv size={30} />;
            case "xls":
                return <IconFileTypeXls size={30} />;
            case "xlsx":
                return <IconFileTypeXls size={30} />;
            case "svg":
                return <IconSvg size={30} />;
            default:
                return <IconFile size={30} />;
        }
    };

    const fileWithoutExtension = (filename) => {
        const regex = /(?:\.([^.]+))?$/;
        const extension = regex.exec(filename)[1];
        return filename.replace(`.${extension}`, "");
    };

    return (
        <div>
            {files.map((file) => (
                <div key={Math.random().toString(36).substring(7)}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        {fileIcon(file.name)}
                        &nbsp;
                        <p
                            style={{
                                cursor: "pointer",
                                fontSize: "1.2rem",
                                margin: "5px",
                            }}
                            onClick={() => {
                                window.open(file.link);
                            }}
                        >
                            {fileWithoutExtension(file.name).substring(0, 20)}
                        </p>
                        {editMode && (
                            <IconTrash
                                size={30}
                                style={{
                                    background: "none",
                                    paddingLeft: "10px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    axios
                                        .delete(`/file/${file.id}`)
                                        .then((res) => {
                                            setFiles(
                                                files.filter(
                                                    (f) => f.name !== file.name
                                                )
                                            );
                                        })
                                        .catch((err) => {
                                            setError("Failed to delete file. ");
                                        });
                                }}
                            />
                        )}
                    </div>
                    {!editMode&&<iframe
                        src={
                            file.link.match(/^(.*\/)/)[1] +
                            "/preview?usp=drivesdk"
                        }
                        frameBorder={0}
                        style={{ width: "fit-content", aspectRatio: "1", borderRadius: "20px"}}
                    ></iframe>}
                </div>
            ))}
            {files.length === 0 && <p>No files found.</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default FileView;
