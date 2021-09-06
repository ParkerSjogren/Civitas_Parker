/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState , useEffect} from "react"
import './form.css';

const PhotoForm = () => {  
    const [imgUrl, setImgUrl] = useState("");
    const [selectedFile, setSelectedFile] = useState();

    const [photos, setPhotos] = useState();

    const getPhotos = async () => {
        let response = await fetch('/api/photos/files');
        let data = await response.json();
        setPhotos(data);
      };
      
      useEffect(() => {
        getPhotos();
      }, []);
  
    const handleFile = (e) => {
        console.log("e.target.files[0].name = ", e.target.files[0].name);
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmission = () => {
		const formData = new FormData();

		formData.append('file', selectedFile);

		fetch('/api/photos',
			{
				method: 'POST',
				body: formData,
			}
		)
        .then(res => res.json())
        .then(data => setImgUrl(data))

        console.log("41 - imgUrl = ", imgUrl);
	};
 
    return (
        <div className="createform">
            <div className="popup-in">
                <h4>Upload a image</h4>
                <div>
                    <input type="file"  onChange={handleFile} />
                </div>
                <div>
				    <button onClick={handleSubmission}>Submit</button>
			    </div>
            </div>    

            {/* <div>
                <img src="api/photos/file/1628729402214-any-name-farside.jpg" width="417" height="600">
                </img>
            </div>  */}

            {photos &&
                photos.files.map((img,idx) => {
                return(
                    <div key = {idx}> 
                        <img src={'api/photos/file/'+img.filename}></img>
                    </div>

                )
                })
            }                                             
        </div>
    )
}
 
export default PhotoForm;