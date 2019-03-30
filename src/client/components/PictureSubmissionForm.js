import React, {Component} from "react";
import "./PictureSubmissionForm.scss";
import axios from 'axios';

class PictureSubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      onAlert: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleSubmit(e) {
    const {
      selectedPostItId,
      submitPicture,
    } = this.props;
    const target = e.target;
    e.preventDefault();
    const formData = new FormData();

    formData.append('postit_attach_image', this.state.file);

    axios({
      method: 'post',
      url: `/api/rooms/${this.props.roomTitle}/newImage?selectedPostItId=${selectedPostItId}`,
      data: formData,
      config: { headers: {'Content-Type': `multipart/form-data boundary=${formData._boundary}` }}
    })
    .then(res => {
      console.log('res: ',res);
      submitPicture(res.data.imageUrl, selectedPostItId);
    })
    .catch(err => {
      console.log('err: ', err);
    });
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (
      file &&
      (file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif' ||
        file.type === 'application/pdf')
    ) {
      reader.onloadend = () => {
        this.setState({
          file,
          imagePreviewUrl: reader.result,
          onAlert: false
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        onAlert: true
      });
    }
  }

  renderAlertFileType() {
    return (
      <div className="fileTypeAlert">
        jpg, jpeg, png, pdf 파일 확장자로 올려주세요.
      </div>
    );
  }

  render () {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    };
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText"><i class="far fa-images"></i></div>);
    }

    console.log('picture form...', this.state);

    return (
      <div className="imageSubmissionModalForm">
        <div className="imageUploaderWrapper">
          <div className="imgPreview">
            {$imagePreview}
            {this.state.onAlert ? this.renderAlertFileType() : null}
          </div>
          <form onSubmit={this.handleSubmit} >
            <input className="fileInput"
              type="file"
              onChange={this.handleImageChange} />
            <button className="submitBtn"
              type="submit"
              disabled={this.state.onAlert || !this.state.file ? true : false}
              onClick={this.handleSubmit}
            >Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default PictureSubmissionForm;
