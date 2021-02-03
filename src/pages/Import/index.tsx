import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    // TODO
    uploadedFiles.forEach(uploadedFile => data.append('file', uploadedFile.file, uploadedFile.name));

    console.log(data);
    try {
      await api.post('/transactions/import', data);
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    // TODO
    const newUploadedFiles: FileProps[] = files.map(file => (
      {
        file,
        name: file.name,
        readableSize: file.size.toString(),
      }
    ));

    // get already uploaded files names
    const uploadedFilesNames = uploadedFiles.map(uploadedFile => uploadedFile.name);

    // find duplicated files names
    const duplicatedFileNames = newUploadedFiles.filter(newUploadedFile => uploadedFilesNames.includes(newUploadedFile.name)).map(newUploadedFile => newUploadedFile.name);

    // warn user about duplicated files names
    if (duplicatedFileNames.length === 1) {
      window.alert(`O arquivo ${duplicatedFileNames} já está na lista e foi ignorado.`);
    } else if (duplicatedFileNames.length > 1){
      window.alert(`O(s) arquivos ${duplicatedFileNames} já estão na lista e foram ignorados.`);
    }

    // get files to be uploaded
    const toBeUploadedFiles = newUploadedFiles.filter(newUploadedFile => !uploadedFilesNames.includes(newUploadedFile.name));

    // set variable
    setUploadedFiles([...uploadedFiles, ...toBeUploadedFiles]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
