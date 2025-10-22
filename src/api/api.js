import axios from "axios";
const API_BASE_URL = "http://localhost:4000/api";

/** Save form */
export const saveForm = async (formType, formData) => {
  return axios.post(`${API_BASE_URL}/forms?type=${formType}`, formData);
};

/** Generate document — convert success to blob, and convert error blobs to JSON/text */
export const generateDocument = async (formType, formData, format = "pdf") => {
  try {
    // success: expect a blob (file)
    const res = await axios.post(
      `${API_BASE_URL}/generate-doc/${formType}?format=${format}`,
      formData,
      { responseType: "blob" }
    );
    return res; // res.data is Blob
  } catch (err) {
    // If server returned an error body as blob (because responseType:'blob'), convert it to serializable object
    if (err.response && err.response.data && err.response.data instanceof Blob) {
      // read blob as text
      const text = await err.response.data.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        parsed = text;
      }
      // throw a normal Error with serializable payload
      const error = new Error(parsed?.error || parsed || err.message || "Unknown error");
      // attach server details in a serializable way
      error.server = parsed;
      error.status = err.response.status;
      throw error;
    }
    // otherwise rethrow the original (will be an Error, serializable message)
    throw err;
  }
};

/** File download helper (unchanged) */
export const downloadFile = (res, filename, format = "pdf") => {
  const blob = new Blob([res.data], {
    type:
      format === "pdf"
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
