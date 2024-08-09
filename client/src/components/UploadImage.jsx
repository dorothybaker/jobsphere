import { IKContext, IKImage, IKUpload } from "imagekitio-react";

const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_URL_ENDPOINT;

function UploadImage({ setForm, form, name }) {
  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:5173/api/imagekit");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onSuccess = (res) => {
    setForm({ ...form, [name]: res.url });
  };

  return (
    //In order to use the SDK, you need to provide it with a few configuration parameters.
    //The configuration parameters can be applied directly to the IKImage component or using
    //an IKContext component.

    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <label
        htmlFor="uploadFile"
        className="cursor-pointer text-white text-sm py-2 w-max rounded-lg px-5 bg-primary"
      >
        Select file
      </label>
      <IKUpload
        fileName="my-upload"
        onSuccess={onSuccess}
        className="hidden"
        id="uploadFile"
      />
    </IKContext>
  );
}

export default UploadImage;

{
  /* 
  // Image component
  <IKImage path="/default-image.jpg" transformation={[{
    "height": "300",
    "width": "400"
  }]} /> */
}
{
  /* // Image upload */
}
