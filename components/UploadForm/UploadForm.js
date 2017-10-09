import React from 'react';
import FileDragAndDrop from 'react-file-drag-and-drop';
import { converter } from '../../helpers/converter';
import './UploadForm.css';


class UploadForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            documentName: undefined,
            result: undefined,
            error: false,
            disabled: true
        };
    }

    handleDrop = (dataTransfer) => {
        const files = dataTransfer.files;
        const file = files[0];
        const docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        const reader = new FileReader();

        reader.onload = (event) => {
            if (file.type === docx ) {
                converter(event, (result) => {
                    this.setState({documentName: file.name.substring(0, file.name.length - 5)});
                    this.setState({error: false});
                    this.setState({result});
                    this.setState({ disabled: false })
                });
            } else {
                this.setState({result: undefined});
                this.setState({error: true});
                this.setState({ disabled: true })
            }

        };

        reader.readAsArrayBuffer(file);
    };

	printFile = (event) => {
        document.title = this.state.documentName;
        event.preventDefault();
        window.print()
    };

    render() {
        return (
            <form className="upload-form" onSubmit={ this.printFile }>
                <div className={(this.state.result ? 'drag-and-dropped' : 'drag-and-drop')}>
                    <FileDragAndDrop onDrop={this.handleDrop}>
                        {this.state.result ? (
                            <section className="file">
                                <div className="file-content" dangerouslySetInnerHTML={{__html: this.state.result}}></div>
                            </section>
                        ) : (
                            <p className="drag-and-drop-text">Drop file in .docx format here</p>
                        )}
                    </FileDragAndDrop>
                </div>
                {this.state.error &&
                <p className="error">
                    Something went wrong.. Is the file you dropped in .docx format?
                </p>
                }
                <button
                    type="submit"
                    disabled={this.state.disabled}>
                    Print
                </button>
            </form>
        );
    }
}

export default UploadForm;
