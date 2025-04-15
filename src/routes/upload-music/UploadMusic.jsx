import Form from "../../components/form/Form";
import Preview from "../../components/preview/Preview";
import styles from "./UploadMusic.module.css"

const UploadMusic = () => {
    return (
        <main className={styles['main-content']}>
            <h1 className={styles["page-title"]}>Upload Your Music</h1>
            <p className={styles["page-subtitle"]}>
                Share your music with the world and set up fair revenue distribution for
                all your contributors.
            </p>
            <div className={styles["upload-container"]}>
                <Form />
            </div>
            <Preview />
        </main>
    );
};

export default UploadMusic;

