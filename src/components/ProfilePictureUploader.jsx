'use client';
import { useContext, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import axios from 'axios';
import Image from 'next/image';
import { Edit, ImageIcon } from 'lucide-react';
import { useRef } from 'react';

export default function ProfilePictureForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageHovered, setImageHovered] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
      return alert('Please select an image file');
    }
    if (file.size > 10000000) {
      return alert('Please select an image smaller than 10MB');
    }
    if (file) {
      const base64 = await convertToBase64(file);
      setSelectedFile(base64);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      return;
    }
    //if selectedfile is not an image file, return an error message
    if (!selectedFile.startsWith('data:image')) {
      return alert('Please select an image file');
    }
    const res = await axios.post('/api/user/update', {
      image: selectedFile,
      email: auth.email,
    });
    setAuth({ ...auth, profilePicture: selectedFile });
  };

  return (
    <form onSubmit={handleFormSubmit} className='mx-auto flex cursor-pointer flex-col w-24 h-24 items-center justify-center gap-2 rounded-full'>
      <input accept='image/*' ref={inputRef} className='hidden' type='file' onChange={handleFileChange} />
      <div onMouseEnter={() => setImageHovered(true)} onMouseLeave={() => setImageHovered(false)} onClick={() => inputRef.current.click()} className='relative'>
        {!selectedFile && !auth.profilePicture ? (
          <div className='border-2 rounded-full'>
            <ImageIcon width={150} height={150} className='aspect-square p-4 cursor-pointer border-none object-cover' />
          </div>
        ) : (
          <Image
            src={selectedFile ? selectedFile : auth?.profilePicture}
            alt={auth?.email + ' profile avatar'}
            width={150}
            height={150}
            className='aspect-square cursor-pointer rounded-full border-none object-cover'
          />
        )}
        {imageHovered && (
          <div className='absolute inset-0 z-20 flex h-full w-full flex-col items-center justify-center rounded-full bg-black bg-opacity-50'>
            <Edit className='text-white' />
          </div>
        )}
      </div>
      {selectedFile && (
        <button className='primary_btn rounded-full px-6 py-2.5 font-semibold tracking-wide' type='submit'>
          Upload
        </button>
      )}
    </form>
  );
}
