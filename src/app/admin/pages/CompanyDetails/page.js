'use client';
import { useState, useEffect } from 'react';

const CompanyDetailsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    headerImage: '',
    favIcon: '',
  });
  const [companyDetails, setCompanyDetails] = useState(null);
  const [headerImageFile, setHeaderImageFile] = useState(null);
  const [favIconFile, setFavIconFile] = useState(null);
  const [headerImagePreview, setHeaderImagePreview] = useState(null);
  const [favIconPreview, setFavIconPreview] = useState(null);

  useEffect(() => {
    async function fetchCompanyDetails() {
      console.log("Fetching company details...");
      try {
        const response = await fetch('/api/companydetails');
        const data = await response.json();
        console.log("Fetched data:", data);
        if (data) {
          setCompanyDetails(data);
          setFormData({
            name: data.name || '',
            description: data.description || '',
            headerImage: data.headerImage || '',
            favIcon: data.favIcon || '',
          });
          setHeaderImagePreview(data.headerImage ? `https://murshadpkdata.advanceaitool.com/uploads/${data.headerImage}` : null);
          setFavIconPreview(data.favIcon ? `https://murshadpkdata.advanceaitool.com/uploads/${data.favIcon}` : null);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    }
    fetchCompanyDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(`Updated ${name} to:`, value);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (name === 'headerImage') {
      setHeaderImageFile(file);
      setHeaderImagePreview(URL.createObjectURL(file));
      console.log("Selected header image file:", file);
    } else if (name === 'favIcon') {
      setFavIconFile(file);
      setFavIconPreview(URL.createObjectURL(file));
      console.log("Selected favicon file:", file);
    }
  };

  const convertToBase64 = (file) => {
    console.log("Converting file to Base64:", file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("Base64 conversion successful");
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Base64 conversion failed:", error);
        reject(error);
      };
    });
  };

  const uploadImage = async (base64Image,type) => {
    console.log("Uploading image...");
    try {
      const response = await fetch('https://murshadpkdata.advanceaitool.com/uploadImage.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image, type: type }),
      });
      const result = await response.json();
      console.log("Upload response received:", result);

      const uploadedUrl = result.url || result.image_url || null;
      console.log("Final uploaded URL:", uploadedUrl);

      return uploadedUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Starting submission process...");

    let headerImageUrl = formData.headerImage;
    let favIconUrl = formData.favIcon;

    if (headerImageFile) {
      console.log("Uploading header image...");
      const headerImageBase64 = await convertToBase64(headerImageFile);
      const uploadedHeaderImageUrl = await uploadImage(headerImageBase64);
      if (uploadedHeaderImageUrl) headerImageUrl = uploadedHeaderImageUrl;
      console.log("Header image URL after upload:", headerImageUrl);
    }

    if (favIconFile) {
      console.log("Uploading favicon...");
      const favIconBase64 = await convertToBase64(favIconFile);
      const uploadedFavIconUrl = await uploadImage(favIconBase64,'ico');
      if (uploadedFavIconUrl) favIconUrl = uploadedFavIconUrl;
      console.log("Favicon URL after upload:", favIconUrl);
    }

    const updatedFormData = {
      ...formData,
      headerImage: headerImageUrl,
      favIcon: favIconUrl,
    };

    try {
      if (companyDetails && companyDetails.id) {
        console.log("Updating existing company details with ID:", companyDetails.id);
        await fetch(`/api/companydetails/${companyDetails.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData),
        });
      } else {
        console.log("Creating new company details...");
        const response = await fetch('/api/companydetails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData),
        });
        const data = await response.json();
        setCompanyDetails(data);
        console.log("New company details created:", data);
      }
      alert('Company details saved successfully!');
    } catch (error) {
      console.error('Error saving company details:', error);
      alert('Failed to save company details.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-4xl mx-auto">
      {/* Form Section on Left */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Company Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Header Image:</label>
            <input
              type="file"
              name="headerImage"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Favicon:</label>
            <input
              type="file"
              name="favIcon"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full mt-4 p-3 bg-gray-700 text-white font-semibold rounded hover:bg-gray-800 transition">
            {companyDetails ? 'Update Company Details' : 'Save Company Details'}
          </button>
        </form>
      </div>

      {/* Image Preview Section on Right */}
      <div className="flex flex-col items-center space-y-8">
        {headerImagePreview && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-center">Header Image Preview</h2>
            <img
              src={headerImagePreview}
              alt="Header Preview"
              className="w-48 h-48 object-contain rounded"
            />
          </div>
        )}
        {favIconPreview && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-center">Favicon Preview</h2>
            <img
              src={favIconPreview}
              alt="Favicon Preview"
              className="w-16 h-16 object-contain rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
