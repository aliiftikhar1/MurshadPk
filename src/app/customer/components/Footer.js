'use client';
import React, { useEffect, useState } from "react";
import { RxGlobe } from "react-icons/rx";
import { MdKeyboardArrowDown, MdCopyright } from "react-icons/md";
import { FaFacebook, FaEnvelope, FaTiktok, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';
import Link from 'next/link';
import axios from "axios";
const Footer = () => {
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    pinterest: ''
  });

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchSocialMediaLinks = async () => {
    try {
      // Adding a query parameter with the current timestamp to avoid cache
      const response = await fetch(`/api/socialfirstrecodlink?_=${new Date().getTime()}`, { cache: 'no-store' });
      const data = await response.json();
      if (data.status) {
        setSocialMediaLinks(data.data);
      } else {
        console.error('Failed to fetch social media links');
      }
    } catch (error) {
      console.error('Error fetching social media links:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchSocialMediaLinks();
}, []);

  
const [companyName, setcompanyName]=useState('');
const [companyHeaderImage, setcompanyHeaderImage]=useState('');
const [companyicon, setcompanyicon]=useState('');
useEffect(() => {
  async function fetchCompanyDetails() {
    console.log("Fetching company details...");
    try {
      const response = await fetch('/api/companydetails');
      const data = await response.json();
      console.log("Fetched data:", data);
      if (data) {
        console.log("data is : ",data);
        setcompanyName(data.name);
        setcompanyHeaderImage(data.headerImage);
        setcompanyicon(data.favIcon);
        console.log("Company data is ",company);
       
      }
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  }
  fetchCompanyDetails();
}, []);
const [companyemail, setcompanyemail]= useState('');
const [companyphone, setcompanyphone]= useState('');
const [companyaddress, setcompanyaddress]= useState('');
const [companywebsite, setcompanywebsite]= useState('');
const [companyowner, setcompanyowner]= useState('');

useEffect(() => {
  async function fetchContactInfo() {
    try {
      const response = await axios.get('/api/contactinfo');
      if (Array.isArray(response.data) && response.data.length > 0) {
        const existingContact = response.data[0];
        console.log("contact data is -----------",existingContact);
        setcompanyemail(existingContact.email);
        setcompanyphone(existingContact.phoneNumber);
        setcompanywebsite(existingContact.website);
        setcompanyowner(existingContact.owner);
        setcompanyaddress(existingContact.address);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  }
  fetchContactInfo();
}, []);

  return (
    <>
      <div className="grid grid-cols-1 px-4 gap-2 md:px-10 lg:px-20 sm:grid-cols-3 md:grid-cols-10 py-16 border-t-2 border-b-2 text-black lg:grid-cols-10 bg-gray-50">
        <div className="flex flex-col gap-2 col-span-4">
          <Link href="/" legacyBehavior>
            <a className="focus:outline-none">
              <img src={`${process.env.NEXT_PUBLIC_UPLOADED_IMAGE_URL}/${companyHeaderImage}`} className="cursor-pointer  w-[200px]" alt="Footer Logo" />
            </a>
          </Link>
          <p className="text-[15px] font-[400] md:mr-10 sm:mr-10 lg:mr-10 xl:mr-10 text-justify">
            {companyName} is your ultimate destination for top-quality products, seamless shopping experience, and unmatched customer service. Discover a wide range of items to meet all your needs.
          </p>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <p className="text-[20px] font-[600]">Company</p>
          <Link href="/customer/pages/privacypolicy" legacyBehavior>
            <a className="hover:no-underline">
              <p className="text-[15px] font-[400]">Privacy Policy</p>
            </a>
          </Link>
          <Link href="/customer/pages/termsandconditions" legacyBehavior>
            <a className="hover:no-underline">
              <p className="text-[15px] font-[400]">Terms & Conditions</p>
            </a>
          </Link>
          <Link href="/customer/pages/shippingpolicy" legacyBehavior>
            <a className="hover:no-underline">
              <p className="text-[15px] font-[400]">Shipping Policy</p>
            </a>
          </Link>
          <Link href="/customer/pages/returnandexchangepolicy" legacyBehavior>
            <a className="hover:no-underline">
              <p className="text-[15px] font-[400]">Return & Exchange Policy</p>
            </a>
          </Link>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <p className="text-[20px] font-[600]">Explore</p>
          <Link href="/customer/pages/aboutus" legacyBehavior>
            <a className="hover:no-underline">
              <p className="text-[15px] font-[400]">About Us</p>
            </a>
          </Link>
          <Link href="/customer/pages/faq" legacyBehavior>
            <a className="hover:no-underline">
              <p className="text-[15px] font-[400]">FAQs</p>
            </a>
          </Link>
          <Link href="/customer/pages/contactus" legacyBehavior>
            <a className="hover:no-underline">
              <p className="text-[15px] font-[400]">Contact Us</p>
            </a>
          </Link>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <p className="text-[20px] font-[600]">Support</p>
          <p className="text-[15px] font-[400]">Email: {companyemail}</p>
          <p className="text-[15px] font-[400]">Phone: {companyphone}</p>
          <p className="text-[15px] font-[400]">Address: {companyaddress}</p>
        </div>
      </div>

      <div className="flex justify-around items-center flex-wrap-reverse p-8 gap-6 text-black bg-gray-100">
        <div className="flex items-center gap-1 border-2 p-2 rounded-md">
          <RxGlobe className="text-[25px]" />
          <p>English (United States)</p>
          <MdKeyboardArrowDown className="text-[25px]" />
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1">
            <MdCopyright />
            <p>2024 All Rights Reserved</p>
          </div>
          <p>Privacy policy | Terms</p>
        </div>
        <div className="flex gap-[6px] w-[250px] justify-center">
          {/* Always render social media icons */}
          <a href={socialMediaLinks.facebook || '#'} target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
            <FaFacebook className={`h-8 w-8 ${socialMediaLinks.facebook ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400'}`} />
          </a>
          <a href={socialMediaLinks.instagram || '#'} target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
            <FaInstagram className={`h-8 w-8 ${socialMediaLinks.instagram ? 'text-pink-600 hover:text-pink-800' : 'text-gray-400'}`} />
          </a>
          <a href={socialMediaLinks.twitter || '#'} target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
            <FaTwitter className={`h-8 w-8 ${socialMediaLinks.twitter ? 'text-blue-400 hover:text-blue-600' : 'text-gray-400'}`} />
          </a>
          <a href={socialMediaLinks.tiktok || '#'} target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
            <FaTiktok className={`h-8 w-8 ${socialMediaLinks.tiktok ? 'text-black hover:text-gray-800' : 'text-gray-400'}`} />
          </a>
          <a href={socialMediaLinks.pinterest || '#'} target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
            <FaPinterest className={`h-8 w-8 ${socialMediaLinks.pinterest ? 'text-red-600 hover:text-red-800' : 'text-gray-400'}`} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
