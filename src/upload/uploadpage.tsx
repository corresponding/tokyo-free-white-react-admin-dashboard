import Cookies from 'js-cookie';
import { Button, Layout, Menu, theme, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { Box, Typography, Hidden, Container, Grid } from '@mui/material';
import type { UploadProps } from 'antd';
const { Dragger } = Upload;
import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

export default function UploadPage() {
  const props: UploadProps = {
    name: 'file',
    action: 'api/upload',
    method: 'POST',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Status - 500</title>
      </Helmet>
      <MainContent>
        <div>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined rev={undefined} />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Support for a single File upload.</p>
          </Dragger>
        </div>
      </MainContent>
    </>
  );
}
